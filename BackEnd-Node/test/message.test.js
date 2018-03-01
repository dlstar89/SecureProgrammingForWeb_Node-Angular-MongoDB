let mongoose = require("mongoose");
let User = require('../app/models/user');
let Message = require('../app/models/message');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/**TESTS */
describe('Message', function () {
    before((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    before((done) => {
        Message.remove({}, (err) => {
            done();
        });
    });

    // describe('/GET messages for profile', () => {
    //     it('it should GET profile using JWT', (done) => {

    //         chai.request(server)
    //             .get('/api/profile')
    //             .set('Authorization', 'Bearer ' + token)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('_id').eql(user._id.toString());

    //                 done();
    //             });
    //     });
    // });
});