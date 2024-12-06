import React, { useRef } from "react";
import PreviewItem from "./PreviewItem";
import recipes from "../../models/recipes.json";
import '../css/RecipeGallery.css';

const RecipeGallery = () => {
    const carouselRef = useRef(null); /* Creates a reference to the carousel element to manipulate it aka scroll */

    const scrollLeft = () => {
      carouselRef.current.scrollBy({
        left: -300, // Adjust based on the card width
        behavior: "smooth",
      });
    };
  
    const scrollRight = () => {
      carouselRef.current.scrollBy({
        left: 300, // Adjust based on the card width
        behavior: "smooth",
      });
    };

  return (
    <div className="recipe-gallery">
      <button className="carousel-button left" onClick={scrollLeft}>
        ❮
      </button>
      <div className="carousel" ref={carouselRef}>
        {recipes.map((recipe, index) => (
          <PreviewItem key={index} recipe={recipe} />
        ))}
      </div>
      <button className="carousel-button right" onClick={scrollRight}>
        ❯
      </button>
    </div>
  );
};

export default RecipeGallery;
