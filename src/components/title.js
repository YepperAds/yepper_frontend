import React from 'react'
import './styles/title.css'
import { Link } from 'react-router-dom'

function Title() {
    return (
        <div className='home-title'>
            <h1>Spaces That Captivate</h1>
            <div>
                <p>Tired of boring ads that go unnoticed?</p>
                <p>Choose, create, connect, and captivate</p>
                <p>Because ads should be anything but invisible</p>
            </div>
            <div className='btn-container'>
                <Link to='select' className='btn'>Get started</Link>
                <Link to='contact' className='btn contact-btn'>Contact us</Link>
            </div>
        </div>
    )
}

export default Title