import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './styles/request.css'
import Header from '../components/header'
import Support from "../components/support";
import support from '../assets/img/question.png'

function Request() {

  return (
    <>
      <Header />

      <Support />

      <div className='request-container'>
        {/* <Link className='object' to='/file'>
          <img className='background' src='https://img.freepik.com/premium-photo/two-handshake-front-red-background_1081342-43484.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' />
          <h1>Create your Ads with us</h1>
          <img src='https://cdn-icons-png.flaticon.com/128/1828/1828817.png' alt='' />
        </Link> */}

        {/* <Link className='object' to='/select'>
          <img className='background' src='https://img.freepik.com/premium-photo/modern-workday-bliss-black-woman-balances-work-breakfast-cozy-living-room_1164924-30919.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' />
          <h1>Import your Ad</h1>
          <img src='https://cdn-icons-png.flaticon.com/128/1828/1828817.png' alt='' />
        </Link> */}
        <Link className='object' to='/select'>
          <img className='background' src='https://img.freepik.com/premium-photo/modern-workday-bliss-black-woman-balances-work-breakfast-cozy-living-room_1164924-30919.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' />
          <h1>Import your Ad</h1>
          <img src='https://cdn-icons-png.flaticon.com/128/1828/1828817.png' alt='' />
        </Link>
      </div>
    </>
  )
}

export default Request
