const mongoose = require('mongoose')
const validator = require('validator')
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        minlength: 10,
        
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        validate(value) {
            if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                throw new Error('Password should be the combination of one uppercase letter, one lowercase letter and a special symbol. Minimum length of this field must be equal or greater than 8 symbols')
            }
            
        }
    },
    admin : {
        type : Boolean,
        default : false
        
    },
    result : {
        type : String,
        default : null
    },
    address: {
        type: String,
        unique: true,
        required: true,

    },
}, {
    timestamps: true
})

const profile = mongoose.model('profile', profileSchema)

module.exports = profile