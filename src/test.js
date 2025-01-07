















































// storage.js
const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Path to your service account key file
const keyFilename = path.join(__dirname, './forward-map-413614-99122e48be56.json');

// Your bucket name
const bucketName = 'yepper_bucket_images';

const storage = new Storage({ keyFilename });
const bucket = storage.bucket(bucketName);

module.exports = bucket;











































// websocketServer.js
const ImportAd = require('../models/ImportAdModel');
const AdSpace = require('../models/AdSpaceModel');

function setupWebSocketServer(server, io) {
  const clients = new Map();

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('subscribe', (userId) => {
      console.log('User subscribed:', userId);
      clients.set(userId, socket);
      socket.userId = userId;
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.userId);
      if (socket.userId) {
        clients.delete(socket.userId);
      }
    });
  });

  const changeStream = ImportAd.watch();
  
  changeStream.on('change', async (change) => {
    try {
      console.log('Change detected:', change.operationType);
      
      if (change.operationType === 'insert') {
        const newAd = change.fullDocument;
        console.log('New ad inserted:', newAd._id);
        
        // Notify website owners
        for (const spaceId of newAd.selectedSpaces) {
          const adSpace = await AdSpace.findById(spaceId).populate('webOwnerId');
          if (adSpace && adSpace.webOwnerId) {
            const socket = clients.get(adSpace.webOwnerId.toString());
            if (socket) {
              console.log('Sending notification to owner:', adSpace.webOwnerId);
              socket.emit('notification', {
                type: 'newPendingAd',
                businessName: newAd.businessName,
                adId: newAd._id,
                timestamp: new Date(),
                read: false
              });
            }
          }
        }
      }
      
      if (change.operationType === 'update' && 
          change.updateDescription.updatedFields && 
          change.updateDescription.updatedFields.approved === true) {
        const updatedAd = await ImportAd.findById(change.documentKey._id);
        if (updatedAd) {
          const socket = clients.get(updatedAd.userId.toString());
          if (socket) {
            console.log('Sending approval notification to user:', updatedAd.userId);
            socket.emit('notification', {
              type: 'adApproved',
              businessName: updatedAd.businessName,
              adId: updatedAd._id,
              timestamp: new Date(),
              read: false
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in change stream handler:', error);
    }
  });

  return io;
}

module.exports = setupWebSocketServer;




























































// AdApprovalController.js
const ImportAd = require('../models/ImportAdModel');
const AdSpace = require('../models/AdSpaceModel');
const AdCategory = require('../models/AdCategoryModel');
const Website = require('../models/WebsiteModel');
const WebOwnerBalance = require('../models/WebOwnerBalanceModel'); // Balance tracking model
const sendEmailNotification = require('./emailService');
const Payment = require('../models/PaymentModel');
const Flutterwave = require('flutterwave-node-v3');
const axios = require('axios');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

exports.getPendingAds = async (req, res) => {
  try {
    const { ownerId } = req.params;  // Owner's ID from params

    // Fetch the owner's websites, categories, and ad spaces
    const websites = await Website.find({ ownerId });
    const websiteIds = websites.map(website => website._id);

    const categories = await AdCategory.find({ websiteId: { $in: websiteIds } });
    const categoryIds = categories.map(category => category._id);

    const adSpaces = await AdSpace.find({ categoryId: { $in: categoryIds } });
    const adSpaceIds = adSpaces.map(space => space._id);

    // Fetch pending ads that belong to the owner's ad spaces
    const pendingAds = await ImportAd.find({
      approved: false,
      selectedSpaces: { $in: adSpaceIds }
    }).populate('selectedSpaces selectedCategories selectedWebsites');

    res.status(200).json(pendingAds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending ads' });
  }
};

exports.getUserMixedAds = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch both pending and approved ads in a single query
    const mixedAds = await ImportAd.find({
      userId,
      $or: [
        { approved: false },
        { approved: true }
      ]
    })
      .populate({
        path: 'selectedCategories',
        select: 'price ownerId',
      })
      .populate({
        path: 'selectedSpaces',
        select: 'price webOwnerEmail',
      })
      .populate('selectedWebsites', 'websiteName websiteLink logoUrl');

    const adsWithDetails = mixedAds.map(ad => {
      const categoryPriceSum = ad.selectedCategories.reduce((sum, category) => sum + (category.price || 0), 0);
      const spacePriceSum = ad.selectedSpaces.reduce((sum, space) => sum + (space.price || 0), 0);
      const totalPrice = categoryPriceSum + spacePriceSum;

      return {
        ...ad.toObject(),
        totalPrice,
        isConfirmed: ad.confirmed,
        categoryOwnerIds: ad.selectedCategories.map(cat => cat.ownerId),
        spaceOwnerEmails: ad.selectedSpaces.map(space => space.webOwnerEmail),
        clicks: ad.clicks,
        views: ad.views,
        status: ad.approved ? 'approved' : 'pending'
      };
    });

    res.status(200).json(adsWithDetails);
  } catch (error) {
    console.error('Error fetching mixed ads:', error);
    res.status(500).json({ message: 'Failed to fetch ads', error });
  }
};

exports.getPendingAdById = async (req, res) => {
  try {
    const { adId } = req.params;
    console.log('Fetching ad with ID:', adId); // Debugging log

    const ad = await ImportAd.findById(adId)
      .populate('selectedSpaces selectedCategories selectedWebsites');

    if (!ad) {
      console.log('Ad not found for ID:', adId); // Log when ad is missing
      return res.status(404).json({ message: 'Ad not found' });
    }

    res.status(200).json(ad);
  } catch (error) {
    console.error('Error fetching ad:', error); // Catch any unexpected errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.approveAd = async (req, res) => {
  try {
    const { adId } = req.params;

    // Only update the approved status, don't push to API yet
    const approvedAd = await ImportAd.findByIdAndUpdate(
      adId,
      { approved: true },
      { new: true }
    ).populate('userId');

    if (!approvedAd) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // Notify the ad owner about approval (implement your notification system here)
    console.log(`Notification: Ad for ${approvedAd.businessName} has been approved. Awaiting confirmation from the ad owner.`);
    
    // // Notify each web owner via email
    //   const emailBody = `
    //     <h2>Your Ad has been approved</h2>
    //     <p>Hello,</p>
    //     <p><strong>Business Name:</strong> ${approvedAd.businessName}</p>
    //     <p><strong>Description:</strong> ${approvedAd.adDescription}</p>
    //   `;
    //   await sendEmailNotification(approvedAd.adOwnerEmail, 'New Ad Request for Your Space', emailBody);

    res.status(200).json({
      message: 'Ad approved successfully. Waiting for advertiser confirmation.',
      ad: approvedAd
    });

  } catch (error) {
    console.error('Error approving ad:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// exports.getApprovedAdsAwaitingConfirmation = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const approvedAds = await ImportAd.find({
//       userId,
//       approved: true,
//       confirmed: false,
//     })
//       .populate({
//         path: 'selectedCategories',
//         select: 'price ownerId', // Include ownerId here
//       })
//       .populate({
//         path: 'selectedSpaces',
//         select: 'price webOwnerEmail', // Include webOwnerEmail here
//       });

//     // Calculate total price for each ad and include owner info
//     const adsWithTotalPrices = approvedAds.map(ad => {
//       const categoryPriceSum = ad.selectedCategories.reduce((sum, category) => sum + (category.price || 0), 0);
//       const spacePriceSum = ad.selectedSpaces.reduce((sum, space) => sum + (space.price || 0), 0);
//       const totalPrice = categoryPriceSum + spacePriceSum;

//       // Include ownerId and webOwnerEmail in the response
//       return {
//         ...ad.toObject(),
//         totalPrice,
//         categoryOwnerIds: ad.selectedCategories.map(cat => cat.ownerId),
//         spaceOwnerEmails: ad.selectedSpaces.map(space => space.webOwnerEmail),
//       };
//     });

//     res.status(200).json(adsWithTotalPrices);
//   } catch (error) {
//     console.error('Error fetching approved ads:', error);
//     res.status(500).json({ message: 'Failed to fetch approved ads', error });
//   }
// };

// exports.getAdDetails = async (req, res) => {
//   const { adId } = req.params;

//   try {
//     const ad = await ImportAd.findById(adId)
//       .populate('selectedCategories', 'price ownerId')
//       .populate('selectedSpaces', 'price webOwnerEmail');

//     if (!ad) {
//       return res.status(404).json({ message: 'Ad not found' });
//     }

//     res.status(200).json(ad);
//   } catch (error) {
//     console.error('Error fetching ad details:', error);
//     res.status(500).json({ message: 'Failed to fetch ad details', error });
//   }
// };

// exports.getApprovedAdsAwaitingConfirmation = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const approvedAds = await ImportAd.find({
//       userId,
//       approved: true
//     })
//       .populate({
//         path: 'selectedCategories',
//         select: 'price ownerId',
//       })
//       .populate({
//         path: 'selectedSpaces',
//         select: 'price webOwnerEmail',
//       })
//       .populate('selectedWebsites', 'websiteName websiteLink logoUrl')

//     const adsWithDetails = approvedAds.map(ad => {
//       const categoryPriceSum = ad.selectedCategories.reduce((sum, category) => sum + (category.price || 0), 0);
//       const spacePriceSum = ad.selectedSpaces.reduce((sum, space) => sum + (space.price || 0), 0);
//       const totalPrice = categoryPriceSum + spacePriceSum;

//       return {
//         ...ad.toObject(),
//         totalPrice,
//         isConfirmed: ad.confirmed,
//         categoryOwnerIds: ad.selectedCategories.map(cat => cat.ownerId),
//         spaceOwnerEmails: ad.selectedSpaces.map(space => space.webOwnerEmail),
//         clicks: ad.clicks,  // Include clicks
//         views: ad.views     // Include views
//       };
//     });

//     res.status(200).json(adsWithDetails);
//   } catch (error) {
//     console.error('Error fetching approved ads:', error);
//     res.status(500).json({ message: 'Failed to fetch approved ads', error });
//   }
// };

exports.getAdDetails = async (req, res) => {
  const { adId } = req.params;

  try {
    const approvedAd = await ImportAd.findById(adId)
      .populate('selectedWebsites', 'websiteName websiteLink')
      .populate('selectedCategories', 'categoryName price ownerId')
      .populate('selectedSpaces', 'spaceType price webOwnerEmail');

    if (!approvedAd) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    const categoryPriceSum = approvedAd.selectedCategories.reduce((sum, category) => sum + (category.price || 0), 0);
    const spacePriceSum = approvedAd.selectedSpaces.reduce((sum, space) => sum + (space.price || 0), 0);
    const totalPrice = categoryPriceSum + spacePriceSum;

    const adDetails = {
      ...approvedAd.toObject(),
      totalPrice,
      isConfirmed: approvedAd.confirmed,
      categoryOwnerIds: approvedAd.selectedCategories.map((cat) => cat.ownerId),
      spaceOwnerEmails: approvedAd.selectedSpaces.map((space) => space.webOwnerEmail),
      clicks: approvedAd.clicks,  // Include clicks
      views: approvedAd.views,   // Include views
    };

    res.status(200).json(adDetails);
  } catch (error) {
    console.error('Error fetching ad details:', error);
    res.status(500).json({ message: 'Failed to fetch ad details', error });
  }
};

// exports.confirmAdDisplay = async (req, res) => {
//   try {
//     const { adId } = req.params;

//     // First, find and update the ad's confirmation status
//     const confirmedAd = await ImportAd.findByIdAndUpdate(
//       adId,
//       { confirmed: true },
//       { new: true }
//     ).populate('selectedSpaces');

//     if (!confirmedAd) {
//       return res.status(404).json({ message: 'Ad not found' });
//     }

//     // Now that the ad is confirmed, update all selected ad spaces to include this ad
//     const spaceUpdates = confirmedAd.selectedSpaces.map(async (spaceId) => {
//       return AdSpace.findByIdAndUpdate(
//         spaceId,
//         { 
//           $push: { 
//             activeAds: {
//               adId: confirmedAd._id,
//               imageUrl: confirmedAd.imageUrl,
//               pdfUrl: confirmedAd.pdfUrl,
//               videoUrl: confirmedAd.videoUrl,
//               businessName: confirmedAd.businessName,
//               adDescription: confirmedAd.adDescription
//             }
//           }
//         },
//         { new: true }
//       );
//     });

//     await Promise.all(spaceUpdates);

//     // Notify that the ad is now live
//     confirmedAd.selectedSpaces.forEach(space => {
//       console.log(`Ad is now live on space ID: ${space._id}`);
//     });

//     res.status(200).json({ 
//       message: 'Ad confirmed and now live on selected spaces',
//       ad: confirmedAd
//     });

//   } catch (error) {
//     console.error('Error confirming ad display:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

exports.initiateAdPayment = async (req, res) => {
  try {
    const { adId, amount, email, phoneNumber, userId } = req.body;

    if (!userId || userId.trim() === '') {
      return res.status(400).json({ message: 'Invalid request: User ID is required.' });
    }

    const ad = await ImportAd.findById(adId).populate('selectedSpaces');
    if (!ad || !ad.selectedSpaces || ad.selectedSpaces.length === 0) {
      return res.status(404).json({ message: 'Ad or selected spaces not found' });
    }

    // Get the web owner ID from the first selected space
    const webOwnerId = ad.selectedSpaces[0].webOwnerId;
    if (!webOwnerId) {
      return res.status(404).json({ message: 'Web owner ID not found for selected spaces.' });
    }

    const tx_ref = `CARDPAY-${Date.now()}`;

    const payment = new Payment({
      tx_ref,
      amount,
      currency: 'RWF',
      email,
      phoneNumber,
      userId,
      adId,
      webOwnerId, // Store the web owner ID in the payment
      status: 'pending',
    });

    await payment.save();

    const paymentPayload = {
      tx_ref,
      amount,
      currency: 'RWF',
      redirect_url: 'http://localhost:5000/api/accept/callback',
      customer: { email, phonenumber: phoneNumber },
      payment_options: 'card',
      customizations: {
        title: 'Ad Payment',
        description: 'Payment for ad display',
      },
    };

    const response = await axios.post('https://api.flutterwave.com/v3/payments', paymentPayload, {
      headers: { Authorization: `Bearer ${process.env.FLW_SECRET_KEY}` },
    });

    if (response.data?.data?.link) {
      res.status(200).json({ paymentLink: response.data.data.link });
    } else {
      res.status(500).json({ message: 'Payment initiation failed.' });
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ message: 'Error initiating payment.', error });
  }
};

// exports.adPaymentCallback = async (req, res) => {
//   try {
//     const { tx_ref, transaction_id } = req.query;

//     const transactionVerification = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
//       headers: {
//         Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
//       }
//     });

//     const { status } = transactionVerification.data.data;

//     if (status === 'successful') {
//       const payment = await Payment.findOneAndUpdate(
//         { tx_ref },
//         { status: 'successful' },
//         { new: true }
//       );

//       if (payment) {
//         // Confirm the related ad
//         await ImportAd.findByIdAndUpdate(payment.adId, { confirmed: true });

//         return res.redirect('https://yepper.vercel.app/dashboard'); // Redirect user after successful payment
//       }
//     } else {
//       await Payment.findOneAndUpdate({ tx_ref }, { status: 'failed' });
//       return res.redirect('https://yepper.vercel.app');
//     }
//   } catch (error) {
//     console.error('Error in payment callback:', error);
//     res.status(500).send('Error verifying payment');
//   }
// };

exports.updateWebOwnerBalance = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || userId.trim() === '') {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const balanceRecord = await WebOwnerBalance.findOneAndUpdate(
      { userId },
      { $inc: { totalEarnings: amount, availableBalance: amount } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.status(200).json({ message: 'Balance updated successfully.', balance: balanceRecord });
  } catch (error) {
    console.error('Error updating balance:', error);
    res.status(500).json({ message: 'Error updating balance.', error: error.message });
  }
};

exports.adPaymentCallback = async (req, res) => {
  try {
    const { tx_ref, transaction_id } = req.query;

    // Verify the transaction with Flutterwave
    const transactionVerification = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      },
    });

    const { status, customer } = transactionVerification.data.data;

    if (status === 'successful') {
      const payment = await Payment.findOne({ tx_ref });

      if (payment) {
        // Update payment status
        payment.status = 'successful';
        await payment.save();

        // Confirm the related ad
        await ImportAd.findByIdAndUpdate(payment.adId, { confirmed: true });

        // Update the web owner's balance
        await WebOwnerBalance.findOneAndUpdate(
          { userId: payment.webOwnerId },
          {
            $inc: {
              totalEarnings: payment.amount,
              availableBalance: payment.amount,
            }
          },
          { 
            upsert: true,
            setDefaultsOnInsert: true 
          }
        );

        return res.redirect('http://localhost:3000/approved-ads');
      }
    } else {
      await Payment.findOneAndUpdate({ tx_ref }, { status: 'failed' });
      return res.redirect('http://localhost:3000');
    }
  } catch (error) {
    console.error('Error handling payment callback:', error);
    res.status(500).json({ message: 'Error handling payment callback.', error });
  }
};

// Add a new route to get balance
exports.getWebOwnerBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const balance = await WebOwnerBalance.findOne({ userId });

    if (!balance) {
      return res.status(404).json({ message: 'No balance found for this user' });
    }

    res.status(200).json(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ 
      message: 'Error fetching balance', 
      error: error.message 
    });
  }
};

exports.getOwnerPayments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const payments = await Payment.find({ webOwnerId: userId });

    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for this user' });
    }

    res.status(200).json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      message: 'Error fetching payments',
      error: error.message,
    });
  }
};

exports.getApprovedAds = async (req, res) => {
  try {
    const approvedAds = await ImportAd.find({ approved: true })
      .populate('selectedSpaces selectedWebsites selectedCategories');

    res.status(200).json(approvedAds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching approved ads' });
  }
};

exports.getApprovedAdsByUser = async (req, res) => {
  try {
    const { ownerId } = req.params;  // Owner's ID from params

    // Fetch the owner's websites, categories, and ad spaces
    const websites = await Website.find({ ownerId });
    const websiteIds = websites.map(website => website._id);

    const categories = await AdCategory.find({ websiteId: { $in: websiteIds } });
    const categoryIds = categories.map(category => category._id);

    const adSpaces = await AdSpace.find({ categoryId: { $in: categoryIds } });
    const adSpaceIds = adSpaces.map(space => space._id);

    // Fetch approved ads that belong to the owner's ad spaces
    const approvedAds = await ImportAd.find({
      approved: true,
      selectedSpaces: { $in: adSpaceIds }
    }).populate('selectedSpaces selectedCategories selectedWebsites');

    res.status(200).json(approvedAds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching approved ads' });
  }
};

// exports.getUserPendingAds = async (req, res) => {
//   try {
//     const { userId } = req.params; // Importer's ID from params

//     // Fetch pending ads imported by this user
//     const pendingAds = await ImportAd.find({
//       userId,
//       approved: false
//     }).populate('selectedSpaces selectedCategories selectedWebsites');

//     res.status(200).json(pendingAds);
//   } catch (error) {
//     console.error('Error fetching user’s pending ads:', error);
//     res.status(500).json({ message: 'Error fetching user’s pending ads' });
//   }
// };




































































// AdCategoryController.js
const AdCategory = require('../models/AdCategoryModel');

exports.createCategory = async (req, res) => {
  try {
    const { ownerId, websiteId, categoryName, description, price, customAttributes } = req.body;

    if (!websiteId) {
      return res.status(400).json({ message: 'Website ID is required' });
    }

    const newCategory = new AdCategory({
      ownerId,
      websiteId,  // Associate the category with the website
      categoryName,
      description,
      price,
      customAttributes: customAttributes || {}
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
};

exports.getCategories = async (req, res) => {
  const { ownerId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const categories = await AdCategory.find({ ownerId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await AdCategory.countDocuments({ ownerId });

    res.status(200).json({
      categories,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};

exports.getCategoriesByWebsite = async (req, res) => {
  const { websiteId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const categories = await AdCategory.find({ websiteId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await AdCategory.countDocuments({ websiteId });

    res.status(200).json({
      categories,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};

exports.getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await AdCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category', error });
  }
};

















































// AdDisplayController.js
const AdSpace = require('../models/AdSpaceModel');
const ImportAd = require('../models/ImportAdModel');

// exports.displayAd = async (req, res) => {
//   try {
//     const { space, website, category } = req.query;
//     const adSpace = await AdSpace.findById(space).populate({
//       path: 'selectedAds',
//       match: { approved: true, confirmed: true }, // Only retrieve ads that are both approved and confirmed
//     });

//     if (!adSpace || adSpace.selectedAds.length === 0) {
//       return res.status(404).send('No ads available for this space');
//     }

//     const currentDate = new Date();
//     const { startDate, endDate, availability } = adSpace;
//     if (
//       (availability === 'Reserved for future date' || availability === 'Pick a date') &&
//       (currentDate < new Date(startDate) || currentDate > new Date(endDate))
//     ) {
//       return res.status(403).send('Ad is not available during this time period.');
//     }

//     const userCount = adSpace.userCount;
//     const adsToShow = adSpace.selectedAds.slice(0, userCount);
//     const adsHtml = adsToShow
//       .map((selectedAd) => {
//         const imageUrl = selectedAd.imageUrl ? `http://localhost:5000${selectedAd.imageUrl}` : '';
//         return `
//           <div class="ad">
//             ${imageUrl ? `<img src="${imageUrl}" alt="Ad Image">` : ''}
//             ${selectedAd.pdfUrl ? `<a href="${selectedAd.pdfUrl}" target="_blank">Download PDF</a>` : ''}
//             ${selectedAd.videoUrl ? `<video src="${selectedAd.videoUrl}" controls></video>` : ''}
//           </div>
//         `;
//       })
//       .join('');

//     res.status(200).send(adsHtml);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

exports.displayAd = async (req, res) => {
  try {
    const { space, website, category } = req.query;
    const adSpace = await AdSpace.findById(space).populate({
      path: 'selectedAds',
      match: { approved: true, confirmed: true }, // Only retrieve ads that are both approved and confirmed
    });

    const currentDate = new Date();
    const { startDate, endDate, availability } = adSpace;
    if (
      (availability === 'Reserved for future date' || availability === 'Pick a date') &&
      (currentDate < new Date(startDate) || currentDate > new Date(endDate))
    ) {
      return res.status(403).send('Ad is not available during this time period.');
    }

    const userCount = adSpace.userCount;
    const adsToShow = adSpace.selectedAds.slice(0, userCount);

    // const adsHtml = adsToShow
    //   .map((selectedAd) => {
    //     const imageUrl = selectedAd.imageUrl ? `http://localhost:5000${selectedAd.imageUrl}` : '';
    //     const targetUrl = selectedAd.businessLink.startsWith('http') ? selectedAd.businessLink : `https://${selectedAd.businessLink}`;
    //     return `
    //       <a href="${targetUrl}" target="_blank" class="ad">
    //         ${imageUrl ? `<img src="${imageUrl}" alt="Ad Image">` : ''}
    //         ${selectedAd.pdfUrl ? `<a href="${selectedAd.pdfUrl}" target="_blank">Download PDF</a>` : ''}
    //         ${selectedAd.videoUrl ? `<video src="${selectedAd.videoUrl}" controls></video>` : ''}
    //       </a>
    //     `;
    //   })
    // .join('');

    const adsHtml = adsToShow
      .map((selectedAd) => {
        const imageUrl = selectedAd.imageUrl ? `https://yepper-backend.onrender.com${selectedAd.imageUrl}` : '';
        const targetUrl = selectedAd.businessLink.startsWith('http') ? selectedAd.businessLink : `https://${selectedAd.businessLink}`;
        return `
          <a href="${targetUrl}" target="_blank" class="ad" data-ad-id="${selectedAd._id}">
            ${imageUrl ? `<img src="${imageUrl}" alt="Ad Image">` : ''}
            ${selectedAd.pdfUrl ? `<a href="${selectedAd.pdfUrl}" target="_blank">Download PDF</a>` : ''}
            ${selectedAd.videoUrl ? `<video src="${selectedAd.videoUrl}" controls></video>` : ''}
          </a>
        `;
      })
      .join('');

    res.status(200).send(adsHtml);
  } catch (error) {
    console.error('Error displaying ads:', error);
    res.status(500).send('Error displaying ads');
  }
};

exports.incrementView = async (req, res) => {
  try {
    const { adId } = req.body;  // Capture ad ID from request
    await ImportAd.findByIdAndUpdate(adId, { $inc: { views: 1 } });
    res.status(200).send('View recorded');
  } catch (error) {
    console.error('Error recording view:', error);
    res.status(500).send('Failed to record view');
  }
};

// Increment click count when an ad is clicked
exports.incrementClick = async (req, res) => {
  try {
    const { adId } = req.body;  // Capture ad ID from request
    await ImportAd.findByIdAndUpdate(adId, { $inc: { clicks: 1 } });
    res.status(200).send('Click recorded');
  } catch (error) {
    console.error('Error recording click:', error);
    res.status(500).send('Failed to record click');
  }
};








































































































































// AdSpaceController.js
const AdSpace = require('../models/AdSpaceModel');
const AdCategory = require('../models/AdCategoryModel');
const ImportAd = require('../models/ImportAdModel');

// const generateApiCodesForAllLanguages = (spaceId, websiteId, categoryId, startDate = null, endDate = null) => {
//   const apiUrl = `http://localhost:5000/api/ads/display?space=${spaceId}&website=${websiteId}&category=${categoryId}`;

//   const dateCheckScript = startDate && endDate
//     ? `const now = new Date();
//        const start = new Date("${startDate}");
//        const end = new Date("${endDate}");
//        if (now >= start && now <= end) {
//          loadAd();
//        }`
//     : 'loadAd();'; // Default if no start and end date

//   const rotationScript = `
//     const rotateAds = (ads) => {
//       let currentIndex = 0;
//       ads[currentIndex].style.display = 'block';
      
//       setInterval(() => {
//         ads[currentIndex].style.display = 'none';
//         currentIndex = (currentIndex + 1) % ads.length;
//         ads[currentIndex].style.display = 'block';
//       }, 5000); // Rotate every 5 seconds
//     };

//     const loadAd = () => {
//       const adContainer = document.getElementById("${spaceId}-ad");
//       fetch("${apiUrl}")
//         .then(response => response.text())
//         .then(adsHtml => {
//           adContainer.innerHTML = adsHtml;
//           const ads = adContainer.querySelectorAll('.ad');
//           if (ads.length > 0) {
//             rotateAds(ads); // Start rotating ads
//           }
//         })
//         .catch(error => {
//           console.error('Error loading ads:', error);
//           adContainer.innerHTML = '<p>Error loading ads</p>';
//         });
//     };

//     ${dateCheckScript}
//   `;

//   const apiCodes = {
//     HTML: `
//       <div id="${spaceId}-ad"></div>
//       <script>
//         ${rotationScript}
//       </script>`,
      
//     JavaScript: `
//       <div id="${spaceId}-ad"></div>
//       <script>
//         (function() {
//           ${rotationScript}
//         })();
//       </script>`,
      
//     PHP: `
//       <div id="${spaceId}-ad"></div>
//       <script>
//         <?php echo "${rotationScript}"; ?>
//       </script>`,

//     Python: `
//       print('''
//       <div id="${spaceId}-ad"></div>
//       <script>
//         ${rotationScript}
//       </script>
//       ''')`,
//   };

//   return apiCodes;
// };

const generateApiCodesForAllLanguages = (spaceId, websiteId, categoryId, startDate = null, endDate = null) => {
  const apiUrl = `https://yepper-backend.onrender.com/api/ads/display?space=${spaceId}&website=${websiteId}&category=${categoryId}`;

  const dateCheckScript = startDate && endDate
    ? `const now = new Date();
       const start = new Date("${startDate}");
       const end = new Date("${endDate}");
       if (now >= start && now <= end) {
         loadAd();
       }`
    : 'loadAd();'; // Default if no start and end date

    const rotationScript = `
      const rotateAds = (ads) => {
        let currentIndex = 0;
        ads[currentIndex].style.display = 'block';

        setInterval(() => {
          ads[currentIndex].style.display = 'none';
          currentIndex = (currentIndex + 1) % ads.length;
          ads[currentIndex].style.display = 'block';
        }, 5000); // Rotate every 5 seconds
      };

      const loadAd = () => {
        const adContainer = document.getElementById("${spaceId}-ad");
        fetch("${apiUrl}")
          .then(response => response.text())
          .then(adsHtml => {
            adContainer.innerHTML = adsHtml;

            // Increment view count
            adContainer.querySelectorAll('.ad').forEach(adElement => {
              const adId = adElement.getAttribute('data-ad-id');
              fetch("https://yepper-backend.onrender.com/api/ads/view", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adId })
              });
            });

            // Rotate ads and add click event listeners
            const ads = adContainer.querySelectorAll('.ad');
            if (ads.length > 0) {
              rotateAds(ads);
              ads.forEach(ad => ad.addEventListener('click', () => {
                const adId = ad.getAttribute('data-ad-id');
                fetch("https://yepper-backend.onrender.com/api/ads/click", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ adId })
                });
              }));
            }
          })
          .catch(error => {
            console.error('Error loading ads:', error);
            adContainer.innerHTML = '<p>Error loading ads</p>';
          });
      };
      ${dateCheckScript}
    `;

  const apiCodes = {
    HTML: `
      <div id="${spaceId}-ad"></div>
      <script>
        ${rotationScript}
      </script>`,
      
    JavaScript: `
      <div id="${spaceId}-ad"></div>
      <script>
        (function() {
          ${rotationScript}
        })();
      </script>`,
      
    PHP: `
      <div id="${spaceId}-ad"></div>
      <script>
        <?php echo "${rotationScript}"; ?>
      </script>`,

    Python: `
      print('''
      <div id="${spaceId}-ad"></div>
      <script>
        ${rotationScript}
      </script>
      ''')`,
  };

  return apiCodes;
};

exports.createSpace = async (req, res) => {
  try {
    const { webOwnerId, categoryId, spaceType, price, availability, userCount, instructions, startDate, endDate, webOwnerEmail } = req.body;

    if (!webOwnerId || !categoryId || !spaceType || !price || !availability || !userCount) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Retrieve website ID from the category
    const category = await AdCategory.findById(categoryId).populate('websiteId');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const websiteId = category.websiteId._id;

    // Create new AdSpace
    const newSpace = new AdSpace({
      webOwnerId,
      categoryId,
      spaceType,
      price,
      availability,
      userCount,
      instructions,
      startDate,
      endDate,
      webOwnerEmail
    });
    const savedSpace = await newSpace.save();

    // Generate API codes
    const apiCodes = generateApiCodesForAllLanguages(savedSpace._id, websiteId, categoryId, startDate, endDate);
    savedSpace.apiCodes = apiCodes;
    await savedSpace.save();

    res.status(201).json(savedSpace);
  } catch (error) {
    console.error('Error saving ad space:', error);
    res.status(500).json({ message: 'Failed to create ad space', error });
  }
};

exports.getAllSpaces = async (req, res) => {
  try {
    const spaces = await AdSpace.find()
      .populate({
        path: 'categoryId', 
        populate: {
          path: 'websiteId'  // Populate the websiteId inside the category
        }
      });  
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all ad spaces', error });
  }
};

exports.getSpaces = async (req, res) => {
  try {
    const spaces = await AdSpace.find({ categoryId: req.params.categoryId });
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ad spaces', error });
  }
};

exports.getSpacesByOwner = async (req, res) => {
  const { ownerId } = req.params;

  try {
    // Find spaces where the webOwnerEmail matches the owner's email
    const spaces = await AdSpace.find({ webOwnerEmail: ownerId }).populate({
      path: 'categoryId',
      populate: { path: 'websiteId' }, // Populating the website for each category
    });
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ad spaces', error });
  }
};

exports.getAdContent = async (req, res) => {
  try {
    const { space, category } = req.query;

    if (!space || !category) {
      return res.status(400).send('Invalid space or category');
    }

    // Find all AdSpaces matching the spaceType and categoryId
    const adSpaces = await AdSpace.find({ spaceType: space, categoryId: category });

    if (!adSpaces || adSpaces.length === 0) {
      return res.status(404).send('No ad spaces found');
    }

    // Find all ads that are linked to any of the ad spaces
    const ads = await ImportAd.find({ selectedSpaces: { $in: adSpaces.map(space => space._id) } });

    if (!ads || ads.length === 0) {
      return res.status(404).send('No ads found for the selected space');
    }

    // Create ad elements for each ad
    const adElements = ads.map(ad => {
      let adContent = '';

      if (ad.imageUrl) {
        adContent += `<img src="${ad.imageUrl}" alt="${ad.businessName}" style="width:100%;height:auto;" />`;
      }

      if (ad.videoUrl) {
        adContent += `<video controls style="width:100%;height:auto;"><source src="${ad.videoUrl}" type="video/mp4" /></video>`;
      }

      if (ad.pdfUrl) {
        adContent += `<a href="${ad.pdfUrl}" target="_blank">${ad.businessName} Ad PDF</a>`;
      }

      return `<div class="ad" style="display:none;">${adContent}</div>`;
    }).join('');

    res.send(`
      <div id="ad-container">${adElements}</div>
      <script>
        let ads = document.querySelectorAll('#ad-container .ad');
        let currentIndex = 0;
        if (ads.length > 0) {
          ads[currentIndex].style.display = 'block';
        }
        setInterval(() => {
          ads[currentIndex].style.display = 'none';
          currentIndex = (currentIndex + 1) % ads.length;
          ads[currentIndex].style.display = 'block';
        }, 5000);
      </script>
    `);
  } catch (error) {
    console.error('Error fetching ad content:', error);
    res.status(500).send('Internal Server Error');
  }
};





























































const ImportAd = require('../models/ImportAdModel');
const AdSpace = require('../models/AdSpaceModel');
const multer = require('multer');
const path = require('path');
const bucket = require('../config/storage');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|bmp|webp|tiff|svg|mp4|avi|mov|mkv|webm|pdf/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) return cb(null, true);
    cb(new Error('Invalid file type.'));
  },
});

exports.createImportAd = [upload.single('file'), async (req, res) => {
  try {
    const {
      userId,
      adOwnerEmail,
      businessName,
      businessLink,
      businessLocation,
      adDescription,
      selectedWebsites,
      selectedCategories,
      selectedSpaces,
    } = req.body;

    const websitesArray = JSON.parse(selectedWebsites);
    const categoriesArray = JSON.parse(selectedCategories);
    const spacesArray = JSON.parse(selectedSpaces);

    let imageUrl = '';
    let videoUrl = '';

    // Upload file to GCS if provided
    if (req.file) {
      const blob = bucket.file(`${Date.now()}-${req.file.originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error('Upload error:', err);
          reject(new Error('Failed to upload file.'));
        });

        blobStream.on('finish', async () => {
          try {
            console.log('File upload finished, attempting to make public...');
            await blob.makePublic();
            console.log('File made public successfully');
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            if (req.file.mimetype.startsWith('image')) {
              imageUrl = publicUrl;
            } else if (req.file.mimetype.startsWith('video')) {
              videoUrl = publicUrl;
            }
            resolve();
          } catch (err) {
            console.error('Error making file public:', err.message);
            reject(new Error('Failed to make file public.'));
          }
        });
        

        blobStream.end(req.file.buffer);
      });
    }

    // Create new ad entry
    const newRequestAd = new ImportAd({
      userId,
      adOwnerEmail,
      imageUrl,
      videoUrl,
      businessName,
      businessLink,
      businessLocation,
      adDescription,
      selectedWebsites: websitesArray,
      selectedCategories: categoriesArray,
      selectedSpaces: spacesArray,
    });

    const savedRequestAd = await newRequestAd.save();
    res.status(201).json(savedRequestAd);
  } catch (err) {
    console.error('Error creating ad:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}];

exports.getAdsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const ads = await ImportAd.find({ userId })
      .lean()
      .select(
        'businessName businessLink businessLocation adDescription imageUrl videoUrl approved selectedWebsites selectedCategories selectedSpaces'
      );

    res.status(200).json(ads);
  } catch (err) {
    console.error('Error fetching ads:', err);
    res.status(500).json({ error: 'Failed to fetch ads' });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const ads = await ImportAd.find();
    res.status(200).json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAdByIds = async (req, res) => {
  const adId = req.params.id;

  try {
    const ad = await ImportAd.findById(adId)
      .lean()  // Faster loading
      .select('businessName businessLink businessLocation adDescription imageUrl pdfUrl videoUrl approved selectedWebsites selectedCategories selectedSpaces');

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.status(200).json(ad);
  } catch (error) {
    console.error('Error fetching ad by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.getAdsByUserId = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const ads = await ImportAd.find({ userId })
//       .lean()  // Faster data retrieval
//       .select('businessName businessLink businessLocation adDescription imageUrl pdfUrl videoUrl approved selectedWebsites selectedCategories selectedSpaces');

//     if (!ads.length) {
//       return res.status(404).json({ message: 'No ads found for this user' });
//     }

//     res.status(200).json(ads);
//   } catch (error) {
//     console.error('Error fetching ads by user ID:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

exports.getProjectsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const approvedAds = await ImportAd.find({ userId, approved: true })
      .lean()
      .populate('selectedWebsites', 'websiteName websiteLink')
      .populate('selectedCategories', 'categoryName description')
      .populate('selectedSpaces', 'spaceType price availability')
      .select('businessName businessLink businessLocation adDescription imageUrl pdfUrl videoUrl approved selectedWebsites selectedCategories selectedSpaces');

    const pendingAds = await ImportAd.find({ userId, approved: false })
      .lean()
      .populate('selectedWebsites', 'websiteName websiteLink')
      .populate('selectedCategories', 'categoryName description')
      .populate('selectedSpaces', 'spaceType price availability')
      .select('businessName businessLink businessLocation adDescription approved selectedWebsites selectedCategories selectedSpaces');
      
    res.status(200).json({
      approvedAds,
      pendingAds
    });
  } catch (error) {
    console.error('Error fetching ads by user ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAdsByUserIdWithClicks = async (req, res) => {
  const userId = req.params.userId;
  try {
    const ads = await ImportAd.find({ userId });
    for (const ad of ads) {
      const clicks = await AdClick.find({ adId: ad._id }).exec();
      ad.clicks = clicks.length;
      ad.websites = [...new Set(clicks.map(click => click.website))]; // Unique websites
    }
    res.status(200).json(ads);
  } catch (error) {
    console.error('Error fetching ads with clicks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

























































// WebsiteController.js
const Website = require('../models/WebsiteModel');
const multer = require('multer');
const path = require('path');
const bucket = require('../config/storage');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|bmp|webp|tiff|svg|avi|mov|mkv|webm/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) return cb(null, true);
    cb(new Error('Invalid file type.'));
  },
});

exports.createWebsite = [upload.single('file'), async (req, res) => {
  try {
    const { ownerId, websiteName, websiteLink } = req.body;

    if (!ownerId || !websiteName || !websiteLink) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if website URL is already in use
    const existingWebsite = await Website.findOne({ websiteLink }).lean();
    if (existingWebsite) {
      return res.status(409).json({ message: 'Website URL already exists' });
    }

    let imageUrl = '';

    // Upload file to GCS if provided
    if (req.file) {
      const blob = bucket.file(`${Date.now()}-${req.file.originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error('Upload error:', err);
          reject(new Error('Failed to upload file.'));
        });

        blobStream.on('finish', async () => {
          try {
            console.log('File upload finished, attempting to make public...');
            await blob.makePublic();
            console.log('File made public successfully');
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            if (req.file.mimetype.startsWith('image')) {
              imageUrl = publicUrl;
            }
            resolve();
          } catch (err) {
            console.error('Error making file public:', err.message);
            reject(new Error('Failed to make file public.'));
          }
        });
        
        blobStream.end(req.file.buffer);
      });
    }

    const newWebsite = new Website({
      ownerId,
      websiteName,
      websiteLink,
      imageUrl
    });

    const savedWebsite = await newWebsite.save();
    res.status(201).json(savedWebsite);
  } catch (error) {
    console.error('Error creating website:', error); // Log detailed error
    res.status(500).json({ message: 'Failed to create website', error });
  }
}];

exports.getAllWebsites = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;  // Pagination parameters
  try {
    const websites = await Website.find()
      .lean()  // Use lean for performance
      .select('ownerId websiteName websiteLink imageUrl createdAt')  // Fetch only necessary fields
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch websites', error });
  }
};

exports.getWebsitesByOwner = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const websites = await Website.find({ ownerId })
      .lean()
      .select('ownerId websiteName websiteLink imageUrl createdAt');
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch websites', error });
  }
};

exports.getWebsiteById = async (req, res) => {
  const { websiteId } = req.params;
  try {
    const website = await Website.findById(websiteId).lean();  // Use lean for fast loading
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json(website);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch website', error });
  }
};








































































// WebsiteController.js
const Website = require('../models/WebsiteModel');
const multer = require('multer');
const path = require('path');
const bucket = require('../config/storage');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|bmp|webp|tiff|svg|avi|mov|mkv|webm/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) return cb(null, true);
    cb(new Error('Invalid file type.'));
  },
});

exports.createWebsite = [upload.single('file'), async (req, res) => {
  try {
    const { ownerId, websiteName, websiteLink } = req.body;

    if (!ownerId || !websiteName || !websiteLink) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if website URL is already in use
    const existingWebsite = await Website.findOne({ websiteLink }).lean();
    if (existingWebsite) {
      return res.status(409).json({ message: 'Website URL already exists' });
    }

    let imageUrl = '';

    // Upload file to GCS if provided
    if (req.file) {
      const blob = bucket.file(`${Date.now()}-${req.file.originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error('Upload error:', err);
          reject(new Error('Failed to upload file.'));
        });

        blobStream.on('finish', async () => {
          try {
            console.log('File upload finished, attempting to make public...');
            await blob.makePublic();
            console.log('File made public successfully');
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            if (req.file.mimetype.startsWith('image')) {
              imageUrl = publicUrl;
            }
            resolve();
          } catch (err) {
            console.error('Error making file public:', err.message);
            reject(new Error('Failed to make file public.'));
          }
        });
        
        blobStream.end(req.file.buffer);
      });
    }

    const newWebsite = new Website({
      ownerId,
      websiteName,
      websiteLink,
      imageUrl
    });

    const savedWebsite = await newWebsite.save();
    res.status(201).json(savedWebsite);
  } catch (error) {
    console.error('Error creating website:', error); // Log detailed error
    res.status(500).json({ message: 'Failed to create website', error });
  }
}];

exports.getAllWebsites = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;  // Pagination parameters
  try {
    const websites = await Website.find()
      .lean()  // Use lean for performance
      .select('ownerId websiteName websiteLink imageUrl createdAt')  // Fetch only necessary fields
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch websites', error });
  }
};

exports.getWebsitesByOwner = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const websites = await Website.find({ ownerId })
      .lean()
      .select('ownerId websiteName websiteLink imageUrl createdAt');
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch websites', error });
  }
};

exports.getWebsiteById = async (req, res) => {
  const { websiteId } = req.params;
  try {
    const website = await Website.findById(websiteId).lean();  // Use lean for fast loading
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json(website);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch website', error });
  }
};






















































// WebsiteModel.js
const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  websiteName: { type: String, required: true },
  websiteLink: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

websiteSchema.index({ ownerId: 1 }); // Index for faster query by ownerId

module.exports = mongoose.model('Website', websiteSchema);






























// AdCategoryModel.js
const mongoose = require('mongoose');

const adCategorySchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
  categoryName: { type: String, required: true, minlength: 3 },
  description: { type: String, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  customAttributes: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now }
});

adCategorySchema.virtual('adSpaces', {
  ref: 'AdSpace',
  localField: '_id',
  foreignField: 'categoryId',
});

adCategorySchema.index({ ownerId: 1 }); // Adding an index for frequent queries

module.exports = mongoose.model('AdCategory', adCategorySchema);































































// // AdSpaceModel.js
// const mongoose = require('mongoose');

// const adSpaceSchema = new mongoose.Schema({
//   categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdCategory', required: true },
//   spaceType: { type: String, required: true },
//   price: { type: Number, required: true, min: 0 },
//   availability: { type: String, required: true },
//   startDate: { type: Date, default: null },
//   endDate: { type: Date, default: null },
//   userCount: { type: Number, default: 0 },
//   instructions: { type: String },
//   apiCodes: {
//     HTML: { type: String },
//     JavaScript: { type: String },
//     PHP: { type: String },
//     Python: { type: String },
//   },
//   selectedAds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImportAd' }],
//   createdAt: { type: Date, default: Date.now },
//   webOwnerEmail: { type: String, required: true },
// });

// adSpaceSchema.virtual('remainingUserCount').get(function () {
//   return this.userCount - this.selectedAds.length;
// });

// adSpaceSchema.pre('validate', function (next) {
//   if (
//     (this.availability === 'Reserved for future date' || this.availability === 'Pick a date') &&
//     (!this.startDate || !this.endDate)
//   ) {
//     return next(new Error('Start date and end date must be provided for reserved or future availability.'));
//   }
//   next();
// });

// adSpaceSchema.index({ categoryId: 1 }); // Index for faster lookups

// adSpaceSchema.virtual('remainingUserCount').get(function() {
//   return this.userCount - this.selectedAds.length;
// });

// adSpaceSchema.set('toJSON', { virtuals: true });

// module.exports = mongoose.model('AdSpace', adSpaceSchema);

const mongoose = require('mongoose');

const adSpaceSchema = new mongoose.Schema({
  webOwnerId: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdCategory', required: true },
  spaceType: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  availability: { type: String, required: true },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  userCount: { type: Number, default: 0 },
  instructions: { type: String },
  apiCodes: {
    HTML: { type: String },
    JavaScript: { type: String },
    PHP: { type: String },
    Python: { type: String },
  },
  selectedAds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImportAd', default: [] }],
  createdAt: { type: Date, default: Date.now },
  webOwnerEmail: { type: String, required: true },
});

// Update virtual property to handle undefined `selectedAds` array
adSpaceSchema.virtual('remainingUserCount').get(function () {
  return this.userCount - (this.selectedAds ? this.selectedAds.length : 0);
});

adSpaceSchema.pre('validate', function (next) {
  if (
    (this.availability === 'Reserved for future date' || this.availability === 'Pick a date') &&
    (!this.startDate || !this.endDate)
  ) {
    return next(new Error('Start date and end date must be provided for reserved or future availability.'));
  }
  next();
});

adSpaceSchema.index({ categoryId: 1 }); // Index for faster lookups
adSpaceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AdSpace', adSpaceSchema);




















































// // importAdSchema.js
// const mongoose = require('mongoose');

// const importAdSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   businessName: { type: String, required: true },
//   businessLocation: { type: String },
//   adDescription: { type: String },
//   imageUrl: { type: String },
//   pdfUrl: { type: String },
//   videoUrl: { type: String },
//   templateType: { type: String},
//   categories: [{ type: String }],
//   paymentStatus: { type: String, default: 'pending' },
//   paymentRef: { type: String },
//   amount: { type: Number },
//   email: { type: String },
//   phoneNumber: { type: String },
// }, { timestamps: true });

// module.exports = mongoose.model('ImportAd', importAdSchema);



// ImportAdModel.js
const mongoose = require('mongoose');
const importAdSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  adOwnerEmail: { type: String, required: true },
  imageUrl: { type: String },
  pdfUrl: { type: String },
  videoUrl: { type: String },
  businessName: { type: String, required: true },
  businessLink: { type: String, required: true },
  businessLocation: { type: String, required: true },
  adDescription: { type: String, required: true },
  selectedWebsites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Website' }],
  selectedCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdCategory' }],
  selectedSpaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdSpace' }],
  approved: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false },
  clicks: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model('ImportAd', importAdSchema);























































// WebsiteModel.js
const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  websiteName: { type: String, required: true },
  websiteLink: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

websiteSchema.index({ ownerId: 1 }); // Index for faster query by ownerId

module.exports = mongoose.model('Website', websiteSchema);
























































// AdApprovalRoutes.js
const express = require('express');
const router = express.Router();
const adApprovalController = require('../controllers/AdApprovalController');

router.get('/pending/:ownerId', adApprovalController.getPendingAds);
router.get('/mixed/:userId', adApprovalController.getUserMixedAds);
router.get('/pending-ad/:adId', adApprovalController.getPendingAdById);
router.put('/approve/:adId', adApprovalController.approveAd);
// router.get('/approved-awaiting-confirmation/:userId', adApprovalController.getApprovedAdsAwaitingConfirmation);
router.get('/ad-details/:adId', adApprovalController.getAdDetails);
// router.put('/confirm/:adId', adApprovalController.confirmAdDisplay);
router.post('/initiate-payment', adApprovalController.initiateAdPayment);
router.get('/callback', adApprovalController.adPaymentCallback);
router.get('/balance/:userId', adApprovalController.getWebOwnerBalance);
router.get('/payments/:userId', adApprovalController.getOwnerPayments);
router.get('/approved-ads', adApprovalController.getApprovedAds);
router.get('/approved/:ownerId', adApprovalController.getApprovedAdsByUser);
// router.get('/user-pending/:userId', adApprovalController.getUserPendingAds);

module.exports = router;





































































// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const axios = require('axios');
const setupWebSocketServer = require('./config/websocketServer'); // Add this line
const waitlistRoutes = require('./routes/WaitlistRoutes');
const sitePartnersRoutes = require('./routes/SitePartnersRoutes');
const importAdRoutes = require('./routes/ImportAdRoutes');
const requestAdRoutes = require('./routes/RequestAdRoutes');
const websiteRoutes = require('./routes/WebsiteRoutes');
const adCategoryRoutes = require('./routes/AdCategoryRoutes');
const adSpaceRoutes = require('./routes/AdSpaceRoutes');
const apiGeneratorRoutes = require('./routes/ApiGeneratorRoutes');
const adApprovalRoutes = require('./routes/AdApprovalRoutes');
const adDisplayRoutes = require('./routes/AdDisplayRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const payoutRoutes = require('./routes/payoutRoutes');
const pictureRoutes = require('./routes/PictureRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Add this line
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/join-site-waitlist', sitePartnersRoutes);
app.use('/api/join-waitlist', waitlistRoutes);
app.use('/api/importAds', importAdRoutes);
app.use('/api/requestAd', requestAdRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/ad-categories', adCategoryRoutes);
app.use('/api/ad-spaces', adSpaceRoutes);
app.use('/api/generate-api', apiGeneratorRoutes);
app.use('/api/accept', adApprovalRoutes);
app.use('/api/ads', adDisplayRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/picture', pictureRoutes);
app.use('/api/payout', payoutRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Set up WebSocket server with existing socket.io instance
setupWebSocketServer(server, io); // Add this line

module.exports.io = io;
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });