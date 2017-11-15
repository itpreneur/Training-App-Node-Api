'use strict';

import Training from '../model/training';
import TrainingTransformer from '../transformer/TrainingTransformer';


let TrainingController = {
    create: (user_id, training, callback) => {
        let newTraining = new Training({
            user: user_id,
            title: training.title,
            description: training.description,
            date: training.date,
            duration: training.duration,
            location: training.location,
            type: training.type

        });
        newTraining.save((error, createdEvent) => {
            if (error) {
                callback(error);
                return null;
            }
            callback(null, TrainingTransformer.transform(createdEvent));
            return TrainingTransformer.transform(createdEvent);
        });
    },
    getTrainingById: (user_id, training_id, callback) => {
        
        Training.find({_id : training_id }).
        populate('user').
        populate({ path: 'registration'}).   
        populate({ path: 'reviews'}).        
        exec(function (err, createdTraining) {
            if (error) {
                callback(error);
                return null;
            }
            callback(null, TrainingTransformer.transform(createdTraining));
            return TrainingTransformer.transform(createdTraining);
        });
    },
    
    update: (user_id, training_id, data, callback) => {
        Training.findOne({ _id: training_id, user: user_id }, (error, training) => {
            if (error) { console.log('error', error); }
            if (training) {

                if (data.title) { event.title = data.title; }
                if (data.description) { event.description = data.description; }
                if (data.date) { event.date = data.date; }
                if (data.duration) { event.duration = data.duration; }
                if (data.location) { event.location = data.location; }
                if (data.type) { event.type = data.type; }
            
                training.save(function(err, training) {
                    if (err) {
                        callback('error occoured while updating training');
                    } else {
                        callback(null, event);
                    }
                });

            } else {
                callback('training not found');
            }
        });
    }
}
export default TrainingController;
