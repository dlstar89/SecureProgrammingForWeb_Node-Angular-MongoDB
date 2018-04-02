/*eslint-disable */
let server = require('../server');
let db = require('../app/db/db');
let User = db.dbData.model('user');
let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

chai.use(chaiHttp);

//Tests
describe('Authentication', function () {
  before((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  // describe('/GET users', () => {
  //   it('it should GET all USERS', (done) => {
  //     chai.request(server)
  //       .get('/api/users')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('array');

  //         done();
  //       });
  //   });
  // });

  describe('/POST user', () => {
    it('it should CREATE new USER and return a TOKEN', (done) => {

      const newUser = {
        name: 'Bob',
        email: 'a@b.ab',
        password: 'Qweqwe1234!'
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
        password: 'Qweqwe1234!'
      };

      chai.request(server)
        .post('/api/register')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(999);
          res.body.should.be.a('object');
          res.body.code.should.eql(11000);

          done();
        });
    });

    it('it should LOGIN user', (done) => {
      const user = {
        email: 'a@b.ab',
        password: 'Qweqwe1234!'
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
        password: 'Qweqwe1234!!'
      };

      chai.request(server)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');

          done();
        });
    });
  });
});