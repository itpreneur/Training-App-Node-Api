process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import Registration from '../../app/services/training/model/registration';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

let should = chai.should();

chai.use(chaiHttp);

describe('Webinar from Trainer', () => {

    beforeEach((done) => {
        Registration.remove({}, (err) => {
            done();
        });
    });

    describe('/GET Registration', () => {
        it('it should GET all the Webinar', (done) => {
            chai.request(server)
                .get('/register')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET HTTP get All Registration', () => {
        it('it should GET Registration based on ID', (done) => {
            chai.request(server)
                .get('/register/1234')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
    /*
     * Test the /POST route
     */
});
