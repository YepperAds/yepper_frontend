import React from 'react';
import './styles/seachField.css';
import dashboard_dark from '../assets/img/dashboard (1).png';

export default function SearchField() {
  return (
    <div className='search-container'>
        <div className='container'>
            <div className='input-ctn'>
                <img src={dashboard_dark} alt='' className='icon' />
                <input type='text' id='text' placeholder='Type category...' />
            </div>
            <button>Search Ads</button>
        </div>
    </div>
  )
}
