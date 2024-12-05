import React from 'react';
import Header from '../scripts/Header';
import InventoryList from '../scripts/InventoryList';
import Footer from '../scripts/Footer';

const Home = () => {
  return (
    <div className="app-container">
      <Header />
      <InventoryList />
      <Footer />
    </div>
  );
};

export default Home;
