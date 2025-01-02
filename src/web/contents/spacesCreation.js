import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUser } from '@clerk/clerk-react';
import { 
  CheckCircle, 
  Info, 
  XCircle, 
  Calendar, 
  Clock, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import headerImg from '../../img/header.png'

function SpacesCreation() {
  const { user } = useUser();
  const webOwnerId = user?.id;
  const webOwnerEmail = user.primaryEmailAddress.emailAddress;
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCategories, prices, customCategory } = location.state;
  const [spaces, setSpaces] = useState({});
  const [loading, setLoading] = useState(false);
  const [infoModal, setInfoModal] = useState({ open: false, content: null, image: null });

  const availabilityOptions = [
    { 
      label: 'Available now', 
      icon: <Clock className="mr-2 text-green-500" />,
      description: 'Immediate availability' 
    },
    { 
      label: 'Reserved for future date', 
      icon: <Calendar className="mr-2 text-blue-500" />,
      description: 'Select specific date range' 
    },
    { 
      label: 'Always available', 
      icon: <RefreshCw className="mr-2 text-purple-500" />,
      description: 'Continuous accessibility' 
    },
    { 
      label: 'Pick a date', 
      icon: <Calendar className="mr-2 text-orange-500" />,
      description: 'Choose specific date' 
    }
  ];

  const handleAvailabilityClick = (category, space) => {
    setSpaces((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [space]: {
          ...prevState[category]?.[space],
          availabilityOptionsVisible: !prevState[category]?.[space]?.availabilityOptionsVisible,
        },
      },
    }));
  };

  const handleAvailabilityOptionClick = (category, space, option) => {
    if (option === 'Reserved for future date' || option === 'Pick a date') {
      setSpaces((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [space]: {
            ...prevState[category]?.[space],
            currentOption: option,
            isDatePickerVisible: true,
          },
        },
      }));
    } else {
      setSpaces((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [space]: {
            ...prevState[category]?.[space],
            availability: option,
            isDatePickerVisible: false,
            availabilityOptionsVisible: false,
          },
        },
      }));
    }
  };

  const resetAvailability = (category, space) => {
    setSpaces((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [space]: {
          availability: 'Select Availability',
          startDate: null,
          endDate: null,
          isDatePickerVisible: false,
        },
      },
    }));
  };

  const saveDateRange = (category, space) => {
    const { startDate, endDate, currentOption } = spaces[category]?.[space] || {};
    if (startDate && endDate) {
      const formattedDateRange = `${formatDate(startDate)} to ${formatDate(endDate)}`;
      setSpaces((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [space]: {
            ...prevState[category]?.[space],
            availability: `${currentOption}: ${formattedDateRange}`,
            isDatePickerVisible: false,
            availabilityOptionsVisible: false,
          },
        },
      }));
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  const handleSpaceChange = (category, space, field, value) => {
    setSpaces((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [space]: {
          ...prevState[category]?.[space],
          [field]: value,
        },
      },
    }));
  };

  const toggleSpaceSelection = (category, space) => {
    setSpaces((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [space]: {
          ...prevState[category]?.[space],
          checked: !prevState[category]?.[space]?.checked,
        },
      },
    }));
  };

  const submitSpacesToDatabase = async () => {
    setLoading(true);
    if (!webOwnerId) {
      console.error('user ID is missing');
      return;
    }
    try {
      for (const category in spaces) {
        const spaceData = spaces[category];
        const categoryId = selectedCategories[category]?.id;

        if (categoryId) {
          for (const spaceType of ['header', 'sidebar']) {
            if (spaceData[spaceType]) {
              const { availability, startDate, endDate, price, userCount, instructions } = spaceData[spaceType];
              // Submit the ad space data
              await axios.post('https://yepper-backend.onrender.com/api/ad-spaces', {
                webOwnerId,
                categoryId,
                spaceType: spaceType.charAt(0).toUpperCase() + spaceType.slice(1),
                price,
                availability,
                userCount,
                instructions: instructions || '',
                startDate,
                endDate,
                webOwnerEmail
              });
            }
          }
        }
      }
      setLoading(false);
      navigate('/projects')
    } catch (error) {
      console.error('Error creating ad spaces:', error);
      setLoading(false);
      alert('Failed to create ad spaces. Please try again.');
    }
  };

  const openInfoModal = (content, image) => {
    setInfoModal({ open: true, content, image });
  };

  const closeInfoModal = () => {
    setInfoModal({ open: false, content: null, image: null });
  };

  const InfoModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-md w-full mx-auto">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeInfoModal}>
          <XCircle size={24} />
        </button>
        {infoModal.image && <img src={infoModal.image} alt="Info" className="w-full rounded-md mb-4 object-cover" />}
        <div>{infoModal.content}</div>
      </div>
    </div>
  );

  const renderAvailabilityOptions = (category, space) => {
    const spaceData = spaces[category]?.[space];
    return (
      <div className="container mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {availabilityOptions.map((option, index) => (
          <div
            key={index}
            className="availability-option 
              flex items-center justify-between 
              px-3 py-2 
              hover:bg-gray-50 
              cursor-pointer 
              transition-colors 
              group"
            onClick={() => handleAvailabilityOptionClick(category, space, option.label)}
          >
            <div className="flex items-center space-x-2">
              {option.icon}
              <div>
                <p className="font-medium text-gray-800 group-hover:text-blue-600 text-sm sm:text-base">
                  {option.label}
                </p>
                <p className="text-xs text-gray-500">
                  {option.description}
                </p>
              </div>
            </div>
            {spaceData?.availability === option.label && (
              <CheckCircle className="text-green-500" size={20} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSpacesForCategory = (category) => (
    <div 
      className="space-category-container 
        bg-white 
        rounded-2xl 
        shadow-xl 
        border 
        border-gray-200 
        p-4 sm:p-6 
        mb-6 
        transition-all 
        duration-300 
        hover:shadow-2xl"
      key={category}
    >
      <div className="category-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize mb-2 sm:mb-0">
          {category} Space
        </h3>
        <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {category}
        </span>
      </div>

      <div 
        className={`space-selection 
          border-2 
          rounded-xl 
          p-3 sm:p-5 
          transition-all 
          duration-300 
          ${spaces[category]?.header?.checked 
            ? 'border-blue-500 bg-blue-50/50' 
            : 'border-gray-300 hover:border-blue-300'}`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img 
              src={headerImg} 
              alt='Header Space' 
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg shadow-md"
            />
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-700">Header Space</h4>
              <p className="text-xs sm:text-sm text-gray-500">Primary visibility zone</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleSpaceSelection(category, 'header');
              }}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm transition-all duration-300 
                ${spaces[category]?.header?.checked 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {spaces[category]?.header?.checked ? 'Selected' : 'Select'}
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                openInfoModal(
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">Header Space Definition</h2>
                    <p className="mb-4 text-sm sm:text-base">The header space is the area at the top of a webpage, often highly visible and ideal for placing advertisements. Ads in this space are designed to capture attention immediately when users land on the page.</p>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Process in Yepper:</h3>
                    <ol className="list-decimal pl-6 mb-4 text-sm sm:text-base">
                      <li className="mb-2">
                        <strong>Website Owner Setup:</strong> The website owner creates an advertising space within the header section and categorizes it (e.g., "Premium Header Banner"). An API for this space is generated by Yepper.
                      </li>
                      <li className="mb-2">
                        <strong>Advertiser Selection:</strong> Advertisers browse available ad spaces and choose the header space on the desired website. They upload the ad content (e.g., image, text, or banner), select the category, and submit it for approval.
                      </li>
                      <li>
                        <strong>Approval and Placement:</strong> Once the ad is approved by the website owner or Yepper's team, it goes live in the header space. The system tracks ad performance metrics, such as views and clicks.
                      </li>
                    </ol>
                  </>,
                  headerImg
                )
              }}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Info size={24} />
            </button>
          </div>
        </div>

        {spaces[category]?.header?.checked && (
          <div className="space-details-grid grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="price-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter price"
                  onChange={(e) => handleSpaceChange(category, 'header', 'price', e.target.value)}
                />
              </div>
            </div>

            <div className="user-count-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Count
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Estimated users"
                onChange={(e) => handleSpaceChange(category, 'header', 'userCount', e.target.value)}
              />
            </div>

            <div className="availability-section relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <div 
                className={`
                  availability-trigger 
                  flex items-center justify-between 
                  px-3 py-2 
                  text-sm
                  border rounded-md 
                  cursor-pointer 
                  transition-all 
                  ${spaces[category]?.header?.availability !== 'Select Availability' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:border-blue-300'}
                `}
                onClick={() => handleAvailabilityClick(category, 'header')}
              >
                <div className="flex items-center">
                  {spaces[category]?.header?.availability === 'Select Availability' 
                    ? <ChevronDown className="mr-2" size={20} /> 
                    : <ChevronUp className="mr-2" size={20} />
                  }
                  {spaces[category]?.header?.availability}
                </div>
                {spaces[category]?.header?.availability !== 'Select Availability' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      resetAvailability(category, 'header');
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <XCircle size={20} />
                  </button>
                )}
              </div>

              {spaces[category]?.header?.availabilityOptionsVisible && 
                renderAvailabilityOptions(category, 'header')}

              {spaces[category]?.header?.isDatePickerVisible && (
                <div className="date-range-picker mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <DatePicker
                      selected={spaces[category]?.header?.startDate}
                      onChange={(date) => handleSpaceChange(category, 'header', 'startDate', date)}
                      selectsStart
                      startDate={spaces[category]?.header?.startDate}
                      endDate={spaces[category]?.header?.endDate}
                      minDate={new Date()}
                      placeholderText="Start Date"
                      dateFormat="dd/MM/yyyy"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <DatePicker
                      selected={spaces[category]?.header?.endDate}
                      onChange={(date) => handleSpaceChange(category, 'header', 'endDate', date)}
                      selectsEnd
                      startDate={spaces[category]?.header?.startDate}
                      endDate={spaces[category]?.header?.endDate}
                      minDate={spaces[category]?.header?.startDate || new Date()}
                      placeholderText="End Date"
                      dateFormat="dd/MM/yyyy"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button 
                    onClick={() => saveDateRange(category, 'header')} 
                    className="col-span-full mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Date Range
                  </button>
                </div>
              )}
            </div>

            <div className="instructions-input col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Instructions
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter any specific instructions"
                rows={3}
                onChange={(e) => handleSpaceChange(category, 'header', 'instructions', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center">
            Configure Ad Spaces
          </h2>

          {selectedCategories.banner && renderSpacesForCategory('banner')}
          {selectedCategories.popup && renderSpacesForCategory('popup')}
          {selectedCategories.custom && renderSpacesForCategory('custom')}

          <div className="mt-6 sm:mt-8">
            <button 
              onClick={submitSpacesToDatabase} 
              disabled={loading} 
              className="w-full py-2 sm:py-3 px-4 
                text-sm sm:text-base
                bg-gradient-to-r from-blue-600 to-blue-700 
                text-white 
                rounded-lg 
                hover:from-blue-700 hover:to-blue-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                focus:ring-offset-2 
                transition-all 
                disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Continue to View APIs'}
            </button>
          </div>
        </div>
      </div>

      {infoModal.open && <InfoModal />}
    </div>
  );
}

export default SpacesCreation;