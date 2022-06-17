var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var addFamilySchema = new Schema ({
    aFirstName: {
        type: String,
        require: true,
    },
    aLastName: {
        type: String,
        require: true,
    },
    aEmail:{
        type: String,
        require: true,
    },
    aAddress: {
        type: String,
        require: true,
    },
    aPhoneNumber: {
        type: String,
        require: true,
    },
    Member: {
        type: String,
        require: true,
    },
    userId: {
        type: String,
        required: true
    }

    
},
{timestamps:true
    
}
)

module.exports = mongoose.model('AddFamily', addFamilySchema)