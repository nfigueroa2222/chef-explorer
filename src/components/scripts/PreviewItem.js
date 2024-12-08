import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/PreviewItem.css';

const PreviewItem = ({ id, image, name, servings }) => {
    const route = `/recipes/${name}-${id}`; // Dynamic route format name-id

    return (
        <div className="preview-item">
            <Link to={route}>
                <div className="recipe-image">
                    <img src={image} alt={name}  />
                </div>
                <h3 className="recipe-name">{name}</h3>
                <p className="recipe-servings">Servings: {servings}</p>
            </Link>
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
