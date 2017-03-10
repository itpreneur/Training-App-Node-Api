process.env.NODE_ENV = 'test';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

let should = chai.should();
chai.use(chaiHttp);
describe('Test for training  API failed response 403 authentication error', () => {

    it('it should get auth error while getting training Data object', (done) => {
        chai.request(server)
            .get('/training/1234')
            .end((err, res) => {
                res.body.should.have.property('code').deep.eql(403)
                res.body.should.have.property('message').deep.eql('authentication error');
                res.body.should.have.property('description').deep.eql('no authentication token provided, please login first and provide the authentication token.');
                done();
            });
    });

    it('it should get auth error whle getting training Data object', (done) => {
        chai.request(server)
            .get('/training/1234/1234')
            .end((err, res) => {
              res.body.should.have.property('code').deep.eql(403)
              res.body.should.have.property('message').deep.eql('authentication error');
              res.body.should.have.property('description').deep.eql('no authentication token provided, please login first and provide the authentication token.');
              done();
            });
    });


});
