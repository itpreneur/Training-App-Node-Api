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
            type: training.type,
            geo: {
                lat: training.geo ? '' : training.geo.lat || 0,
                lng: training.geo ? '' : training.geo.lng || 0,
            },
            steps: {
                general: true,
                menu: false,
                images: false,
                booking: false,
                additional: false,
            },
            meta: {
                approved: false
            }

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
            
                training.save(function(err, event) {
                    if (err) {
                        callback('error occoured while updating event');
                    } else {
                        callback(null, event);
                    }
                });

            } else {
                callback('event not found');
            }
        });
    }
}
export default TrainingController;
