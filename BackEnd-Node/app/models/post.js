// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'message',
        required: false
    }],
    totalMessages: {
        type: Number,
        required: false,
        default: 0
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