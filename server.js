const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
app.use(bodyParser.json());  // To parse JSON request bodies
app.use(cors({ origin: 'http://localhost:3000' })); //Allow the frontend to use the backend routes

// MySQL Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'chefDB',
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Register user route
app.post('/register', async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  // Check to see if all parts are defined in the body
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // This data needs to be sanitized*********************SECURITY ISSUE
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  const insertUserQuery = `
    INSERT INTO users (email, first_name, last_name, password)
    VALUES (?, ?, ?, ?)`
    ;

  try {
    // Use the sql query and check to see if the email is present
    db.query(checkUserQuery, [email], (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ message: 'Error during email check' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      db.query(insertUserQuery, [email, firstName, lastName, password], (err) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ message: 'Error during registration' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
});

// login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // This data needs to be sanitized*********************SECURITY ISSUE
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const query = 'SELECT first_name, last_name, email FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Lougout route
app.post('/logout', (req, res) => {
  // Destroy the session memory
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Could not log out' });
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Save recipe endpoint 
app.post('/save-recipe', (req, res) => {
  const { userEmail, recipeName, ingredients, directions } = req.body;

  if (!userEmail || !recipeName || !ingredients || !directions) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Save the recipe in the recipes table
  const query = `
      INSERT INTO recipes (user_email, recipe_name, ingredients, directions)
      VALUES (?, ?, ?, ?)
  `;
  const values = [userEmail, recipeName, JSON.stringify(ingredients), directions];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving recipe:', err);
      return res.status(500).json({ error: 'Failed to save the recipe.' });
    }
    res.status(201).json({ message: 'Recipe saved successfully.', recipeId: result.insertId });
  });
});

// Start the Express server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
