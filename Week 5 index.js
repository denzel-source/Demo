// Step 1: Initialize Node.js project
npm init -y

// Step 2: Install required dependencies
npm install express mysql body-parser bcryptjs

// Step 3: Create server.js file and configure MySQL connection
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'expense_management'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

// Step 4: Create Users table
const createUsersTable = `CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
)`;

db.query(createUsersTable, (err) => {
  if (err) {
    throw err;
  }
  console.log('Users table created');
});

// Step 5: Create Expenses table
const createExpensesTable = `CREATE TABLE Expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  amount DECIMAL(10, 2),
  date DATE,
  category VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(id)
)`;

db.query(createExpensesTable, (err) => {
  if (err) {
    throw err;
  }
  console.log('Expenses table created');
});

// Step 6: Implement user authentication
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, 'your_secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

app.use(authenticateToken); // Apply this middleware to routes that need authentication

// User registration and login functionalities

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password123, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.status(201).send('User registered');
    });
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = results[0];

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
           }
      const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, 'your_secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

app.use(authenticateToken); // Apply this middleware to routes that need authentication


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
           
// Step 7: Securely store passwords using hashing techniques
