process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import User from '../app/services/training/model/training';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

let should = chai.should();

chai.use(chaiHttp);

describe('Training', () => {

    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/GET Training', () => {
        it('it should GET all the Training', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET HTTP get All Training', () => {
        it('it should GET all the Training', (done) => {
            chai.request(server)
                .get('/Training/')
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
    describe('/POST Register User', () => {
        it('it should not POST a user without pages field', (done) => {
            let user = {
                name: "The Lord of the Rings",
                password: "123456",
                email: "email@gmail.com",
                varify_password: "123456"
            }
            chai.request(server)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });

    });

    /*
     * Test the /POST route
     */
    describe('/POST Login User', () => {
        it('it should not POST a user without pages field', (done) => {
            let user = {
                password: "123456",
                email: "email@gmail.com",
            }
            chai.request(server)
                .post('/auth')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });

    });
});