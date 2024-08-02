import React from 'react';
import './styles/section1.css';

function Section1() {
  return (
    <div className='slide1'>
      <div className='left'>
        <h1>Make Your Business Bigger!</h1>
      </div>

      <div className='middle'>
        <img src='https://img.freepik.com/free-vector/advertising-icons-set_1284-4537.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='Advertising Icons' />
      </div>

      <div className='right'>
        <h1>How?</h1>
        <p>With Yepper, you can create, maintain, and manage your ads anytime, anywhere, using just one dashboard!</p>
      </div>
    </div>
  );
}

export default Section1;
