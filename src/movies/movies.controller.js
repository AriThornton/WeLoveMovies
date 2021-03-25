const service = require('./movies.service');

const list = async (req, res, next) => {
  const knex = req.app.get('db');
  const isShowing = req.query.is_showing;

  const movies = !isShowing ? await service.list(knex) : await service.list(knex, isShowing);
  for(const movie of movies) {
    movie.reviews = await service.listReviewsByMovie(knex, movie.movie_id);
  }
  res.json({ data: movies });
}

const read = async (req, res, next) => {
  res.json({ data: res.locals.movie });
}

const findTheaters = async (req, res, next) => {
  const knex = req.app.get('db');
  const movieId = req.params.movieId;
  res.json({ data: await service.findTheater(knex, movieId) });
}

const listReviews = async (req, res, next) => {
  const knex = req.app.get('db');
  const movieId = req.params.movieId;
  const reviews = await service.listReviewsByMovie(knex, movieId);
  for(const review of reviews) {
    review.critic = await service.listCritics(knex, review.critic_id);
  }
  res.json({ data: reviews });
}

const validateMovie = async (req, res, next) => {
  const knex = req.app.get('db');
  const movieId = req.params.movieId;
  const foundMovie = await service.read(knex, movieId);

  if(!foundMovie) {
    next({ status: 404, message: `${movieId} not found` });
    return;
  }

  res.locals.movie = foundMovie;
  next();
}

module.exports = {
  list,
  read: [validateMovie, read],
  findTheater: [validateMovie, findTheaters],
  listReviews: [validateMovie, listReviews]
};