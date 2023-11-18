const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chatbot_coe',
});

app.post('/login', (req, res) => {
    
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM login WHERE email = ? AND password = ?',
    [email, password],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database error' });
      } else {
        if (results.length > 0) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    }
  );
});
app.post('/register', (req, res) => {
  console.log("hi")
    const { email, password } = req.body;
    console.log(email);
    connection.query(
      'INSERT INTO login (email, password) VALUES (?, ?)',
      [email,password],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Database error' });
        } else {
          res.status(201).json({ message: 'Registration successful' });
        }
      }
    );
  });
  

app.listen(3002, () => {
  console.log('Server running on port 3002');
});
