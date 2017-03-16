process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import User from '../../app/services/training/model/user';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
let should = chai.should();
chai.use(chaiHttp);


describe('Users', () => {

    describe('/GET Users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET HTTP get All users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/users/')
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
                email: "123456@gmail.com",
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
