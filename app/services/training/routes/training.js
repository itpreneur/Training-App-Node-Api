'use strict';

import express from 'express';
import Training from '../model/training';
import TrainingTransformer from '../transformer/TrainingTransformer';
import ResponseTemplate from 'app/global/templates/response';
import TrainingController from '../controller/TrainingController';
import RegisterController from '../controller/RegisterController';
import Helper from 'app/helper';
import multer from 'multer';
import path from 'path';
import config_server from 'app/config/server';

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(config_server.UPLOAD_DIR, config_server.EVENT_IMAGES_DIR));
    },
    filename: function(req, file, cb) {
        let extension = Helper.getFileExtension(file.originalname);
        cb(null, `${req.user.id}-${req.body.id}-${ Helper.randomString() }.${extension}`);
    }
})
let upload = multer({ storage: storage });

let router = express.Router();
// list all trainings
router.get('/', (req, res) => {
    Training.find({})
        .sort({ created_at: 1 })
        .populate('user')
        .exec((error, trainings) => {
            if (error) {
                res.send(error);
            }
            console.log(trainings);
            trainings = TrainingTransformer.transform(trainings);

            res.json({
                code: 200,
                message: 'success',
                trainings: trainings
            });
        });

});

router.get('/:id', (req, res) => {
    TrainingController.getTrainingById(req.params.id, (error, training) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
             // console.log(_course.data);
             res.json({
                code: 200,
                message: 'success',
                Training: training
            });
        }
    });
});

router.get('/user', (req, res) => {
    TrainingController.getTrainingByUserId(req.user.id, (error, training) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
             // console.log(_course.data);
             res.json({
                code: 200,
                message: 'success',
                Training: training
            });
        }
    });
});

router.get('/:id/request-approval', (req, res) => {
    let data = {
        request_approval: true
    }
    TrainingController.update(req.user.id, req.params.id, data, (error, training) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success('Your training approval request has been received.'));
        }
    });

});

router.get('/:id/completed', (req, res) => {
    let data = {
        // date: new Date(),
    }
    TrainingController.update(req.user.id, req.params.id, data, (error, training) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success('This training has been marked as completed.'));
            BookingController.TrainingCompleted(training.id);
        }
    });

});

router.post('/', (req, res) => {
    console.log(req.body);
    TrainingController.create(req.user.id, req.body, (error, training) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success(
                'New training has been successfully added', { training: training }));

        }
    });
});

// upload training images.
router.post('/upload', upload.array('images'), (req, res) => {
    let image = {};
    req.files.map((file) => {
        image.url = file.filename;
        image.originalname = file.originalname;
        image.timestamp = new Date();
    });

    TrainingController.update(req.user.id, req.body.id, { image: image }, (error, training) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            let training_images = [];
            if (training.images) {
                training.images.map((image) => {
                    training_images.push(Helper.trainingImageURL(image.url));
                });
            }
            res.json(ResponseTemplate.success(
                'training images have been successfully uploaded', { images: training_images }));
        }
    });


});
// delete training image
router.post('/delete-image', (req, res) => {

    TrainingController.deleteImage(req.user.id, req.body.id, req.body.filename, (error, training) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            let training_images = [];
            if (training.images) {
                training.images.map((image) => {
                    training_images.push(Helper.trainingImageURL(image.url));
                });
            }
            res.json(ResponseTemplate.success(
                'training image have been successfully deleted', { images: training_images }));
            Helper.deleteFile('training', req.body.filename);
        }
    });

});

// update training details
router.post('/:id', (req, res) => {
    TrainingController.update(req.user.id, req.params.id, req.body, (error, training) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success('your data has been successfully updated'));
        }
    });
});

module.exports = router
