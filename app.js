const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI =
  'mongodb+srv://chmura303:Rafal12345@apps.frimhgi.mongodb.net/todoDB?retryWrites=true&w=majority';
mongoose
  .connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  res.redirect('/todos');
});

// blog routes
app.use('/todos', todoRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 404 });
});
