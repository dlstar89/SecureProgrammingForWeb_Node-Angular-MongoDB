// get an instance of mongoose and mongoose.Schema
let config = require('config');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @swagger
 * definitions:
 *   Token:
 *     type: object
 *     properties:
 *       token:
 *         type: string
 *   NewUser:
 *     type: object
 *     required:
 *       - name
 *       - email
 *       - password
 *     properties:
 *       name:
 *         type: string
 *         emaple: 'Bob Paguhskij'
 *       email:
 *         type: string
 *         example: 'b@p.bp'
 *       password:
 *         type: string
 *         format: password
 *         example: 'pass1'
 * 
 *   User:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *
 */

/**
 * @swagger
 * parameters:
 *   name:
 *     type: string
 *     name: name
 *     in: formData
 *     required: true
 *     example: 'Bill Starovski'
 *   email:
 *     type: string
 *     name: email
 *     in: formData
 *     required: true
 *     example: 'a@b.ab'
 *   password:
 *     type: string
 *     name: password
 *     in: formData
 *     required: true
 *     format: password
 *     example: 'pass1'
 */

/**
 * USER SCHEMA
 */
let userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    hash: String,
    salt: String,
    userRole: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    lastUpdatedOn: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    this.password = undefined;
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, config.jwtSecret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// Pre save checks
userSchema.pre('save', function (next) {
    var user = this;
    if (user.createdOn === undefined)
        this.createdOn = new Date();
    if (user.lastUpdatedOn === undefined)
        this.lastUpdatedOn = new Date();
    if (user.password)
        user.setPassword(user.password);

    next();
});


//Export User schema
module.exports = mongoose.model('user', userSchema);