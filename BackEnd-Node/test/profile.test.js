let User = require('../app/models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

/*eslint-disable */

let should = chai.should();
chai.use(chaiHttp);



//Tests
describe('Profile', function () {
    before((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/GET profile', () => {
        it('it should GET profile using JWT', (done) => {

            var user = new User({
                name: 'bob',
                email: 'a@b.ab',
                password: 'pass1'
            });

            const userDetails = {
                email: 'a@b.ab',
                password: 'pass1'
            };

            user.save((err, user) => {
                chai.request(server)
                    .post('/api/login')
                    .send(userDetails)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('token');

                        var token = res.body.token;

                        chai.request(server)
                            .get('/api/profile')
                            .set('Authorization', 'Bearer ' + token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('_id').eql(user._id.toString());

                                done();
                            });
                    });
            });
        });
    });
});