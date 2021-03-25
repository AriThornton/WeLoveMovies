if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const knex = require('./db/connection');
const theatersRouter = require('./theaters/theaters.router');
const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');

app.use(express.json());
app.use(cors());
app.set('db', knex);
app.use('/theaters', theatersRouter);
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);


app.use((req, res, next) => {
  next({ status: 404, message: `Not Found: ${req.originalUrl}`});
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).json({ error: message });
});
module.exports = app;