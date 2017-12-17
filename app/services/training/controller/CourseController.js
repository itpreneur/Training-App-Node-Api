'use strict';

import Course from '../model/course';
import CourseTransformer from '../transformer/CourseTransformer';

let CourseController = {

	create: (user_id, course, callback) => {
		console.log(course)
		let TechCourse = new Course({
			user: user_id,
			Title: course.Title,
			Description: course.Description,
			ID: course.ID,
			Link: course.Link,
			WelcomeV_ideo_id: course.WelcomeVideoId,
			ShortDescription: course.ShortDescription,
			Thumbnails: [
				{
					"FullURL": course.Thumbnails
				}
			]

		});

		TechCourse.save((error, courseData) => {
			if (error) {
				callback(error);
			}
			callback(null, CourseTransformer.transform(courseData));
			return CourseTransformer.transform(courseData);
		});
	},
	getCourseByTitle: (key, callback) => {
		console.log(key);
		
		Course.find({'Title' : new RegExp(key, 'i')}).
        populate('user').       
        exec((error, courseData) => {
			if (error) {
				callback(error);
			}
			callback(null, CourseTransformer.transform(courseData));
			return CourseTransformer.transform(courseData);
		});
	},
	getCourseByUserId: (user_id, callback) => {
		Course.find({
			user: user_id
		}, (error, courseData) => {
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
	update: (user_id, course_id, data, callback) => {
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
