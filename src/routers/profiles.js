 const express = require('express')
 const router =  new express.Router()
 const profile = require('../models/profile.js')
 const Question = require('../models/question')
 router.use(express.json())
 require('../db/mongoose')
 router.post('/user/register' , (req,res)=> {
     const user = new Question(req.body )
     user.save().then(()=>{
        res.send(user)
     }).catch((e)=>{
         console.log(e)
        res.status(400).send(e)
     })
    })

    router.get('/', async (req,res) => {
   
    
        const user = await profile.findOne({email : req.body.email,  password : req.body.password})
        if(!user)
        {
            throw new Error("User not exists")
        }
        else{
            res.redirect('/dashboard')
        }
        
})
     
    

 module.exports = router