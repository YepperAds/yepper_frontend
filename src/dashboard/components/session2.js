import React from "react";
import './styles/session2.css'
import AdsContainer from "./AdsContainer";
import WebsContainer from "./WebsContainer";
// import ApsContainer from "./ApsContainer";
// import EmailsContainer from "./EmailsContainer";

function Session2() {
    return (
        <div className='posts-container'>
            <AdsContainer />
            <WebsContainer/>
            {/* <ApsContainer /> */}
            {/* <EmailsContainer /> */}
        </div>
    )
}

export default Session2