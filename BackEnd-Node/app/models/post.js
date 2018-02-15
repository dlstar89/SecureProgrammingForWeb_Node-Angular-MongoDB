// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: false,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});


// Pre save checks
// postSchema.pre('save', function (next) {
//     var post = this;

//     next();
// });


//Export User schema
module.exports = mongoose.model('post', postSchema);