import React from 'react';
import '../css/Header.css';

const Header = () => {
    return (
        <header>
            <div className="header-container">
                <div className="header-content">
                    <div className='logo'> 
                        <img src="/logo.png" alt="Store Logo"/>
                    </div>
                    <h1 className="store-name">Local Grocery Store</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;