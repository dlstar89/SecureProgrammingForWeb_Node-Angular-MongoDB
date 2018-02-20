// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'pst',
        required: true
    },
    text: {
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
module.exports = mongoose.model('message', messageSchema);