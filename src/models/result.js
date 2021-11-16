const mongoose = require('mongoose')

const resultschema  = new mongoose.Schema({
    num : {
        type: Number,
        default : null
        

    },
    exam_name: {
        type: String,
        unique: true,
        required: true,
        
    },
    exam_id: {
        type: mongoose.Types.ObjectId 
    },
    user_id : {
        type : mongoose.Types.ObjectId
    },
}, {
    timestamps: true
})

const result = mongoose.model('result', resultschema)

module.exports = result