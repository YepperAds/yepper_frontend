import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Content.css';
import AddButton from '../components/addButton';

const Content = () => {
  return (
    <div className="body-content">
      <div className='apps-container'>
        <AddButton />
        <div className='card-container'>
          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='Instagram' />
              <div className='word'>
                <label>Instagram</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='Instagram' />
              <div className='word'>
                <label>Instagram</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='Instagram' />
              <div className='word'>
                <label>Instagram</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='Instagram' />
              <div className='word'>
                <label>Instagram</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='Instagram' />
              <div className='word'>
                <label>Instagram</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='Instagram' />
              <div className='word'>
                <label>Instagram</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='Instagram' />
              <div className='word'>
                <label>Instagram</label>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Content;
