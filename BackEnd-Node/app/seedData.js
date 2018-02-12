let User = require('./models/user');

function seedDBData(req, res) {

    User.remove({}).exec();

    let p1 = new User({
            email: "a@b.ab",
            name: "Bob Bobovich",
            password: "pass1"
        })
        .save(function (err) {
            if (err) throw err;
        });
    let p2 = new User({
            email: "c@d.cd",
            name: "Dakon Drago",
            password: "pass2"
        })
        .save(function (err) {
            if (err) throw err;
        });

    console.log('DB Seeded!');
    res.json({
        success: true
    });
}

module.exports = {
    seedDBData
};