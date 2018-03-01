let mongoose = require("mongoose");
let User = require('../app/models/user');
let Post = require('../app/models/post');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/**TESTS */
describe('Post', function () {
    before((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
    before((done) => {
        Post.remove({}, (err) => {
            done();
        });
    });

    describe('/GET', () => {
        it('it should GET recent posts without any authentication', (done) => {
            chai.request(server)
                .get('/api/getrecentposts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST', () => {
        it('it should CREATE new POST using User JWT', (done) => {
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

                        let token = res.body.token;

                        let post = {
                            author: user._id,
                            title: 'Test Title',
                            shortDescription: 'Test short description',
                            fullDescription: 'Test full description'
                        };

                        chai.request(server)
                            .post('/api/createpost')
                            .set('Authorization', 'Bearer ' + token)
                            .send(post)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('_id');
                                res.body.should.have.property('author');
                                res.body.should.have.property('title');
                                res.body.should.have.property('shortDescription');
                                res.body.should.have.property('fullDescription');
                                done();
                            });
                    });
            });
        });
    });
});