import React from "react";
import './styles/session2.css'
import ApprovedAds from "./approvedAds";
import PendingAds from "./pendingAds";
// import AdsContainer from "./AdsContainer";
// import WebsContainer from "./WebsContainer";
// import ApsContainer from "./ApsContainer";
// import EmailsContainer from "./EmailsContainer";

function Session2() {
    return (
        <div className='posts-container'>
            <ApprovedAds />
            <PendingAds />
            {/* <AdsContainer /> */}
            {/* <WebsContainer/> */}
            {/* <ApsContainer /> */}
            {/* <EmailsContainer /> */}
        </div>
    )
}

export default Session2