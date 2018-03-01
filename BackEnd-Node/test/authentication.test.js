let mongoose = require("mongoose");
let User = require('../app/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/**TESTS */
describe('Authentication', function () {
    before((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/GET users', () => {
        it('it should GET all USERS', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    done();
                });
        });
    });

    describe('/POST user', () => {
        it('it should CREATE new user', (done) => {

            const newUser = {
                name: 'Bob',
                email: 'a@b.ab',
                password: 'qweqwe'
            };

            chai.request(server)
                .post('/api/register')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');

                    done();
                });
        });

        it('it should FAIL CREATING new user with existing email', (done) => {

            const newUser = {
                name: 'Bob',
                email: 'a@b.ab',
                password: 'qweqwe'
            };

            chai.request(server)
                .post('/api/register')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(999);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('error');

                    done();
                });
        });

        it('it should LOGIN user', (done) => {
            const user = {
                email: 'a@b.ab',
                password: 'qweqwe'
            };

            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');

                    done();
                });
        });

        it('it should NOT LOGIN user with wrong PASSWORD', (done) => {
            const user = {
                email: 'a@b.ab',
                password: 'qweqweqwe'
            };

            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('token');

                    done();
                });
        });
    });

});