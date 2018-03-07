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
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
    beforeEach((done) => {
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

        it('it should GET post by its ID', (done) => {
            const userDetails = {
                name: 'Bob Bobskij',
                email: 'a@b.abc',
                password: 'pass1'
            };

            User.create([userDetails], (err, users) => {
                let user = users[0];
                var newpost = {
                    userId: user._id,
                    title: 'title',
                    shortDescription: 'short description',
                    fullDescription: 'full description'
                };

                Post.create([newpost], (err, posts) => {
                    var pd = {
                        postid: posts[0]._id
                    };

                    chai.request(server)
                        .get('/api/getpost')
                        .set(pd)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id');
                            res.body._id.should.eql(pd.postid.toString());

                            done();
                        });
                });
            });
        });

        it('it should GET all POSTS using USERS JWT', (done) => {
            const userDetails = {
                name: 'Bob Bobskij',
                email: 'a@b.abc',
                password: 'pass1'
            };

            User.create([userDetails], (err, users) => {
                let user = users[0];
                let token = user.generateJwt();
                let postAmount = 5;

                const posts = [];
                for (var i = 0; i < postAmount; i++) {
                    posts.push({
                        userId: user._id,
                        title: `title ${i}`,
                        shortDescription: 'short description',
                        fullDescription: 'full description'
                    });
                }

                Post.insertMany(posts, (err, res) => {
                    chai.request(server)
                        .get('/api/getUserPosts')
                        .set('Authorization', 'Bearer ' + token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.eql(postAmount);

                            done();
                        });
                });
            });
        });

        it('it should FAIL GET all POSTS without USERS JWT', (done) => {
            chai.request(server)
                .get('/api/getUserPosts')
                // .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
    });

    describe('/POST', () => {
        it('it should CREATE new POST using User JWT', (done) => {
            const userDetails = {
                name: 'Bob Bobskij',
                email: 'a@b.abc',
                password: 'pass1'
            };

            User.create([userDetails], (err, res) => {
                let user = res[0];
                let token = user.generateJwt();

                let post = {
                    userId: user._id,
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
                        res.body.should.have.property('userId');
                        res.body.should.have.property('title');
                        res.body.should.have.property('shortDescription');
                        res.body.should.have.property('fullDescription');
                        res.body.should.have.property('postedOn');
                        res.body.should.have.property('totalMessages');

                        done();
                    });
            });
        });

        it('it should FAIL CREATE new POST without JWT', (done) => {
            let post = {
                userId: '123abc',
                title: 'Test Title',
                shortDescription: 'Test short description',
                fullDescription: 'Test full description'
            };

            chai.request(server)
                .post('/api/createpost')
                .send(post)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
    });
});