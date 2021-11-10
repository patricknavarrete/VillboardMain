var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var User = require ('../models/user')


var reservationSchema = new Schema ({
    rFirstName: {
        type: String,
        require: true,
    },
    pLastName: {
        type: String,
        require: true,
    },
    pAddress:{
        type: String,
        require: true,
    },
    pPhoneNumber:{
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

}, 

{timestamps:true
    
})


module.exports = mongoose.model('Reservation', reservationSchema)

