// LoadingSpinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners';
import './styles/LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div className="loading-spinner-container">
            <ClipLoader color="#4A90E2" size={50} />
        </div>
    );
}

export default LoadingSpinner;
