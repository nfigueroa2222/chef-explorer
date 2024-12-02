import React from 'react';
import PropTypes from 'prop-types';
import '../css/InventoryItem.css';

// A reusable component to display a single inventory item
const InventoryItem = ({ SKU, name, qty, price }) => {
    return (
        <li className="inventory-item">
            <div className="item-header">
                <h3 className="item-name">{name}</h3>
                <p className="item-sku"><strong>SKU:</strong> {SKU}</p>
            </div>
            <p className="item-price">${price}</p> 
            <p className="item-qty"><strong>Quantity:</strong> {qty}</p>
        </li>
    );
};

// Use PropTypes for type-checking
InventoryItem.propTypes = {
    SKU: PropTypes.oneOfType([
        PropTypes.string,  // SKU can be a string or alpha-numeric
        PropTypes.number,  // SKU can be a number
    ]).isRequired,
    name: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
};

export default InventoryItem;
