import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    return (
        <header>
            <div className="header-container">
                <div className="header-content">
                    <div className='logo'> 
                        <img src="/chef-logo.png" alt="Chef Explorer Logo"/>
                    </div>
                    <h1 className="site-name">Chef Explorer</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/recipes">All Recipes</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;