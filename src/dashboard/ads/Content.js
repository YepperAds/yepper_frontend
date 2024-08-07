import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Content.css';
import AddButton from '../components/addButton';

const Content = () => {
  return (
    <div className="body-content">
      <div className='ads-container'>
        <AddButton/>
        <div className='card-container'>
          <Link to='#' className="data-card">
            <img src='https://img.freepik.com/free-vector/matcha-green-tea-powder-vector-realistic-product-placement-mock-up-healthy-drink-label-designs_1268-18117.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt=''/>
            <div className='word'>
              <label>Amata meza</label>
            </div>
          </Link>

          <Link to='#' className="data-card">
            <img src='https://img.freepik.com/free-psd/food-allergens-icon-illustration_23-2150124400.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
            <div className='word'>
              <label>Amata abyibushya</label>
            </div>
          </Link>

          <Link to='#' className="data-card">
            <img src='https://img.freepik.com/premium-psd/milk-packet-mockup_493604-1227.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
            <div className='word'>
              <label>Amata ananura</label>
            </div>
          </Link>

          <Link to='#' className="data-card">
            <img src='https://img.freepik.com/free-vector/milk-with-natural-milk-label_1308-90801.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
            <div className='word'>
              <label>Amata yibigori</label>
            </div>
          </Link>

          <Link to='#' className="data-card">
            <img src='https://img.freepik.com/premium-photo/fresh-bottles-milk-paper-bag_1234738-360787.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
            <div className='word'>
              <label>Amata arimo indimu</label>
            </div>
          </Link>

          <Link to='#' className="data-card">
            <img src='https://img.freepik.com/premium-photo/items-regularly-used-home-transparent-background_659722-20107.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
            <div className='word'>
              <label>Umuhondo</label>
            </div>
          </Link>

          <Link to='#' className="data-card">
            <img src='https://img.freepik.com/premium-photo/blue-white-milk-carton-with-milk-it_1266045-1656.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
            <div className='word'>
              <label>Amata y'abashumba</label>
            </div>
          </Link>

          <Link to='#' className="data-card">
            <img src='https://img.freepik.com/free-vector/dairy-packaging-realistic-composition_1284-25937.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
            <div className='word'>
              <label>Amata yakimeza</label>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Content;
