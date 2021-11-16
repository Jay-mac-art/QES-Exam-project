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

   // router.get('/MCQ',(req, res) => {
     //   res.render('MCQ.ejs')
      //  })
               
      router.post('/del', (req, res) => {
    
      console.log(req.body.Eid,"hey")
        
        Question.findOneAndUpdate({ is_deleted : false , No : req.body.del , exam_id : req.body.Eid},{$set : {is_deleted : true}},{ new: true } ,(err, user) => {
            
            res.redirect('/view-questions?Eid='+req.body.Eid)
        })
        
    })
    
    router.post('/edit-question', (req, res) => {
       
        
     
        Question.findOneAndUpdate({  No : req.body.No , is_deleted : false, exam_id : req.query.Eid },{$set : {question : req.body.question , answer : req.body.answer , option_1 : req.body.option1 , option_2 : req.body.option2 , option_3 : req.body.option3, option_4 : req.body.option4 }},{ new: true } ,(err, user) => {
         
            res.redirect('/view-questions?Eid='+req.query.Eid)
        })
     })
     
     
     
   //  router.get("/result", (req, res) => {
    //     res.render('mcq.ejs')
    // })
     
 module.exports = router