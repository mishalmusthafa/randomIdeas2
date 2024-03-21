require('dotenv').config();
const cors = require('cors');

const express = require('express');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

const path = require('path');
//static folder
app.use(express.static(path.join(__dirname, 'public')));

// Cors middleware
app.use(cors({
  orgin: ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}));

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ content: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the random ideas API' });
});

const ideaRouter = require('./routes/ideas');
app.use('/api/ideas', ideaRouter);


app.listen(port, () => console.log(`Server is listening on port ${port}`));