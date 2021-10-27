const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
   
    No : { 
        type: Number, 
        default: 0 
    },
    exam_name : {
        type : String
        
    },

    question : {
        type: String,
        required: true,
        
    },
    option_1 : {
        type: String,
        required: true,
    },
    option_2 : {
        type: String,
        required: true,
    },
    option_3 : {
        type: String,
        required: true,
    },
    option_4 : {
        type: String,
        required: true,
    },
    answer : {
        type: String,
        required: true,
    },
    is_deleted : {
        type: Boolean,
        required: true,
        default : false

    },
   
    question_status : {
        type: Boolean,
        required: true,
        default : true

    }
}, {
    timestamps: true
})

const Question = mongoose.model('questions', questionSchema)


module.exports = Question