var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    middleInitial: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
        default: 'homeowners'
    },
    photoUrlProfile:{
        type: String,
    },
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    familyField: {
        type: Array,
        default: []
        },
    petField: {
        type: Array,
        default: []
        },
        
    carField: {
        type: Array,
        default: []
    },
    paymentField:{
        type: Array,
        default:[]
    },
    reservationField:{
        type: Array,
        default:[]
    }, 
    status : {
        type: String,
        default: "Pending"
    },
    isActive: {
        type: String,
        default:"logout"
    },
    resetLink:{
        type: String,
        default:''
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    

},
{timestamps:true
    
}
)

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)
