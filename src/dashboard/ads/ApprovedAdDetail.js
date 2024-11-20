// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useClerk } from '@clerk/clerk-react';
// import axios from 'axios';
// import './styles/ApprovedAdDetail.css';
// import sound from '../../assets/img/speaker-filled-audio-tool.png'
// import mute from '../../assets/img/mute.png'
// import play from '../../assets/img/play-buttton.png'
// import pause from '../../assets/img/pause.png'
// import clicks from '../../assets/img/click (1).png';

// function ApprovedAdDetail() {
//     const { adId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useClerk();
//     const userId = user?.id;

//     const [ad, setAd] = useState(null);
//     const [relatedAds, setRelatedAds] = useState([]);
//     const [filteredAds, setFilteredAds] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [muted, setMuted] = useState(true);
//     const [isPaused, setIsPaused] = useState(false);
//     const [isZoomed, setIsZoomed] = useState(false);
//     const videoRef = useRef(null);

//     useEffect(() => {
//         const fetchAdDetails = async () => {
//             try {
//                 const adResponse = await axios.get(`https://yepper-backend.onrender.com/api/accept/ad-details/${adId}`);
//                 setAd(adResponse.data);

//                 const relatedResponse = await axios.get(`https://yepper-backend.onrender.com/api/accept/approved-awaiting-confirmation/${userId}`);
//                 const relatedAdsData = relatedResponse.data.filter((otherAd) => otherAd._id !== adId);
//                 setRelatedAds(relatedAdsData);
//                 setFilteredAds(relatedAdsData); // Initialize filtered ads

//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to load ad details or related ads');
//                 setLoading(false);
//             }
//         };

//         if (userId) fetchAdDetails();
//     }, [adId, userId]);

//     const handleSearch = (e) => {
//         const query = e.target.value.toLowerCase();
//         setSearchQuery(query);

//         const matchedAds = relatedAds.filter((otherAd) =>
//             otherAd.businessName.toLowerCase().includes(query)
//         );
//         setFilteredAds(matchedAds);
//     };

//     const confirmAd = async () => {
//         try {
//             const response = await fetch(`https://yepper-backend.onrender.com/api/accept/confirm/${adId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 alert(`Ad confirmed and now live! Total Price: ${data.totalPrice}`);
//                 setAd(prevAd => ({ ...prevAd, confirmed: true }));
//             } else {
//                 throw new Error('Failed to confirm ad');
//             }
//         } catch (error) {
//             console.error('Error confirming ad:', error);
//             alert('Failed to confirm ad. Please try again later.');
//         }
//     };

//     const toggleMute = () => setMuted(!muted);

//     const togglePause = () => {
//         if (videoRef.current) {
//             if (isPaused) {
//                 videoRef.current.play();
//             } else {
//                 videoRef.current.pause();
//             }
//             setIsPaused(!isPaused);
//         }
//     };

//     const toggleZoom = () => setIsZoomed(!isZoomed);

//     const handleAdClick = (newAdId) => {
//         navigate(`/ad-detail/${newAdId}`);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className='details'>
//             <div className='main-title'>
//                 <h1 className="details-title">Approved Ads</h1>
//                 <div className="search-bar">
//                     <input
//                         type="text"
//                         placeholder="Search by business name..."
//                         value={searchQuery}
//                         onChange={handleSearch}
//                         className="search-input"
//                     />
//                 </div>
//             </div>
//             <div className="ad-detail-container">
//                 <div className="ad-main-content">
//                     {ad.videoUrl ? (
//                         <div className="video-container" onClick={togglePause}>
//                             <video
//                                 ref={videoRef}
//                                 src={`https://yepper-backend.onrender.com${ad.videoUrl}`}
//                                 autoPlay
//                                 loop
//                                 muted={muted}
//                                 className="ad-video"
//                             />
//                             <div className="video-controls">
//                                 <button className="mute-button" onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
//                                     {muted ? '🔇' : '🔊'}
//                                 </button>
//                             </div>
//                             <div className="pause-overlay">
//                                 {isPaused ? '▶️' : '⏸️'}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className={`image-container ${isZoomed ? 'zoomed' : ''}`} onClick={toggleZoom}>
//                             <img
//                                 src={`https://yepper-backend.onrender.com${ad.imageUrl}`}
//                                 alt="Ad Visual"
//                                 className="ad-image"
//                             />
//                         </div>
//                     )}
//                     <div className="ad-info">
//                         <div className='main'>
//                             <h2>{ad.businessName}</h2>
//                             <div className='impressions'>
//                                 <p><strong>Views:</strong> {ad.views}</p>
//                                 <p><strong>Clicks:</strong> {ad.clicks}</p>
//                             </div>
//                         </div>
//                         <p><strong>Location:</strong> {ad.businessLocation}</p>
//                         <p><strong>Description:</strong> {ad.adDescription}</p>

//                         <h3>Websites</h3>
//                         <ul>
//                             {ad.selectedWebsites.map((website) => (
//                                 <li key={website._id}>
//                                     <p><strong>Name:</strong> {website.websiteName}</p>
//                                     <p><strong>Link:</strong> <a href={website.websiteLink} target="_blank" rel="noopener noreferrer">{website.websiteLink}</a></p>
//                                 </li>
//                             ))}
//                         </ul>

//                         <h3>Categories</h3>
//                         <ul>
//                             {ad.selectedCategories.map((category) => (
//                                 <li key={category._id}>
//                                     <p><strong>Name:</strong> {category.categoryName}</p>
//                                     <p><strong>Price:</strong> ${category.price}</p>
//                                 </li>
//                             ))}
//                         </ul>

//                         <h3>Spaces</h3>
//                         <ul>
//                             {ad.selectedSpaces.map((space) => (
//                                 <li key={space._id}>
//                                     <p><strong>Type:</strong> {space.spaceType}</p>
//                                     <p><strong>Price:</strong> ${space.price}</p>
//                                 </li>
//                             ))}
//                         </ul>

//                         {ad.pdfUrl && <a href={`https://yepper-backend.onrender.com${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer" className="pdf-link">View PDF</a>}
//                     </div>
//                     {!ad.confirmed && (
//                         <button onClick={confirmAd} className="confirm-ad-button">
//                             Confirm Ad
//                         </button>
//                     )}
//                 </div>
//                 <div className="related-ads">
//                     <h3>Related Ads</h3>
//                     {filteredAds.slice().reverse().map(otherAd => (
//                         <div key={otherAd._id} className={`related-ad ${otherAd.isConfirmed ? 'confirmed' : 'awaiting-confirmation'}`} onClick={() => handleAdClick(otherAd._id)}>
//                             {otherAd.videoUrl ? (
//                                 <video
//                                     autoPlay
//                                     loop
//                                     muted
//                                     className='ad'
//                                 >
//                                     <source src={`https://yepper-backend.onrender.com${otherAd.videoUrl}`} type="video/mp4" />
//                                 </video>
//                             ) : (
//                                 otherAd.imageUrl && <img src={`https://yepper-backend.onrender.com${otherAd.imageUrl}`} alt="Related Ad" className='ad' />
//                             )}
//                             <div className='data'>
//                                 <div className='reaction'>
//                                     <p className='impression'>
//                                         {otherAd.views}
//                                     </p>
//                                 </div>
//                                 <p className='name'>{otherAd.businessName}</p>
//                                 <div className='reaction'>
//                                     <p className='impression'>
//                                         <img src={clicks} alt='' />
//                                         {otherAd.clicks}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ApprovedAdDetail;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Install react-icons if not already

import axios from 'axios';
import './styles/ApprovedAdDetail.css';
import sound from '../../assets/img/speaker-filled-audio-tool.png';
import mute from '../../assets/img/mute.png';
import play from '../../assets/img/play-buttton.png';
import pause from '../../assets/img/pause.png';
import clicks from '../../assets/img/click (1).png';

function ApprovedAdDetail() {
    const { adId } = useParams();
    const navigate = useNavigate();
    const { user } = useClerk();
    const userId = user?.id;
    const [isExpanded, setIsExpanded] = useState(false);
    const [ad, setAd] = useState(null);
    const [relatedAds, setRelatedAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [muted, setMuted] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const adResponse = await axios.get(`https://yepper-backend.onrender.com/api/accept/ad-details/${adId}`);
                setAd(adResponse.data);

                const relatedResponse = await axios.get(`https://yepper-backend.onrender.com/api/accept/approved-awaiting-confirmation/${userId}`);
                const relatedAdsData = relatedResponse.data.filter((otherAd) => otherAd._id !== adId);
                setRelatedAds(relatedAdsData);
                setFilteredAds(relatedAdsData);

                setLoading(false);
            } catch (err) {
                setError('Failed to load ad details or related ads');
                setLoading(false);
            }
        };

        if (userId) fetchAdDetails();
    }, [adId, userId]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const matchedAds = relatedAds.filter((otherAd) =>
            otherAd.businessName.toLowerCase().includes(query)
        );
        setFilteredAds(matchedAds);
    };

    const confirmAd = async () => {
        try {
            const response = await fetch(`https://yepper-backend.onrender.com/api/accept/confirm/${adId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                alert(`Ad confirmed and now live! Total Price: ${data.totalPrice}`);
                setAd(prevAd => ({ ...prevAd, confirmed: true }));
            } else {
                throw new Error('Failed to confirm ad');
            }
        } catch (error) {
            console.error('Error confirming ad:', error);
            alert('Failed to confirm ad. Please try again later.');
        }
    };

    const toggleMute = () => setMuted(!muted);

    const togglePause = () => {
        if (videoRef.current) {
            if (isPaused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
            setIsPaused(!isPaused);
        }
    };

    const toggleZoom = () => setIsZoomed(!isZoomed);

    const handleAdClick = (newAdId) => {
        navigate(`/approved-detail/${newAdId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='details'>
            <div className="main-title">
                <Link to="/approved-dashboard" className="back-button">← Go to Dashboard</Link>
                <h1 className="details-title">Approved Ads</h1>
                <div className="search-bar">
                    <input
                    type="text"
                    placeholder="Search by business name..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                    />
                </div>
            </div>

            <div className="ad-detail-container">
                <div className="ad-main-content">
                    {ad.videoUrl ? (
                        <div className="video-container" onClick={togglePause}>
                            <video
                                ref={videoRef}
                                src={`https://yepper-backend.onrender.com${ad.videoUrl}`}
                                autoPlay
                                loop
                                muted={muted}
                                className="ad-video"
                            />
                            <div className="video-controls">
                                <button className="mute-button" onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
                                    <img className='sound' src={muted ? mute : sound} alt="Mute/Unmute" />
                                </button>
                            </div>
                            <div className="pause-overlay">
                                <img className='pause-play' src={isPaused ? play : pause} alt="Play/Pause" />
                            </div>
                        </div>
                    ) : (
                        <div className={`image-container ${isZoomed ? 'zoomed' : ''}`} onClick={toggleZoom}>
                            <img
                                src={`https://yepper-backend.onrender.com${ad.imageUrl}`}
                                alt="Ad Visual"
                                className="ad-image"
                            />
                        </div>
                    )}
                    {!ad.confirmed && (
                        <button onClick={confirmAd} className="confirm-ad-button">
                            Confirm Ad
                        </button>
                    )}
                    {/* <div className="ad-info">
                        <div className='main'>
                            <h2>{ad.businessName}</h2>
                            <div className='impressions'>
                                <p><strong>Views:</strong> {ad.views}</p>
                                <p><strong>Clicks:</strong> {ad.clicks}</p>
                            </div>
                        </div>
                        <p><strong>Location:</strong> {ad.businessLocation}</p>
                        <p><strong>Description:</strong> {ad.adDescription}</p>

                        <h3>Websites</h3>
                        <ul>
                            {ad.selectedWebsites.map((website) => (
                                <li key={website._id}>
                                    <p><strong>Name:</strong> {website.websiteName}</p>
                                    <p><strong>Link:</strong> <a href={website.websiteLink} target="_blank" rel="noopener noreferrer">{website.websiteLink}</a></p>
                                </li>
                            ))}
                        </ul>

                        <h3>Categories</h3>
                        <ul>
                            {ad.selectedCategories.map((category) => (
                                <li key={category._id}>
                                    <p><strong>Name:</strong> {category.categoryName}</p>
                                    <p><strong>Price:</strong> ${category.price}</p>
                                </li>
                            ))}
                        </ul>

                        <h3>Spaces</h3>
                        <ul>
                            {ad.selectedSpaces.map((space) => (
                                <li key={space._id}>
                                    <p><strong>Type:</strong> {space.spaceType}</p>
                                    <p><strong>Price:</strong> ${space.price}</p>
                                </li>
                            ))}
                        </ul>

                        {ad.pdfUrl && <a href={`https://yepper-backend.onrender.com${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer" className="pdf-link">View PDF</a>}
                    </div> */}
                    
                    <div className="ad-info">
                        <div className="main">
                            <h2>{ad.businessName}</h2>
                            <div className="impressions">
                                <p><strong>Views:</strong> {ad.views}</p>
                                <p><strong>Clicks:</strong> {ad.clicks}</p>
                            </div>
                            <button className="toggle-button" onClick={toggleExpand}>
                                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                        </div>

                        {isExpanded && (
                            <div className="details-content">
                                <p><strong>Location:</strong> {ad.businessLocation}</p>
                                <p><strong>Description:</strong> {ad.adDescription}</p>

                                <h3>Websites</h3>
                                <ul>
                                    {ad.selectedWebsites.map((website) => (
                                        <li key={website._id}>
                                            <p><strong>Name:</strong> {website.websiteName}</p>
                                            <p><strong>Link:</strong> <a href={website.websiteLink} target="_blank" rel="noopener noreferrer">{website.websiteLink}</a></p>
                                        </li>
                                    ))}
                                </ul>

                                <h3>Categories</h3>
                                <ul>
                                    {ad.selectedCategories.map((category) => (
                                        <li key={category._id}>
                                            <p><strong>Name:</strong> {category.categoryName}</p>
                                            <p><strong>Price:</strong> ${category.price}</p>
                                        </li>
                                    ))}
                                </ul>

                                <h3>Spaces</h3>
                                <ul>
                                    {ad.selectedSpaces.map((space) => (
                                        <li key={space._id}>
                                            <p><strong>Type:</strong> {space.spaceType}</p>
                                            <p><strong>Price:</strong> ${space.price}</p>
                                        </li>
                                    ))}
                                </ul>

                                {ad.pdfUrl && <a href={`https://yepper-backend.onrender.com${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer" className="pdf-link">View PDF</a>}
                            </div>
                        )}
                    </div>
                </div>
                <div className="related-ads">
                    <h3>Related Ads</h3>
                    {filteredAds.slice().reverse().map(otherAd => (
                        <div key={otherAd._id} className={`related-ad ${otherAd.isConfirmed ? 'confirmed' : 'awaiting-confirmation'}`} onClick={() => handleAdClick(otherAd._id)}>
                            {otherAd.videoUrl ? (
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    className='ad'
                                >
                                    <source src={`https://yepper-backend.onrender.com${otherAd.videoUrl}`} type="video/mp4" />
                                </video>
                            ) : (
                                otherAd.imageUrl && <img src={`https://yepper-backend.onrender.com${otherAd.imageUrl}`} alt="Related Ad" className='ad' />
                            )}
                            <div className='data'>
                                <div className='reaction'>
                                    <p className='impression'>
                                        {otherAd.views}
                                    </p>
                                </div>
                                <p className='name'>{otherAd.businessName}</p>
                                <div className='reaction'>
                                    <p className='impression'>
                                        <img src={clicks} alt='Clicks' />
                                        {otherAd.clicks}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ApprovedAdDetail;