const service = require('./theaters.service');

const list = async (req, res, next) => {
  const knex = req.app.get('db');
  const theaters = await service.list(knex);
  for(const theater of theaters) {
    theater.movies = await service.listMoviesByTheater(knex, theater.theater_id);
  }
  res.json({ data: theaters });
};

module.exports = {
  list,
};