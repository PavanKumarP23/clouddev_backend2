const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection config for Azure MySQL Flexible Server
const db = mysql.createConnection({
  host: 'studentdb-dem.mysql.database.azure.com',
  user: 'mysqlpavan@studentdb-dem', // ✅ Correct format
  password: 'Pavandb2025',
  database: 'studentdb',
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
});

// ✅ Graceful connection handling
db.connect(err => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// ✅ Main route to get all students
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('❌ Error fetching students:', err.message);
      return res.status(500).send('Database query error');
    }
    res.json(results);
  });
});

// ✅ Use Azure-assigned port or fallback to 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
