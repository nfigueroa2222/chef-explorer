import React from 'react';
import PropTypes from 'prop-types';
import '../css/RecipePage.css';

const RecipePage = ({ name, date, servings, directions, ingredients, image }) => {
    return (
        <div className="recipe-page">
            <button className="back-button" onClick={() => window.history.back()}>Back to Recipes</button>
            <h1 className="recipe-title">{name}</h1>
            <p className="recipe-date"><strong>Date Added:</strong> {date}</p>
            <div className="recipe-details">
                <div className="recipe-image">
                    <img src={image} alt={name} />
                </div>
                <div className="recipe-info">
                    <p><strong>Servings:</strong> {servings}</p>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <p><strong>Directions:</strong></p>
                    <p>{directions}</p>
                </div>
            </div>
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
