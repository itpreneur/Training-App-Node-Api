process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import User from '../../app/services/training/model/user';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
var request = require('request');
var expect = chai.expect;

let should = chai.should();
chai.use(chaiHttp);

describe('Test User Login and Register', () => {

    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
    /*
     * Test the /POST route for user register
     */
    describe('/POST Register User', () => {
        it('it should  POST a user and save in Database', (done) => {
            let user = {
                "name": "111",
                "password": "111",
                "email": "111@gmail.com",
                "verify_password": "111"
            }
            chai.request(server)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });

    });

    /*
     * Test the /POST route for login
     */
    describe('/POST Login User', () => {
        it('it should  POST a user and save in Database', (done) => {
            let user = {
                "password": "123456",
                "email": "123456@gmail.com",
            }
            chai.request(server)
                .post('/auth')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
    /*
     * Test the /POST route for login
     */
    describe('Social Auth for User google', () => {
        it('Social Auth for User google ', (done) => {
            chai.request(server)
                .post('/auth/login/google')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });

    describe('Social Auth for User twitter', () => {
        it('Social Auth for User twitter', (done) => {
            chai.request(server)
                .post('/auth/login/twitter')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
    describe('Social Auth for User google', () => {
        it('Social Auth for User google ', (done) => {
            chai.request(server)
                .post('/auth/login/instagram')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
    describe('Auth Test for authorization token validation', function() {
        var token = null;
        // make collection empty first
        beforeEach((done) => {
            User.remove({}, (err) => {
                done();
            });
        });
        beforeEach(function(done) {
            let user = {
                "name": "111",
                "password": "111",
                "email": "111@gmail.com",
                "verify_password": "111"
            }
            chai.request(server)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    done();
                });
        });

        it('it should login a user and get Token in response', (done) => {
            let user = {
                "password": "111",
                "email": "111@gmail.com",
            }
            chai.request(server)
                .post('/auth')
                .send(user)
                .end((err, res) => {
                  token =  res.body.token;
                    expect(res.body.token).to.be.a('string');
                    expect(res.body.token).to.not.be.undefined;
                    done();
                });
        });
        /*  it('should be able to fetch trainings Data after login', function(done) {
            chai.request(server)
                .get('/training')
                .set('authorization',token)
                .end((err, res) => {
                  console.log(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                //no authentication token provided, please login first and provide the authentication token.
                done();
              });
        }); */
    });
});
