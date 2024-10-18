import React from 'react'
import { Link } from "react-router-dom";
import './styles/session2.css'

function EmailsContainer() {
    return (
        <div className='object gmails'>
            <div className='title'>
                <h4>12</h4>
                <h3>Emails</h3>
            </div>

            <div className='updates'>
                <div className='update'>
                    <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='' />
                    <div className='word'>
                        <label>Mugabo</label>
                    </div>
                    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968534.png' alt=''/>
                </div>

                <div className='update'>
                    <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='' />
                    <div className='word'>
                        <label>Mugabo</label>
                    </div>
                    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968534.png' alt=''/>
                </div>

                <div className='update'>
                    <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='' />
                    <div className='word'>
                        <label>Mugabo</label>
                    </div>
                    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968534.png' alt=''/>
                </div>
            </div>

            <Link className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>
    )
}

export default EmailsContainer