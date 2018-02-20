var mongoose = require('mongoose');
let User = mongoose.model('user');
let Post = mongoose.model('post');


function seedDBData(req, res) {

    User.collection.drop();
    Post.collection.drop();

    var p1 = new User({
        // _id: new mongoose.Types.ObjectId(),
        email: "a@b.ab",
        name: "Bob Bobovich",
        password: "pass1"
    });
    p1.save(function (err) {
        if (err) throw err;
        for (var i = 0; i < 5; i++) {
            var post1 = new Post({
                    author: p1._id,
                    title: 'Bob Job ' + (i + 1),
                    description: 'Some description for Job ' + (i + 1)
                })
                .save(function (err) {
                    if (err) throw err;
                });
        }
    });

    var p2 = new User({
        email: "c@d.cd",
        name: "Dakon Drago",
        password: "pass2"
    });
    p2.save(function (err) {
        if (err) throw err;
        for (var i = 0; i < 3; i++) {
            var post1 = new Post({
                    author: p2._id,
                    title: 'Dakon Job ' + (i + 1),
                    description: 'Some description for Job ' + (i + 1)
                })
                .save(function (err) {
                    if (err) throw err;
                });
        }
    });

    console.log('DB Seeded!');
    res.json({
        success: true
    });
}


module.exports = {
    seedDBData
};