import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Recipes from './components/pages/Recipes';
import RecipePage from './components/pages/RecipePage';
import recipeData from './models/recipes.json';
import AccountPage from './components/pages/AccountPage';

const App = () => {
  
  return (
    <div className='app-container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        {recipeData.map((recipe) => (
          <Route key={recipe.id} path={`/recipes/${recipe.name}-${recipe.id}`} element={<RecipePage {...recipe} />}  // Passing all props of recipe with spread
          />
        ))}
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </div>
  );
};

export default App;
