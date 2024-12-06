import React, { useRef } from "react";
import PreviewItem from "./PreviewItem";
import recipes from "../../models/recipes.json";
import '../css/RecipeGallery.css';

const RecipeGallery = () => {
    const carouselRef = useRef(null); /* Creates a reference to the carousel element to manipulate it aka scroll */

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
        <div className="recipe-gallery">
            <button className="carousel-button left" onClick={scrollLeft}>
                &#9668; { /* unicode for left arrow */ }
            </button>
            <div className="carousel" ref={carouselRef}>
                { /* use the recipes.json file to populate */ }
                {recipes.map((previewItem) => (
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
        </div>
    );
};

export default RecipeGallery;
