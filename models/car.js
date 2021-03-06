var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var User = require ('../models/user')


var carSchema = new Schema ({
    cFirstName: {
        type: String,
        require: true,
    },
    cLastName: {
        type: String,
        require: true,
    },
    // cEmail:{
    //     type: String,
    //     require: true,
    // },
    cAddress:{
        type: String,
        require: true,
    },
    cPhoneNumber:{
        type: String,
        require: true,
    },
    vehicleModel: {
        type: String,
        require: true,
    },
    plateNumber:{
        type: String,
        require:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cQR:{
        type: String,
        require: true,
    },
    // photoUrlCar:{
    //     type: String,
    // },
    // carQRpicture: {
    //     data: Buffer,
    //     contentType: String,
    // }

}, 

{timestamps:true
    
})


module.exports = mongoose.model('Car', carSchema)

