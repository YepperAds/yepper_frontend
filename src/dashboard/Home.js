import React from 'react'
import './styles/home.css'
import Header from './header'
import AddButton from './components/addButton'

function Home() {
  return (
    <div className='dashboard-container'>
      <Header />
      <AddButton />
    </div>
  )
}

export default Home