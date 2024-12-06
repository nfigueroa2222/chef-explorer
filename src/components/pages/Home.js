import React from 'react';
import Header from '../scripts/Header';
import RecipeGallery from '../scripts/RecipeGallery';
import Footer from '../scripts/Footer';

const Home = () => {
  return (
    <div className="app-container">
      <Header />
      <RecipeGallery />
      <Footer />
    </div>
  );
};

export default Home;
