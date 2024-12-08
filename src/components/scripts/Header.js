import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    // Create two states, one for the screen size and the other for the menu status
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // Create a state for the user name to show up in the header
    const [userHeader, setUser] = useState(null);

    // Updates the screen size state
    const checkScreenSize = () => {
        //Defines the screen size to change to hamburger symbol, this needs to match css @media
        setIsMobile(window.innerWidth <= 768);
    };

    // Update screen size state on component mount and window resize
    // Creates an event listener for checking the screen size
    useEffect(() => {
        checkScreenSize(); // Initial check
        window.addEventListener('resize', checkScreenSize); // Update on resize event
    }, []); //[] means no dependencies and only on initial render

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Set the user state from localStorage
        }
    }, []);

    // Toggle the mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <div className="header-container">
                <div className='logo'> 
                    <img src="chef-logo.png" alt="Chef Explorer Logo"/>
                </div>
                <div className="header-content">
                    <h1 className="site-name">Chef Explorer</h1>
                    <nav>
                        {/* Using isMobile state, check and determine whether to display hamburger menu or normal menu */ }
                        {isMobile ? (
                            <div>
                                <button 
                                    className="hamburger-menu" 
                                    onClick={toggleMenu} 
                                    aria-label="Toggle navigation menu"
                                >
                                    &#9776; {/* Represents the hamburger symbol with 3 lines */}
                                </button>
                                <ul className={`nav-links-small ${menuOpen ? 'active' : ''}`}> {/* Only apply active style if menu is open */}
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/recipes">All Recipes</Link></li>
                                    <li><Link to="/account">Account</Link></li>
                                </ul>
                            </div>
                         ) : (
                            <ul className={`nav-links-large ${menuOpen ? 'active' : ''}`}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/recipes">All Recipes</Link></li>
                            <li><Link to="/account">Account</Link></li>
                        </ul>
                        )}
                    </nav>
                    {userHeader ? (
                        <div className="user-info">
                            <p>Welcome, {userHeader.first_name}!</p>
                        </div>
                    ) : (
                        <div className="user-info">
                            <p>Please log in</p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;