import React from 'react'
import { Link } from 'react-router-dom'
import './styles/addButton.css'
import add from '../../assets/img/plus (1).png';

function AddButton() {
  return (
    <div  className='session1'>
      <Link to='/request' className='button'>
        <img src={add} alt='' />
        New Ad
      </Link>
    </div>
  )
}

export default AddButton