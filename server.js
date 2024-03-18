const express = require('express');
const port = 5000;

const app = express();

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ content: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the random ideas API' });
});

const ideaRouter = require('./routes/ideas');
app.use('/api/ideas', ideaRouter);


app.listen(port, () => console.log(`Server is listening on port${port}`));