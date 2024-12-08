import React, { useState } from 'react';

const AccountSetup = () => {

    // Set the state of the incoming form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    // Set the state of the responseMessage
    const [responseMessage, setResponseMessage] = useState('');
    // Set the state of the user in the browser cache, finally got to use my discussion post topic 
    const user = localStorage.getItem('user');

    // Very important, otherwise react will re render and changes will be lost. So store them in a state
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Use spreader to get all previous characters in previous state and apply it to the current state of the corresponding attribute(name)
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // This handles the registering of the account process
    const handleRegister = async () => {
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
                setResponseMessage(`Registration Successful: ${data.message}`);
            } else {
                const errorData = await response.json();
                setResponseMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    // Handles the login if the account exists
    const handleLogin = async () => {
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
                setResponseMessage(`Login Successful: Welcome ${data.first_name}`);
            } else {
                const errorData = await response.json();
                setResponseMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    // Handles the logout if the account is logged in already, logic is handled with HTML 
    const handleLogout = () => {
        localStorage.removeItem('user');
        setResponseMessage('You have logged out successfully.');
    };

    return (
        <div>
            <h1>Account Setup</h1>
            <form>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
                {!user ? (
                    <button onClick={handleLogin}>Login</button>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </form>
            <p>{responseMessage}</p>
        </div>
    );
};

export default AccountSetup;
