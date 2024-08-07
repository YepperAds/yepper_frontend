import React, { useEffect } from 'react';
import './styles/section1.css';
import Logo from './logo';
import { Link } from 'react-router-dom';

function Section1() {
  useEffect(() => {
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger the animation on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='section1-container'>
        <section>
            <div className='head'>
                <Logo />
            </div>
            <div className='sub1'>
                <div className='left'>
                    <img src='https://img.freepik.com/free-psd/food-social-media-post-template-restaurant-fastfood-burger_202595-315.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' className='fade-in'/>
                    <img src='https://img.freepik.com/free-psd/fashion-catalogue-facebook-template_23-2151035343.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' className='fade-in'/>
                </div>
                <div className='middle fade-in'>
                    <h3>Make your brand more attractive</h3>
                    <p>These categories can overlap, and 
                        businesses often fit into multiple
                        categories depending on their
                        structure, industry, 
                        and market focus.
                    </p>
                </div>
                <div className='right'>
                    <img src='https://img.freepik.com/free-photo/zebra-wild_23-2151690195.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' className='fade-in'/>
                </div>
            </div>

            <div className='sub2'>
                <div className='container fade-in'>
                    <img src='https://img.freepik.com/premium-photo/word-brand-written-sticky-colored-paper_21336-1098.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt=''/>
                    <div>
                        <h3>Statement about branding</h3>
                        <p>Businesses can be categorized 
                            in various ways based on industry, size, ownership, and more. Here are some common 
                            categories Businesses can be categorized 
                            in various ways based on industry, size, ownership, and more. Here are some common 
                            categories
                        </p>
                    </div>
                </div>
            </div>

            <div className='sub3'>
                <div className='container fade-in'>
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/2p9Qt60W91Q" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className='sub4'>
                <div className='head'>
                    <h1>Loyalty</h1>
                </div>
                <div className='object'>
                    <img src='https://img.freepik.com/free-photo/afro-american-builders-wearing-helmets-face-masks-while-measuring-wall_181624-58281.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' className='fade-in'/>
                    <p>i'll replace these sentence the
                        description about our loyalty and 
                        pictures of some powerful companies i'll work with
                    </p>
                    <img src='https://img.freepik.com/free-photo/top-view-paint-can_23-2149705344.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' className='fade-in'/>
                </div>

                <div className='object'>
                    <img src='https://img.freepik.com/free-photo/pouring-milk-inside-glass_23-2148211358.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' className='fade-in'/>
                    <div style={{
                        display: 'grid',
                        gap: '10px',
                    }}>
                        <p>i'll replace these sentence the
                            description about our loyalty and 
                            pictures of some powerful companies i'll work with
                        </p>
                        <div>
                            <Link to='#'>Learn more</Link>
                        </div>
                    </div>
                    <img src='https://img.freepik.com/premium-photo/cell-tower-that-transmits-signals-phones_683139-447.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' className='fade-in'/>
                </div>
            </div>

            <div className='sub5'>
                <div className='container fade-in'>
                    <iframe
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/2p9Qt60W91Q" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className='sub6'>
                <div className='container fade-in'>

                    <div style={{
                        display: 'grid',
                        gap: '1rem',
                        padding: '20px'
                    }}>
                        <h3>About us</h3>
                        <p>Businesses can be categorized 
                            in various ways based on industry, size, ownership, and more. Here are some common 
                            categories Businesses can be categorized 
                            in various ways based on industry, size, ownership, and more. Here are some common 
                            categories
                        </p>
                        <Link to='#'>Read more</Link>
                    </div>

                    <img src='https://img.freepik.com/premium-photo/beautiful-african-female-with-long-dark-hair-is-typing-messages-smartphone-while-sitting-beside-window-soft-light-young-business-woman-is-using-laptop-mobile-phone-work_255667-24640.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' alt='' className='fade-in'/>
                    
                </div>
            </div>
        </section>
    </div>
  )
}

export default Section1;
