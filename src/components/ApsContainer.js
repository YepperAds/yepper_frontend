import React from 'react'
import { Link } from "react-router-dom";
import './styles/session2.css'

function ApsContainer() {
    return (
        <div className='object media'>
            <div className='title'>
                <h4>21</h4>
                <h3>Apps</h3>
            </div>

            <div className='updates'>
                <div className='update'>
                    <div className='views'>
                        <label>324 Views, 21 Comments</label>
                    </div>
                    
                    <div className='app'>
                        <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='' />
                        <div className='word'>
                            <label>Instagram</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>

                <div className='update'>
                    <div className='views'>
                        <label>324 Views, 21 Comments</label>
                    </div>
                    
                    <div className='app'>
                        <img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png' alt='' />
                        <div className='word'>
                            <label>(X)Twitter</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>

                <div className='update'>
                    <div className='views'>
                        <label>324 Views, 21 Comments</label>
                    </div>
                    
                    <div className='app'>
                        <img src='https://cdn-icons-png.flaticon.com/128/3536/3536505.png' alt='' />
                        <div className='word'>
                            <label>LinkedIn</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>
            </div>

            <Link className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>
    )
}

export default ApsContainer