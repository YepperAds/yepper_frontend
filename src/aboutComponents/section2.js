import React from 'react';
import './styles/section2.css';

function Section2() {
    return (
        <div className='slide2'>
            <div className='left'>
                <h1>Let’s do it!</h1>
                <p>
                    Yes! Ol Express will not use its own vehicles to deliver packages. Instead, people who have trucks, vehicles (cars, mini-buses), bikes (normal bicycles, those bikes which are already made to deliver packages) will work with us. We will have these vehicles for a contracted period, and we will compensate the owners based on the number of packages delivered, similar to a carpooling system. During the contracted period, the vehicles will be branded as ours.
                </p>
            </div>
            <div className='right'>
                <img src='https://img.freepik.com/free-photo/united-business-team-celebrating-success_1262-21090.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=sph' alt='Team Celebrating Success'/>
            </div>
        </div>
    );
}

export default Section2;
