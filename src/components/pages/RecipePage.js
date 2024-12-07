import React from 'react';
import PropTypes from 'prop-types';
import '../css/RecipePage.css';
import Header from '../scripts/Header';
import Footer from '../scripts/Footer';

const RecipePage = ({ name, date, servings, directions, ingredients, image }) => {
    return (
        <div className="recipe-page">
            <Header />
            <div className='recipe-container'>
                <div className="recipe-details">
                    <div className="recipe-header">
                        <h1 className="recipe-title">{name}</h1>
                        <p className="recipe-date">
                            Date Added: {date}
                        </p>
                    </div>
                    <div className="recipe-info">
                        <p>
                            <strong>Servings:</strong> {servings}
                        </p>
                        <p>Ingredients:</p>
                        <ul className="ingredients-list">
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p>Directions:</p>
                        <p className="directions-text">{directions}</p>
                    </div>
                </div>
                <div className="recipe-image">
                    <img src={image} alt={`Image of ${name}`} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

// Define PropTypes to ensure proper data is passed
RecipePage.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    directions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired
};

export default RecipePage;
