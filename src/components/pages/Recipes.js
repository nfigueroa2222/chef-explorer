import React from 'react';
import Header from '../scripts/Header';
import RecipeList from '../scripts/RecipeList';
import Footer from '../scripts/Footer';

const Recipes = () => {
    return (
      <div>
        <Header />
        <RecipeList />
        <Footer />
      </div>
    );
  };
  
  export default Recipes;