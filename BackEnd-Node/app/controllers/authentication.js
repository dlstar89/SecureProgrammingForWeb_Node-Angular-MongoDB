let passport = require('passport');
let mongoose = require('mongoose');
var User = mongoose.model('user');


function getUsers(req, res) {
    let query = User.find({});
    query.exec(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
}

function registerUser(req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
}

function loginUser(req, res) {
    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
}


module.exports = {
    getUsers,
    registerUser,
    loginUser
};