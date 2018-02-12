let User = require('./models/user');

function seedDBData(req, res) {

    User.remove({}).exec();

    let p1 = new User({
            email: "sdeto@der.er",
            name: "Samuel",
            password: "pass1"
        })
        .save(function (err) {
            if (err) throw err;
        });
    let p2 = new User({
            email: "abc@des.eee",
            name: "Dakon",
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