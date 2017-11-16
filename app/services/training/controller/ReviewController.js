'use strict';

import validator from 'validator';
import Review from '../model/reviews';
import ReviewTransformer from '../transformer/ReviewTransformer';


let ReviewController = {

    create: (user_id, training_id, data, callback = null) => {
        let newReview = new Review({
            trainer: user_id,
            user: user_id,
            training: training_id,
            text: data.text,
            rating: data.rating,
            status: 1,
        });
        newReview.save((error, record) => {
            if (callback) {
                callback(null, ReviewTransformer.transform(record));
            }
            return ReviewTransformer.transform(record);
        });
    },
    getReviewsForTraining: (training_id, data, callback) => {
        Review.find({ _id: training_id }, (error, review) => {
            if (err) {
                callback('error occoured while updating Review');
            } else {
                callback(null, reviewData);
            }
        });
    },
    update: (user_id, training_id, data, callback) => {
        Review.findOne({ _id: training_id, user: user_id }, (error, review) => {
            if (error) { console.log('error', error); }
            if (review) {

                if (data.text) { review.title = data.text; }
                if (data.rating) { review.description = data.rating; }
                if (data.status) { review.date = data.status; }


                review.save(function(err, reviewData) {
                    if (err) {
                        callback('error occoured while updating Review');
                    } else {
                        callback(null, reviewData);
                    }
                });

            } else {
                callback('Review not found');
            }
        });
    }
}
export default ReviewController;
