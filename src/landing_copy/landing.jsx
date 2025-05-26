import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Newsletter from './Newsletter';
import Footer from './Footer';

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />    
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Landing;