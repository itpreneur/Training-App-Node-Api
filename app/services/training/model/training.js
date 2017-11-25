'use strict';

import mongoose from 'mongoose'
const TrainingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    Link: {
        type: String
    },
    ID: {
        type: String
    },
    DurationInSeconds: {
        type: String
    },
    Title: {
        type: String
    },
    WelcomeVideoId: {
        type: String
    },
    Description: {
        type: String
    },
    ShortDescription: {
        type: String
    },
    Thumbnails: {
        type: Object
    }
});

TrainingSchema.virtual('registration', {
    ref: 'Registeration',
    localField: '_id',
    foreignField: 'training'
});
TrainingSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'training'
});

export default mongoose.model('Training', TrainingSchema);
