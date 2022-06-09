var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var User = require ('../models/user')


var petSchema = new Schema ({
    pFirstName: {
        type: String,
        require: true,
    },
    pLastName: {
        type: String,
        require: true,
    },
    pEmail:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    pAddress:{
        type: String,
        require: true,
    },
    pPhoneNumber:{
        type: String,
        require: true,
    },
    petName: {
        type: String,
        require: true,
    },
    petBreed:{
        type: String,
        require:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
    // photoUrlPet:{
    //     type: String,
    // },
    // petQRpicture: {
    //     data: Buffer,
    //     contentType: String,
    // }


}, 

{timestamps:true
    
})


module.exports = mongoose.model('Pet', petSchema)

