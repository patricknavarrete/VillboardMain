var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var User = require ('../models/user')


var reservationSchema = new Schema ({
    rFirstName: {
        type: String,
        require: true,
    },
    rLastName: {
        type: String,
        require: true,
    },
    rAddress:{
        type: String,
        require: true,
    },
    rPhoneNumber:{
        type: String,
        require: true,
    },
    venue: {
        type: String,
    },
    reservationTime:{
        type: String,
        require:true,
    },
    reservationDate:{
        type: Date,
        require: true,
    },

}, 

{timestamps:true
    
})


module.exports = mongoose.model('Reservation', reservationSchema)

