require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const connectToMongoDB = require('./src/services/connectToMongoDB');

const { PORT } = process.env;
const app = express();

connectToMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/api', require('./src/routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
