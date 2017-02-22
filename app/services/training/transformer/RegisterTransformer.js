'use strict';

import _ from 'lodash';
import Helper from 'app/helper';

import UserTransformer from './UserTransformer';


let RegisterTransformer = {
    transform: (records) => {
        if (Array.isArray(records)) {
            let output = [];
            _.forEach(records, (record) => {
                output.push(RegisterTransformer._transform(record));
            });
            return output;
        } else {
            return RegisterTransformer._transform(records);
        }
    },
    _transform: (record) => {
        if (!record) { return {}; }
        let record_status = (record.status === 1) ? 'active' : 'disabled';
        return {
            id: record._id,
            user: record.user,
            event: {
                id: record.event.id,
                title: record.event.title,
                location: record.event.location,
                currency: record.event.booking.price.currency,
                date: record.event.date,
                owner: {
                    id: record.event.user._id,
                    name: record.event.user.name,
                    avatar: record.event.user.profile_picture ? Helper.avatarURL(record.event.user.profile_picture) : null,
                },
            },
            total_guests: record.total_guests,
            guests: record.guests,
            amount: record.amount,
            meta: record.meta || {},
            payment_method: Helper.getPaymentMethodName(record.payment_method),
            status: record_status,
        };
    },
    transformForTrainer: (records) => {
        if (Array.isArray(records)) {
            let output = [];
            _.forEach(records, (record) => {
                output.push(RegisterTransformer._transformForHost(record));
            });
            return output;
        } else {
            return RegisterTransformer._transformForHost(records);
        }
    },
    _transformForTrainer: (record) => {
        if (!record) { return {}; }
        let record_status = (record.status === 1) ? 'active' : 'disabled';
        let transformed_user = UserTransformer.transformTrainer(record.user);
        return {
            id: record._id,
            user: transformed_user,
            total_guests: record.total_guests,
            guests: record.guests,
            amount: record.amount,
            meta: record.meta || {},
            payment_method: Helper.getPaymentMethodName(record.payment_method),
            status: record_status,
            timestamp: record.created_at,
        };
    }
}
export default RegisterTransformer;
