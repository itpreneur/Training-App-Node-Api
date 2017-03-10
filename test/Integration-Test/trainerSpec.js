process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import Training from '../../app/services/training/model/training';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

let should = chai.should();

chai.use(chaiHttp);

describe('Become Trainer and Create Trainings', () => {

    /*describe('/GET Make Trainer', () => {
        it('it should GET all the Training', (done) => {
            chai.request(server)
                .get('/make_trainer')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });*/
});
