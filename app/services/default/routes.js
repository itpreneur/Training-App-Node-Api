'use strict';

import express from 'express';
import Helper from 'app/helper';
import ResponseTemplate from 'app/global/templates/response';
import api_config from 'app/config/api';
import Geo from 'app/helper/Geo';



import axios from 'axios';
// import requestIP from 'request-ip';
import _ from 'lodash';


let router = express.Router();


// default / get route
router.get('/', (req, res) => {
	res.json({
		code: 200,
		message: 'I am alive and listening',
		resources: [
			{
				resource: 'users',
				status: 'in development',
				url: Helper.resource('/users'),
			},
			{
				resource: 'auth',
				status: 'in development',
				default: {
					method: 'POST',
					url: Helper.resource('/auth')
				},
				providers: [
					{ name: 'facebook', url: Helper.resource('/auth/login/facebook') },
					{ name: 'google', url: Helper.resource('/auth/login/google') },
					{ name: 'twitter', url: Helper.resource('/auth/login/twitter') },
					{ name: 'instagram', url: Helper.resource('/auth/login/instagram') },
				],
			},
			{ resource: 'dummy', status: 'in development', url: Helper.resource('/dummy') },
			{
				resource: 'events',
				status: 'in development',
				url: Helper.resource('/events'),
			},
			{
				resource: 'allakarte',
				status: 'in development',
				url: Helper.resource('/allakarte'),
			},
			{ resource: 'payments', status: 'in development', url: Helper.resource('/payments') },
			{ resource: 'bookings', status: 'in development', url: Helper.resource('/bookings') },
			{ resource: 'hosts', status: 'in development', url: Helper.resource('/hosts') },

		]
	})
});

module.exports = router
