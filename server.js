require('dotenv').config();

const express = require('express');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ content: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the random ideas API' });
});

const ideaRouter = require('./routes/ideas');
app.use('/api/ideas', ideaRouter);


app.listen(port, () => console.log(`Server is listening on port ${port}`));