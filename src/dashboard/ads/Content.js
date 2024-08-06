import React from 'react';
import './styles/Content.css';
import AddButton from '../components/addButton';

const Content = () => {
  return (
    <body className="body-content">
      <div className='ads-container'>
        <AddButton/>
        <div className='card-container'>
          <div className="data-card">Shisha mugabo</div>
          <div className="data-card">Shisha mugabo</div>
          <div className="data-card">Shisha mugabo</div>
          <div className="data-card">Shisha mugabo</div>
          <div className="data-card">Shisha mugabo</div>
          <div className="data-card">Shisha mugabo</div>
        </div>
      </div>
    </body>
  );
};

export default Content;
