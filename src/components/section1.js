import React from 'react'
import './styles/section1.css'
import Logo from './logo'

function Section1() {
  return (
    <div className='section1-container'>
        <section>
            <div className='head'>
                <Logo />
            </div>
            <div className='sub1'>
                <div className='left'>
                    <img src='https://img.freepik.com/free-psd/food-social-media-post-template-restaurant-fastfood-burger_202595-315.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
                    <img src='https://img.freepik.com/free-psd/fashion-catalogue-facebook-template_23-2151035343.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
                </div>
                <div className='middle'>
                    <h3>Make your brand more attractive</h3>
                    <p>These categories can overlap, and 
                        businesses often fit into multiple 
                        categories depending on their
                        structure, industry, 
                        and market focus.
                    </p>
                </div>
                <div className='right'>
                    <img src='https://img.freepik.com/free-photo/zebra-wild_23-2151690195.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' />
                </div>
            </div>

            <div className='sub2'>
                <div className='container'>
                    <img src='https://img.freepik.com/premium-photo/word-brand-written-sticky-colored-paper_21336-1098.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
                    <h3>Statement about branding</h3>
                    <p>Businesses can be categorized 
                        in various ways based on industry, size, ownership, and more. Here are some common 
                        categories Businesses can be categorized 
                        in various ways based on industry, size, ownership, and more. Here are some common 
                        categories
                    </p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Section1