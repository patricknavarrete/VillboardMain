var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var masterListSchema = new Schema ({
    mFirstName: {
        type: String,
    },
    mLastName: {
        type: String,
    },
    mEmail:{
        type: String,
    },
    mAddress: {
        type: String,
    },
    mPhoneNumber1: {
        type: String,
    },
    mPhoneNumber2: {
        type: String,
    },
    mTelNumber: {
        type: String,
    },
    headFamily: {
        type: String,
    },
    subFamily: {
        type: String,
    },
    subPhoneNumber: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    // status:{
    //     type: String,
    //     default: "Pending"
    // } 
    

    
 },
)

module.exports = mongoose.model('MasterList', masterListSchema)