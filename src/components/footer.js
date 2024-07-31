import React from 'react';
import './styles/footer.css';
import Logo from './logo';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='upper'>
        <div className='logo-container'>
          <Logo />
        </div>

        <div className='subs'>
          <div className='sub'>
            <div className='title'>
              <label>Market Focus</label>
            </div>
            <div className='links'>
              <a href='/'>Local Business</a>
              <a href='/'>National Business</a>
              <a href='/'>East African Region</a>
            </div>
          </div>

          <div className='sub'>
            <div className='title'>
              <label>Categories</label>
            </div>
            <div className='links'>
              <a href='/'>Manufacture</a>
              <a href='/'>Agriculture</a>
              <a href='/'>Retail</a>
              <a href='/'>Services</a>
              <a href='/'>Technology</a>
              <a href='/'>Hospitality</a>
              <a href='/'>Transportation & Logistics</a>
              <a href='/'>Real Estate</a>
            </div>
          </div>

          <div className='sub'>
            <div className='title'>
              <label>Ownership</label>
            </div>
            <div className='links'>
              <a href='/'>Sole Proprietorship</a>
              <a href='/'>Partnership</a>
              <a href='/'>Corporation</a>
            </div>
          </div>
        </div>
      </div>

      <div className='middle'>
        <div className='subs'>
          <div className='sub'>
            <div className='title'>
              <label>Information</label>
            </div>
            <div className='links'>
              <a href='/'>Pricing</a>
              <a href='/'>Terms and Conditions</a>
              <a href='/'>About Us</a>
            </div>
          </div>

          <div className='sub'>
            <div className='title'>
              <label>Support</label>
            </div>
            <div className='links'>
              <a href='/'>FAQ</a>
              <a href='/'>Contacts</a>
            </div>
          </div>
        </div>
      </div>

      <div className='lower'>
        <label>© 2010-2024 Yepper Company S.L. All rights reserved.</label>
      </div>
    </div>
  );
}

export default Footer;
