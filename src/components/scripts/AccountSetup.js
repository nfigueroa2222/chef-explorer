import React, { useState } from 'react';
import '../css/AccountSetup.css';

const AccountSetup = () => {

    /**
     * Checks to see if the testString has at least 2 alphabetical characters
     * and only has alphabetical characters regardless of case
     * @param {String} testString The string to be tested
     * @returns Whether the testString matches the regex
     */
    const isAlphabetical = (testString) => {
        return /^[A-Za-z]{2,}$/.test(testString);
    };

    /**
     * Checks to see if the email address entered is valid using an email validation regex
     * @param {String} email 
     * @returns Whether the email entered is in a correct format
     */
    const isEmailValid = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };

    // Validates the form fields and sets the error state
    const validateForm = () => {
        let formIsValid = true;
        let formErrors = { ...errors };


        if (!formData.email) {
            formIsValid = false;
            formErrors.email = 'Email is required';
        } else if (!isEmailValid(formData.email)) {
            formIsValid = false;
            formErrors.email = 'Please enter a valid email address';
        }
        // Password validation
        if (!formData.password) {
            formIsValid = false;
            formErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            formIsValid = false;
            formErrors.password = 'Password must be at least 6 characters';
        }

        // Name validation (ensure it's not empty) and alphabetical with 2 characters
        if (!formData.firstName) {
            formIsValid = false;
            formErrors.firstName = 'First Name is required';
        } else if (!isAlphabetical(formData.firstName)) {
            formIsValid = false;
            formErrors.firstName = "Must have only alphabetical characters and be at least 2 characters in length";
        }

        // Name validation (ensure it's not empty) and alphabetical with 2 characters
        if (!formData.lastName) {
            formIsValid = false;
            formErrors.lastName = 'Last Name is required';
        } else if (!isAlphabetical(formData.lastName)) {
            formIsValid = false;
            formErrors.lastName = "Must have only alphabetical characters and be at least 2 characters in length";
        }
        setErrors(formErrors);
        return formIsValid;
    };

    // Display the popup with a message
    const showPopup = (message) => {
        setPopupMessage(message);
        setPopupVisible(true);
    };

    // Hide the popup
    const closePopup = () => {
        //Refresh the page on successful login and logout to re render the header, this needs to be changed for performance in the future
        if (popupMessage.includes("Successful")) { // Check if the message is a success message
            window.location.reload(); // Trigger a page reload
        }
        setPopupMessage('');
        setPopupVisible(false);
    };

    // Set the state of the incoming form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    // Set state for errors
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    // Set the state of the user in the browser cache, finally got to use my discussion post topic 
    const user = localStorage.getItem('user');
    // State for popup visibility and message
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);

    // Very important, otherwise react will re render and changes will be lost. So store them in a state
    const handleChange = (e) => {
        const { name, value } = e.target; // Get specific values from the target
        // Use spreader to get all previous characters in previous state and apply it to the current state of the corresponding attribute(name)
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear errors as the user types
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    // This handles the registering of the account process
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission to handle validation

        // Validate the form before submitting
        if (!validateForm()) {
            return;
        }

        try {
            // Make a POST call to the backend server register route
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST', // States this is a post request
                headers: {
                    'Content-Type': 'application/json', // Tells the backend server to expect JSON data
                },
                body: JSON.stringify(formData), // This is the actual JSON data being sent to the backend server
            });

            if (response.ok) {
                const data = await response.json();
                showPopup(`${data.message}`);
                // Clear form fields after successful registration
                setFormData({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                });
                // Clear any errors after successful registration
                setErrors({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                });
            } else {
                const errorData = await response.json();
                showPopup(`${errorData.message}`);
            }
        } catch (error) {
            showPopup(`Error: ${error.message}`);
        }
    };

    // Handles the login if the account exists
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission to handle validation

        // Validate the form before submitting
        if (!validateForm()) {
            return;
        }

        try {
            //Make a POST call to the backend server login route
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST', // States this is a post request
                headers: {
                    'Content-Type': 'application/json', // Tells the backend server to expect JSON data
                },
                body: JSON.stringify({ // This is the actual JSON data being sent to the backend server
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data)); // Set the localStorage browser cache with the user data
                showPopup(`Login Successful: Welcome ${data.first_name}`);
            } else {
                const errorData = await response.json();
                showPopup(`${errorData.message}`);
            }
        } catch (error) {
            showPopup(`Error: ${error.message}`);
        }
    };

    // Handles the logout if the account is logged in already, logic is handled with HTML 
    const handleLogout = () => {
        localStorage.removeItem('user');
        showPopup('Logout Successful!');
    };

    return (
        <section className='account-setup'>
            <h1>Account Setup</h1>
            <form>
                <section>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </section>
                <section>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span>{errors.password}</span>}
                </section>
                <section>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <span>{errors.firstName}</span>}
                </section>
                <section>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <span>{errors.lastName}</span>}
                </section>
                <div className="button-container">
                    <button type="button" onClick={handleRegister}>
                        Register
                    </button>
                    {!user ? (
                        <button onClick={handleLogin}>Login</button>
                    ) : (
                        <button onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </form>
            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <p>{popupMessage}</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AccountSetup;
