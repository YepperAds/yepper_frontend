import React from 'react';
import './styles/section1.css';
import ads from '../assets/img/adsTemplate.png'
function Section1() {
  return (
    <div className='slide1'>
      <div className='left'>
        <h1>Make Your Business Bigger!</h1>
      </div>

      <div className='middle'>
        <img src={ads} alt='Advertising Icons' />
      </div>

      <div className='right'>
        <h1>How?</h1>
        <p>With Yepper, you can create, maintain, and manage your ads anytime, anywhere, using just one dashboard!</p>
      </div>
    </div>
  );
}

export default Section1;
