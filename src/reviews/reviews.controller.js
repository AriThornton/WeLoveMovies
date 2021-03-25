const service = require('./reviews.service');
const movieService = require('../movies/movies.service');

const update = async (req, res, next) => {
    const review = res.locals.review;
    const knex = req.app.get('db');
  
    const fields = ['content', 'score'];
    for(const field of fields) {
      if(req.body.data[field]) review[field] = req.body.data[field];
    }
  
    await service.updateReview(knex, review);
  
    review.critic = await movieService.listCritics(knex, review.critic_id);
    res.json({ data: review });
}

const destroy = async (req, res, next) => {
    await service.deleteReviewById(req.app.get('db'), res.locals.review.review_id);
    res.sendStatus(204);
}

const reviewExists = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const knex = req.app.get('db');
    const foundReview = await service.getReviewById(knex, reviewId);
  
    if(!foundReview) next({ status: 404, message: `${reviewId} cannot be found` });
  
    res.locals.review = foundReview;
    next();
}

module.exports = {
    update: [reviewExists, update],
    delete: [reviewExists, destroy],
};