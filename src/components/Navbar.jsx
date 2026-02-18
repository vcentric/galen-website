import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import galenaiLogo from '../assets/galenai-logo.png';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="navbar-brand">
            <img src={galenaiLogo} alt="GalenAI" className="navbar-logo" />
          </a>
        </div>

        <div className="navbar-center">
          <ul className="navbar-links">
            <li><a href="#features">Features</a></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><a href="#login">Login</a></li>
          </ul>
        </div>

        <div className="navbar-right">
          <a href="#ask" className="navbar-cta">Ask GalenAI</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
