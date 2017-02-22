'use strict';

import express from 'express';
import Helper from 'app/helper';
import faker from 'faker';
import _ from 'lodash';

import UserController from 'app/services/training/controller/UserController';
import TrainingController from 'app/services/training/controller/TrainingController';
import WebinarController from 'app/services/training/controller/WebinarController';


let router = express.Router();




router.get('/', (req, res) => {
	res.json({
		code: 200,
		message: 'success',
		actions: [
			{ url: Helper.resource('/dummy/create-guests'), description: 'create dummy guests' },
			{ url: Helper.resource('/dummy/create-hosts'), description: 'create dummy hosts' },
			{ url: Helper.resource('/dummy/create-events'), description: 'create dummy events' },
		]
	});
});













router.get('/create-hosts', (req, res) => {
	let hosts = [];
	let max = 1;

	let locations = [
		{ address: 'JP Nagar 7th Phase, Bengaluru, Karnataka, India', lng: 77.57807509999998, lat: 12.8873185 },
		{ address: 'Jayanagar 3rd Block, Jayanagara Jaya Nagar, Bengaluru, Karnataka, India', lng: 77.58386919999998, lat: 12.9329463 },
		{ address: 'Kothnoor Dinne, Bengaluru, Karnataka, India', lng: 77.58271749999994, lat: 12.8769547 },
		{ address: 'Kathriguppe, Banashankari, Bengaluru, Karnataka, India', lng: 77.550523, lat: 12.926132 },
		{ address: 'Koramangala 1st Block, Bengaluru, Karnataka, India', lng: 77.63615519999996, lat: 12.9265132 },
		{ address: 'MG Road Metro Station, Shivaji Nagar, Bengaluru, Karnataka, India', lng: 77.60585200000003, lat: 12.975686 },
		{ address: 'Telangana, India', lng: 79.01929969999992, lat: 18.1124372 },
		{ address: 'Hyderabad Public School Ramathapur, Uppal - Ramanthapur Road, Rahat Nagar, Hyderabad, Telangana, India', lng: 78.53734370000006, lat: 17.399618 },
		{ address: 'Indian Airlines Colony, Hyderabad, Telangana, India', lng: 78.47412710000003, lat: 17.4428821 },
		{ address: 'Hyderabad Asbestos Staff Colony, Secunderabad, Telangana, India', lng: 78.49863499999992, lat: 17.4585788 },
		{ address: 'Electronic City Phase II, Bengaluru, Karnataka, India', lng: 77.67938129999993, lat: 12.8441489 },
		{ address: 'Shivaji Nagar, Bengaluru, Karnataka, India', lng: 77.60569269999996, lat: 12.9856503 },
		{ address: 'Majestic Bus Station, Majestic, Bengaluru, Karnataka, India', lng: 77.57235209999999, lat: 12.9779977 },
	];


	for ( let i = 0; i < max; i++ ) {

		let events = [];
		for ( let i = 0; i < 10; i++ ) {
			let event_geo = faker.random.arrayElement(locations);
			events.push({
				title: faker.lorem.words(),
				description: faker.lorem.paragraphs(),
				duration: faker.random.number({min:1, max:12}),
				date: faker.date.between('2016-12-01', '2017-01-29'),
				location: event_geo.address,
				geo: {
					lng: event_geo.lng,
					lat: event_geo.lat
				},
				type: faker.random.number({min:1, max:9}).toString(),
				venue_type: faker.random.number({min:1, max:11}).toString(),
				booking: {
					price: {
						amount: faker.random.number({min:100, max:25000}),
						currency: faker.random.number({min:1, max:2}).toString(),
					},
					guests: {
						outside: faker.random.boolean(),
						min: faker.random.number({min:2, max:10}),
						max: faker.random.number({min:20, max:50}),
					}
				},
				additional: {
					recurring: {},
					privacy: {},
					hosting: {},
					location: {
						pets: faker.random.number({min:1, max:3}).toString(),
						parking: faker.random.number({min:1, max:3}).toString(),
						smoking: faker.random.number({min:1, max:3}).toString(),
						others: _.sampleSize( ["1", "2", "3"], faker.random.number({min:1, max:3}) ),
					}
				},
				menu: {
					can_accommodate: _.sampleSize( ["1", "2", "3", "4", "5", "6", "7", "8", "9"], faker.random.number({min:1, max:9}) ),
					drinks: _.sampleSize( ["1", "2", "3", "4", "5", "6", "7", "8", "9"], faker.random.number({min:1, max:9}) ),
					alcohol_policy: faker.random.number({min:1, max:5}).toString(),
					allergens: faker.lorem.sentence(),
					menu_drinks: faker.lorem.sentences(3,3),
					desert: faker.lorem.sentences(3,3),
					main_dish: faker.lorem.sentences(3,3),
					starter: faker.lorem.sentences(3,3),
				},
				// meta: {
				// 	approved_timestamp: new Date(),
				// 	approved: true,
				// },
				status: 1,
				steps: {
					additional: true,
					booking: true,
					images: true,
					menu: true,
					general: true,
				},
				request_approval: true,
			});
		}


		let allakartes = [];
		for ( let i = 0; i < 10; i++ ) {
			allakartes.push({
				title: faker.lorem.words(),
				description: faker.lorem.paragraphs(),
				status: 1,
				price: faker.random.number({min:80, max:7500}),
				allergens: faker.lorem.sentence(),
				booking_time: faker.random.number({min:1, max:5}),
				booking_type: faker.random.number({min:1, max:2}).toString(),
			});
		}

		let host_geo = faker.random.arrayElement(locations);
		hosts.push({
			provider: 'default',
			name: faker.name.findName(),
			email: faker.internet.email(),
			phone: faker.phone.phoneNumberFormat(0),
			password: 'Passw0rd',
			type: 2,
			status: 1,
			profile_picture: faker.image.avatar(),
			address: host_geo.address,
			geo: {
				lng: host_geo.lng,
				lat: host_geo.lat
			},
			meta: {
				fun_fact: faker.lorem.sentences(4,3),
				about: faker.lorem.sentences(8,5),
			},
			events: events,
			allakartes: allakartes,
		});
	}




	hosts.map( host => {
		UserController.registerRandom( host, (error, user) => {

			// create all the events for the newly created host
			host.events.map( event => {
				EventController.create(user.id, event, (error, record) => {
					EventController.update( user.id, record.id, event, (error, updatedRecord) => {
						// updatedRecord.. incase we wanna do anything here.
					});
				});
			});


			// create all the allakarte for the newly created host
			host.allakartes.map( allakarte => {
				AllakarteController.create(user.id, allakarte, (error, record) => {
					// updatedRecord.. incase we wanna do anything here.
				});
			});

		});
	});



	res.json({
		code: 200,
		message: 'success',
		hosts: hosts,
	});

});















module.exports = router
