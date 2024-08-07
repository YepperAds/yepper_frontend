import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Content.css';

const Content = () => {
  return (
    <div className="body-content">
      <div className='webs-container'>
        <div className='card-container'>
          <Link className='data-card' to='/app-details'>
            <div className='app'>
              <img src='data:image/jpeg;base64,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' alt='' />
             <div className='details'>
                <div className='word'>
                  <label>Igihe</label>
                </div>
                <div className='views'>
                  <span>324 Click</span>
                  <span>21 Views</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Content;
