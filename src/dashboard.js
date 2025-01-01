// Home.js
import React from 'react'
import './index.css'
import './home.css'
import Header from './components/header'
import Session2 from './components/session2'

function Home() {
  return (
    <div className='ad-waitlist dashboard-container'>
      <Header />
      <Session2 />
    </div>
  )
}

export default Home