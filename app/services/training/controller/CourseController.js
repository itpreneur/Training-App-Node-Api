'use strict';

import Course from '../model/course';
import CourseTransformer from '../transformer/CourseTransformer';

let CourseController = {

	create: (user_id, course, callback) => {
		let TechCourse = new Course({
			user: user_id,
			title: course.title,
			description: course.description,
			ID: course.ID,
			WelcomeV_ideo_id: course.WelcomeV_ideo_id,
			ShortDescription: course.ShortDescription,
			Thumbnails: course.Thumbnails

		});
		TechCourse.save((error, courseData) => {
			if (error) {
				callback(error);
			}
			callback(null, CourseTransformer.transform(courseData));
			return CourseTransformer.transform(courseData);
		});
	},
	getAll: (callback) => {

		Course.find({}, (error, courseData) => {
			if (error) {
				callback(error);
			}
			callback(null, CourseTransformer.transform(courseData));
			return CourseTransformer.transform(courseData);
		});
	},
	getCourseById: (callback) => {
		Course.findOne({
			user: user_id
		}, (error, courseData) => {
			if (courseData) {
				callback(null, CourseTransformer.transform(courseData));
				return CourseTransformer.transform(courseData);
			};
		})
	},
		update : (user_id, course_id, data, callback) => {
			Course.findOne({
				_id: course_id,
				user: user_id
			}, (error, courseData) => {
				if (courseData) {

					if (data.title) {
						courseData.title = data.title;
					}

					if (data.ID) {
						courseData.ID = data.ID;
					}
					if (data.description) {
						courseData.description = data.description;
					}
					if (data.price) {
						courseData.WelcomeV_ideo_id = data.WelcomeV_ideo_id;
					}
					if (data.ShortDescription) {
						courseData.ShortDescription = data.ShortDescription;
					}
					if (data.Thumbnails) {
						courseData.Thumbnails = data.Thumbnails;
					}

					courseData
						.save(function (err, webinar) {
							if (err) {
								callback('error occoured while updating webinar');
							} else {
								callback(null, webinar);
							}
						});

				} else {
					callback('course not found');
				}
			});
		}
	}
	export default CourseController;