// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    messageText: {
        type: String,
        required: true
    },
    markedAsAnswer: {
        type: Boolean,
        required: false,
        default: false
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
//     var message = this;

//     next();
// });


//Export User schema
module.exports = mongoose.model('message', messageSchema);