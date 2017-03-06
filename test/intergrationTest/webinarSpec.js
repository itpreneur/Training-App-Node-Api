process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import Webinar from '../../app/services/training/model/webinar';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

let should = chai.should();

chai.use(chaiHttp);

describe('Webinar from Trainer', () => {

    beforeEach((done) => {
        Webinar.remove({}, (err) => {
            done();
        });
    });

    describe('/GET Webinar', () => {
        it('it should GET all the Webinar', (done) => {
            chai.request(server)
                .get('/webinar')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET HTTP get All Webinar', () => {
        it('it should GET webinar based on ID', (done) => {
            chai.request(server)
                .get('/webinar/1234')
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
