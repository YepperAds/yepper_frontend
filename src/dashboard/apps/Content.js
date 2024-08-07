import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Content.css';

const Content = () => {
  return (
    <div className="body-content">
      <div className='apps-container'>
        <div className='card-container'>
          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/174/174848.png' alt='' />
              <div className='word'>
                <label>Facebook</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png' alt='' />
              <div className='word'>
                <label>X</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/3536/3536505.png' alt='' />
              <div className='word'>
                <label>LinkedIn</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/1384/1384060.png' alt='' />
              <div className='word'>
                <label>Youtube</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/4782/4782345.png' alt='' />
              <div className='word'>
                <label>Tiktok</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/1384/1384066.png' alt='' />
              <div className='word'>
                <label>Snapchat</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/3536/3536445.png' alt='' />
              <div className='word'>
                <label>Whatsapp</label>
              </div>
            </div>
          </Link>

          <Link className='data-card' to='/app-details'>
            <div className='views'>
              <span>324 Views</span>
              <span>21 Comments</span>
            </div>
            
            <div className='app'>
              <img src='https://cdn-icons-png.flaticon.com/128/145/145808.png' alt='' />
              <div className='word'>
                <label>Pinterest</label>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Content;
