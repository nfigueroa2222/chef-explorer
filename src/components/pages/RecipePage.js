import React from 'react';
import PropTypes from 'prop-types';
import '../css/RecipePage.css';
import Header from '../scripts/Header';
import Footer from '../scripts/Footer';

const RecipePage = ({ name, date, servings, directions, ingredients, image }) => {
    return (
        <main className="recipe-page">
            <Header />
            <div className='recipe-container'>
                <div className="recipe-details">
                    <section className="recipe-header">
                        <h1 className="recipe-title">{name}</h1>
                        <p className="recipe-date">Date Added: {date}</p>
                    </section>
                    <section className="recipe-info">
                        <h1 className='section-header'>Recipe Details</h1>
                        <p><strong>Servings:</strong>{servings}</p>
                        <p><strong>Ingredients:</strong></p>
                        <ul className="ingredients-list">
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p><strong>Directions:</strong></p>
                        <p className="directions-text">{directions}</p>
                    </section>
                </div>
                <div className="recipe-image">
                    <img src={image} alt={`Image of ${name}`} />
                </div>
            </div>
            <Footer />
        </main>
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
