import React from 'react';
import './Home.css';
import bookpg from '../../assets/img/book.jpg';
import videoSource from '../../assets/books.mp4';
const Home = () => {
  return (
    <div className='Container'>
      <video autoPlay='autoplay' loop='loop' muted className='Video'>
        <source src={videoSource} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className='Content'>
        <div className='SubContent'>
          <h1>Book Catolog</h1>
          <p>Manage your Books with Ease</p>

          <img src={bookpg} alt='profile' />
        </div>
      </div>
    </div>
  );
};

export default Home;
