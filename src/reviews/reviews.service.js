const getReviewById = (knex, reviewId) =>
  knex('reviews')
    .where({'reviews.review_id': Number(reviewId)})
    .select('reviews.*')
    .first();

const updateReview = (knex, review) => 
  knex('reviews')
    .update(review)
    .where({'reviews.review_id': review.review_id})

const deleteReviewById = (knex, reviewId) => 
  knex('reviews')
    .delete()
    .where({'reviews.review_id': reviewId});

module.exports = {
  getReviewById,
  updateReview,
  deleteReviewById,
}