import React from "react";
import PropTypes from 'prop-types';
import '../css/PreviewItem.css';

const PreviewItem = ({ id, image, name, servings }) => {

    return (
        <div className="preview-item">
            <div className="recipe-image">
                <img src={image} alt={name}  />
            </div>
            <h3 className="recipe-name">{name}</h3>
            <p className="recipe-servings">Servings: {servings}</p>
        </div>
    );
};

// Use PropTypes for type-checking
PreviewItem.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired
};

export default PreviewItem;
