'use strict';

import Register from '../model/registration';
import RegisterTransformer from '../transformer/RegisterTransformer';


let RegisterTransformerAPI = {
    create: (user_id, event, callback) => {
        let new_event = new Event({
            user: user_id,
            title: event.title,
            description: event.description,
            date: event.date,
            duration: event.duration,
            location: event.location,
            type: event.type,
            venue_type: event.venue_type,
            geo: {
                lat: event.geo.lat || 0,
                lng: event.geo.lng || 0,
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
        new_event.save((error, createdEvent) => {
            if (error) {
                callback(error);
                return null;
            }
            callback(null, RegisterTransformerAPI.transform(createdEvent));
            return RegisterTransformerAPI.transform(createdEvent);
        });
    }
}


export default RegisterTransformerAPI;
