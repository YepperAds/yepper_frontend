import React from 'react'
import './styles/select.css'
import { Link } from 'react-router-dom'

function Select() {
  return (
    <div className='select-container'>
      <form>
        <div className='file-input'>
          <input type='file' id='file' className='file' />
          <label htmlFor='file'>
            <img src='https://cdn-icons-png.flaticon.com/512/685/685817.png' alt='Upload icon' />
            Choose File
          </label>
        </div>
        <Link to='/categories' className='next-link'>Next</Link>
      </form>
    </div>
  )
}

export default Select
