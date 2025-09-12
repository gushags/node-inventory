// app.js
const express = require('express');
const path = require('node:path');
const app = express();

// Allow data to be read from req.body
app.use(express.urlencoded({ extended: true }));

// Get application ready to use ejs templates
// from 'views' folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Get app ready to serve static files from public
// like css and images
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

const indexRouter = require('./routes/indexRouter');

// Routers
app.use('/', indexRouter);

// Errorhandling router
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Node-Inventory app - listening on port ${PORT}!`);
});
