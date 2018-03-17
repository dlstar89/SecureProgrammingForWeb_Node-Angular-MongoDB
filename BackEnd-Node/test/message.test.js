/*eslint-disable */
let User = require('../app/models/user');
let Post = require('../app/models/post');
let Message = require('../app/models/message');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

let should = chai.should();
chai.use(chaiHttp);

// Tests
describe('Message', function () {
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

  beforeEach((done) => {
    Message.remove({}, (err) => {
      done();
    });
  });

  describe('/GET', () => {
    it('it should GET MESSAGES for a give POST ID', (done) => {

      const userDetails = {
        name: 'Bob Bobskij',
        email: 'a@b.abc',
        password: 'pass1'
      };

      User.create([userDetails], (err, users) => {
        let user = users[0];
        let token = user.generateJwt();
        let postAmount = 5;

        const posts = [{
          userId: user._id,
          title: 'Some Post Title ',
          shortDescription: 'short description',
          fullDescription: 'full description'
        }];

        Post.create(posts, (err, res) => {
          let post = res[0];

          let messages = [{
            userId: post.userId,
            postId: post._id,
            messageText: 'Some test text 1'
          }, {
            userId: post.userId,
            postId: post._id,
            messageText: 'Some test text 2'
          }];

          Message.create(messages, (err, res) => {
            chai.request(server)
              .get('/api/getRecentMessages')
              .set({
                postid: post._id
              })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(messages.length);

                done();
              });
          });
        });
      });
    });
  });

  describe('/POST', () => {
    it('it should CREATE new MESSAGE using JWT', (done) => {
      const userDetails = {
        name: 'Bob Bobskij',
        email: 'a@b.abc',
        password: 'pass1'
      };

      User.create([userDetails], (err, users) => {
        let user = users[0];
        let token = user.generateJwt();
        let postAmount = 5;

        const postsDetails = [{
          userId: user._id,
          title: 'Some Post Title ',
          shortDescription: 'short description',
          fullDescription: 'full description'
        }];

        Post.create(postsDetails, (err, posts) => {
          let post = posts[0];

          let newmessage = {
            postId: post._id,
            messageText: 'Some test text 1'
          };

          chai.request(server)
            .post('/api/postmessage')
            .set('Authorization', 'Bearer ' + token)
            .send(newmessage)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body.should.have.property('userId');
              res.body.should.have.property('postId');
              res.body.should.have.property('messageText');
              res.body.should.have.property('markedAsAnswer');
              res.body.should.have.property('postedOn');

              done();
            });
        });
      });
    });

    it('it should FAIL CREATE new MESSAGE without JWT', (done) => {
      chai.request(server)
        .post('/api/postmessage')
        .send({
          postId: '123abc',
          messageText: 'Some test text 1'
        })
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });
  });
  describe('/PUT', () => {
    it('it should UPDATE message answered status TO TRUE using JWT as Authentication', (done) => {
      const userDetails = {
        name: 'Bob Bobskij',
        email: 'a@b.abc',
        password: 'pass1'
      };

      User.create([userDetails], (err, users) => {
        let user = users[0];
        let token = user.generateJwt();
        let postAmount = 5;

        const postsDetails = [{
          userId: user._id,
          title: 'Some Post Title ',
          shortDescription: 'short description',
          fullDescription: 'full description'
        }];

        Post.create(postsDetails, (err, posts) => {
          let post = posts[0];

          let newmessage = {
            postId: post._id,
            userId: user._id,
            messageText: 'Some test text 1'
          };

          Message.create([newmessage], (err, messages) => {
            message = messages[0];

            chai.request(server)
              .put('/api/markAnsweredStatus')
              .set('Authorization', 'Bearer ' + token)
              .send({ messageId: message._id, markedAsAnswer: true })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('userId');
                res.body.should.have.property('postId');
                res.body.should.have.property('messageText');
                res.body.should.have.property('markedAsAnswer');
                res.body.should.have.property('postedOn');
                res.body.markedAsAnswer.should.be.eql(true);

                done();
              });
          });
        });
      });
    });
  });

});