var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var postSchema = new Schema({
    postCaption:{
        type: String,
        require: true,
    },
    postCategory:{
        type: String,
        require: true,
    },  
    photoUrl:{
        type: String,
    },
    postPicture: {
        data: Buffer,
        contentType: String
    },
    // email: {
    //     type: String,
    // },
    postField: {
        type: Array,
        default: []
    }

  
})

module.exports = mongoose.model('Post', postSchema)
