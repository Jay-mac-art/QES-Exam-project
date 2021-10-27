const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Types.ObjectId,
        

    },
    exam_name: {
        type: String,
        unique: true,
        required: true,
        
    },
    exam_status: {
        type: Boolean,
        required: true,
        default : true
        
        
    },
    is_deleted : {
        type: Boolean,
        required: true,
        default : false
    },
    created_date : {
        type: Date,
        default : Date.now

    },
    exam_date: {
        type: String,
        required: true,
        
        
    }
}, {
    timestamps: true
})

const exam = mongoose.model('exams', examSchema)

module.exports = exam