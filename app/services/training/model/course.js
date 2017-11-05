'use strict';

import mongoose from 'mongoose'

const CourseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
     Link : {
     type: String
    },
    ID:  {
     type: String
    },
    DurationInSeconds :  {
     type: String
    },
    Title:  {
     type: String
    },
    WelcomeVideoId :  {
        type: String
    },
    Description: {
        type: String
    },
    ShortDescription:  {
     type: String
    },
    Thumbnails:  {
     type: Object
    }
});
export default mongoose.model('Course', CourseSchema);
