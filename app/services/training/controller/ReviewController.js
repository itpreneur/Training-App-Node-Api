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
    }
}
export default ReviewController;
