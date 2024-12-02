import './App.css';
import React from 'react';
import Header from './components/scripts/Header';
import InventoryList from './components/scripts/InventoryList';
import Footer from './components/scripts/Footer';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <InventoryList />
      <Footer />
    </div>
  );
};

export default App;
