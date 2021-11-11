var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var paymentSchema = new Schema ({
    uFirstName: {
        type: String,
        require: true,
    },
    uLastName: {
        type: String,
        require: true,
    },
    uAddress:{
        type: String,
        require: true,
    },
    uPhoneNumber:{
        type: String,
        require: true,
    },
    refNumber: {
        type: String,
        require: true,
        unique: true,
    },
    typeTransaction: {
        type: String,
        require: true,
    },
    photoUrl:{
        type: String,
    },
    proofPayment: {
        data: Buffer,
        contentType: String
    },
    pPending: {
        type: String,
        require: true,
        default: 'PENDING'
    },
}, 

{timestamps:true
    
})


module.exports = mongoose.model('Payment', paymentSchema)

