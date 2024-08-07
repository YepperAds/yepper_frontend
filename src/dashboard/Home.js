import React from 'react'
import '../index.css'
import './styles/home.css'
import Header from './header'
import AddButton from './components/addButton'
import Session2 from './components/session2'

function Home() {
  return (
    <div className='dashboard-container'>
      <Header />
      <AddButton />
      <Session2 />
    </div>
  )
}

export default Home