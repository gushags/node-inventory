// app.js
const express = require('express');
const path = require('node:path');
const app = express();
const methodOverride = require('method-override');

// Allow data to be read from req.body
app.use(express.urlencoded({ extended: true }));

// Middleware to allow RESTful delete
app.use(methodOverride('_method'));

// Get application ready to use ejs templates
// from 'views' folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Get app ready to serve static files from public
// like css and images
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

const indexRouter = require('./routes/indexRouter');
const newRouter = require('./routes/newRouter');

// Routers
app.use('/new', newRouter);
app.use('/', indexRouter);

// Errorhandling router
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
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
