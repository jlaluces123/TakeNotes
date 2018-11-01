import React from 'react';
import './HomeView.css';
import { Link } from 'react-router-dom';

export const HomeView = () => {
  return (
    <div className='hero-jpg'>
      <h2>TakeNotes</h2>
      <div className='hero-message'>
        <p>Note taking made simple.</p>        
        <p>Note taking made smarter.</p>        
      </div>
      <Link to='/notes' className='hero-button'>Unlock your knowledge ></Link>
    </div>
  )
}