import React from 'react';
import './styles/section2.css';

function Section2() {
  return (
    <div className='section2-container'>
      <div className='title-container'>
        <div className='title'>
          <h1>Ads Categories</h1>
        </div>
        <div className='btn'>
          <button>Register</button>
        </div>
      </div>

      <div className='categories'>
        {[
          {
            title: 'Manufacture',
            image: 'https://img.freepik.com/free-photo/female-factory-worker-mask-holding-tablet_74855-16326.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid',
            posts: [
              { label: 'Food processing', count: 0 },
              { label: 'Textile production', count: 12 },
              { label: 'Electronic manufacturing', count: 10 },
              { label: 'Automotive manufacturing', count: 32 }
            ]
          },
          {
            title: 'Agriculture',
            image: 'https://img.freepik.com/premium-photo/photography-professional-farmer-with-vegetable_1128603-41363.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid',
            posts: [
              { label: 'Farming', count: 0 },
              { label: 'Dairy', count: 12 },
              { label: 'Poultry', count: 10 },
              { label: 'Horticulture', count: 32 }
            ]
          },
          {
            title: 'Retail',
            image: 'https://img.freepik.com/free-photo/clothing-store-assistant-helping-customer-choosing-shirt-shopping-mall-apparel-department-fashion-boutique-african-american-woman-showing-trendy-garment-man-client_482257-61597.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid',
            posts: [
              { label: 'Online retail', count: 0 },
              { label: 'Grocery stores', count: 12 },
              { label: 'Clothing stores', count: 10 },
              { label: 'Specialty stores', count: 32 }
            ]
          },
          {
            title: 'Services',
            image: 'https://img.freepik.com/free-photo/woman-records-conversation-audience_482257-91524.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid',
            posts: [
              { label: 'Healthcare services', count: 0 },
              { label: 'Educational services', count: 12 },
              { label: 'Financial services', count: 10 },
              { label: 'Consulting services', count: 32 }
            ]
          },
          {
            title: 'Technology',
            image: 'https://img.freepik.com/free-photo/group-afro-americans-working-together_1303-8979.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid',
            posts: [
              { label: 'Software development', count: 0 },
              { label: 'IT services', count: 12 },
              { label: 'E-commerce', count: 10 },
              { label: 'Cyber security', count: 32 }
            ]
          },
          {
            title: 'Hospitality',
            image: 'https://img.freepik.com/premium-photo/woman-hotel-guest-talking-with-waiter_482257-78813.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid',
            posts: [
              { label: 'Hotels', count: 0 },
              { label: 'Restaurants', count: 12 },
              { label: 'Travel agencies', count: 10 },
              { label: 'Event planning', count: 32 }
            ]
          },
          {
            title: 'Transportation & Logistics',
            image: 'https://img.freepik.com/premium-photo/global-logistics-transportation-network_53876-273245.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid',
            posts: [
              { label: 'Courier services', count: 0 },
              { label: 'Freight forwarding', count: 12 },
              { label: 'Public transportation', count: 10 },
              { label: 'Taxi services', count: 32 }
            ]
          },
          {
            title: 'Real Estate',
            image: 'https://img.freepik.com/free-photo/house-with-red-car-front-it_1340-32084.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid',
            posts: [
              { label: 'Property development', count: 0 },
              { label: 'Real Estate agencies', count: 12 },
              { label: 'Property management', count: 10 },
              { label: 'Real Estate investment', count: 32 }
            ]
          }
        ].map((category, index) => (
          <div className='category-card fade-in' key={index}>
            <div className='image-container'>
              <img src={category.image} alt={category.title} />
            </div>
            <h2>{category.title}</h2>
            <div className='post-status'>
              {category.posts.map((post, idx) => (
                <div className='status' key={idx}>
                  <p>{post.label}</p>
                  <p>{post.count} posts</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section2;
