import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Recipes from './components/pages/Recipes';

const App = () => {
  return (
    <div className='app-container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </div>
  );
};

export default App;
