import React from 'react'
import './styles/seachField.css'

export default function SearchField() {
  return (
    <div className='search-container'>
        <div className='container'>
            <div className='input-ctn'>
                <input type='text' placeholder='Type category...'/>
            </div>
            <button>Search Ads</button>
        </div>
    </div>
  )
}
