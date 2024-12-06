// PreviewItem.js
import React from "react";
import '../css/PreviewItem.css';

const PreviewItem = ({ recipe }) => {
  const { image, name, servings } = recipe;

  return (
    <div className="preview-item">
      <img src={image} alt={name} className="recipe-image" />
      <h3 className="recipe-name">{name}</h3>
      <p className="recipe-servings">Servings: {servings}</p>
    </div>
  );
};

export default PreviewItem;
