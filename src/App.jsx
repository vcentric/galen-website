import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Metrics from './components/Metrics';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Comparison from './components/Comparison';
import WhatsAppContact from './components/WhatsAppContact';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import BlogIndex from './pages/blog/BlogIndex';
import BlogPost from './pages/blog/BlogPost';
import BlogCategory from './pages/blog/BlogCategory';
import TeamPage from './pages/TeamPage';
import './App.css';

// Landing Page Component
const LandingPage = () => (
  <>
    <Hero />
    <TrustedBy />
    <Metrics />
    <Features />
    <Testimonials />
    <Comparison />
    <WhatsAppContact />
    <FAQ />
    <FinalCTA />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/category/:category" element={<BlogCategory />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
