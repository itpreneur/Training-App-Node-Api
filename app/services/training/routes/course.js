'use strict';
import express from 'express';
import Course from '../model/course';
import CourseTransformer from '../transformer/CourseTransformer';
import CourseController from '../controller/CourseController';
import ResponseTemplate from 'app/global/templates/response';
import Helper from 'app/helper';
import multer from 'multer';
import path from 'path';
import config_server from 'app/config/server';
let router = express.Router();
// list all Webinar
router.get('/', (req, res) => {
 Course.find({}, (error, _course) => {
    //   console.log(_course);
        if (error) {
            res.send(error);
        }
       // console.log(_course.data);
        let Courses = CourseTransformer.transform(_course);
        res.json({
            code: 200,
            message: 'success',
            courses: Courses
        });
    });
});

// save new Webinar
router.post('/', (req, res) => {

   CourseController.create(req.user.id, req.body, (error, Course) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success(
                'new Course has been successfully added', {
                 Course: Course
                }));
        }
    });
});

// update Webinar details
router.post('/:id', (req, res) => {
   CourseController.update(req.user.id, req.params.id, req.body, (error, event) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success('Your Course has been successfully updated'));
        }
    });
});

module.exports = router
