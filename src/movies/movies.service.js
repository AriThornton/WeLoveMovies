const list = (knex, isShowing) => 
    isShowing !== 'true' ? 
        knex('movies').select('*')
    :
        knex('movies')
            .distinct('movies.*')
            .join('movies_theaters', 'movies_theaters.movie_id', 'movies.movie_id')
            .where({'movies_theaters.is_showing': true});

const listReviewsByMovie = (knex, movieId) => 
    knex('reviews')
        .where({'reviews.movie_id': movieId});

const read = (knex, movieId) => 
    knex('movies').where({'movies.movie_id': movieId}).first();
      
const findTheater = (knex, movieId) => 
    knex('theaters')
        .select()
        .join('movies_theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
        .where({'movies_theaters.is_showing': true})
        .andWhere({'movies_theaters.movie_id': movieId});
      
const listCritics = (knex, criticId) => 
    knex('critics')
        .where({'critics.critic_id': criticId})
        .first();
      
module.exports = {
    list,
    listReviewsByMovie,
    read,
    findTheater,
    listCritics,
};