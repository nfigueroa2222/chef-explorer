import React, { Component } from 'react';
import '../css/InventoryList.css';
import InventoryItem from './InventoryItem';
import inventoryData from '../../models/inventory.json';

class InventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: inventoryData,
        };
    }

    render() {
        const { inventory } = this.state;
        // Map through the inventory array and render InventoryItem for each item
        return (
            <main>
                <section className="inventory">
                    <h2 className="inventory-heading">Current Inventory</h2>
                    <div className="inventory-grid">
                        {inventory.map((item) => (
                            <InventoryItem
                                key={item.SKU}
                                SKU={item.SKU}
                                name={item.name}
                                qty={item.qty}
                                price={item.price}
                            />
                        ))}
                    </div>
                </section>
            </main>
        );
    };
}

export default InventoryList;
