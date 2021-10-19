 const express = require('express')
 const router =  new express.Router()
 const profile = require('../models/profile.js')
 const Question = require('../models/question')
 router.use(express.json())
 require('../db/mongoose')
 const exam = require('../models/exams.js')

router.post('/exam', (req, res) => {
    
   
    exam.findOneAndUpdate({ is_deleted : false , exam_name : req.body.Exam_name},{$set : {is_deleted : true}},{ new: true } ,(err, user) => {
        
        res.redirect('/exam')
    })
    
})

router.post('/abc', (req, res) => {
    console.log( req.body.S_name)
    console.log( req.body.status)
    
    exam.findOneAndUpdate({  exam_name : req.body.S_name},{$set : {exam_status : req.body.status}},{ new: true } ,(err, user) => {
        
        res.redirect('/exam')
    })
})
// router.post('/view-questions', (req, res) => {
    
//     console.log(req.body.E_name)
    
//     Question.find({  exam_name : req.body.E_name},(err, qus) => {
        
//         res.render('view-questions', qus)
//     })
// })
router.get('/Test1',(req, res) => {
res.render('mcq-front.ejs')
})
     

router.get('/StudentExam',(req, res) => {
    res.render('Student-exam.ejs')
    })

    router.get('/MCQ',(req, res) => {
        res.render('MCQ.ejs')
        })
               

 module.exports = router