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
// User registration and login functionalities

// Step 7: Securely store passwords using hashing techniques
