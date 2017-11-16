'use strict';

import Register from '../model/registration';
import RegisterTransformerAPI from '../transformer/RegisterTransformer';


let RegisterController= {
    create: (user_id, training_id,data, callback) => {
        let new_register = new Register({
            user: user_id,
            training: training_id,
            description: data.description,
            date: data.date,
            duration: data.duration,
            location: data.location,
            type: data.type
        });
        new_register.save((error, createdTraining) => {
            if (error) {
                callback(error);
                return null;
            }
            callback(null, RegisterTransformerAPI.transform(createdTraining));
            return RegisterTransformerAPI.transform(createdTraining);
        });
    },
    getRegisteredUserForTraining: (training_id, data, callback) => {
        Register.find({ _id: training_id }, (error, registration) => {
            if (err) {
                callback('error occoured while getting all Registrations');
            } else {
                callback(null, registration);
            }
        });
    },
}


export default RegisterController;
