import React, { useRef } from "react";
import PreviewItem from "./PreviewItem";
import recipes from "../../models/recipes.json";
import '../css/RecipeGallery.css';

const RecipeGallery = () => {
    const carouselRef = useRef(null); /* Creates a reference to the carousel element to manipulate it aka scroll */

    // Sort the recipes by date (most recent first) and take the 8 most recent
    const sortedRecipes = [...recipes] // Shallow copy using spread, so object references will remain the same but new array
        .sort((a, b) => new Date(b.date) - new Date(a.date))  // Sort by date in descending order
        .slice(0, 8); // Take the 8 most recent recipes

    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            left: -260, // Adjust based on the card width and padding
        });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            left: 260, // Adjust based on the card width and padding
        });
    };

    return (
        <main>
            <section className="recipe-gallery">
                <h2 className="new-recipe-header">Most Recent Recipes</h2>
                <button className="carousel-button left" onClick={scrollLeft}>
                    &#9668; { /* unicode for left arrow */ }
                </button>
                <div className="carousel" ref={carouselRef}>
                    { /* use the recipes.json file to populate */ }
                    {sortedRecipes.map((previewItem) => (
                        <PreviewItem
                            key={previewItem.id}
                            id={previewItem.id}
                            image={previewItem.image}
                            name={previewItem.name}
                            servings={previewItem.servings}
                        />
                    ))}
                </div>
                <button className="carousel-button right" onClick={scrollRight}>
                    &#9658; { /* unicode for right arrow */ }
                </button>
            </section>
        </main>
    );
};

export default RecipeGallery;
