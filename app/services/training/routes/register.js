'use strict';
import express from 'express';
import Register from '../model/register';
import RegisterTransformer from '../transformer/RegisterTransformer';
import RegisterController from '../controller/RegisterController';
import ResponseTemplate from 'app/global/templates/response';
import Helper from 'app/helper';
import multer from 'multer';
import path from 'path';
import config_server from 'app/config/server';
let router = express.Router();

// list all registrations
router.get('/', (req, res) => {
    Register.find({
    }, (error, Register) => {
        if (error) {
            res.send(error);
        }
        Webinar = RegisterTransformer.transform(Register);
        res.json({
            code: 200,
            message: 'success',
            registration: Register
        });
    });
});

// save new Webinar
router.post('/', (req, res) => {
    WebinarController.create(req.user.id, req.body, (error, Webinar) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success(
                'new dish has been successfully added', {
                    Webinar: Webinar
                }));
        }
    });
});
// update Webinar details
router.post('/:id', (req, res) => {
    WebinarController.update(req.user.id, req.params.id, req.body, (error, event) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success('your data has been successfully updated'));
        }
    });
});

module.exports = router
