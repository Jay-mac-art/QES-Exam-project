const express = require('express')
const profile = require('./models/profile.js')
const Question = require('./models/question.js')
const exam = require('./models/exams.js')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose')

const app = express()
const ejs = require('ejs')
const bcrypt = require('bcrypt')
require('dotenv/config')
require('./db/mongoose')
const md5 = require('crypto-md5');
const otpGenerator = require('otp-generator')
const path = require('path')
const { sendOtpMail, otp } = require('./email/account')
const bodyParser = require('body-parser')
const router = require('./routers/profiles')

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log(path.join(__dirname, '../public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '../views'))


app.set('views engine', 'ejs')
app.use(session({
    secret: ' my secret key',
    resave: false,
    saveUninitialized: false
}))




app.get('/', async (req, res) => {
    res.render('login.ejs')

})
app.post('/', (req, res) => {


    profile.findOne({ email: req.body.email, password: '@'+md5(req.body.password) }, (error, user) => {
        console.log(user)
        if (user == null) {
            console.log('user not in database')
            res.send("User not exists").status(201)
        }
        else if (user.admin == true) {
            req.session.userId = user._id;
            req.session.userType = "Admin";
            console.log("session", req.session)
            if (req.session.userId) {
                res.redirect('/dashboard')
            } else {
                res.redirect('/');
            }

        }
        else {
            req.session.userId = user._id;
            req.session.userType = "Student";
            if (req.session.userId) {
                res.redirect('/student-dashboard')
            } else {
                res.redirect('/');
            }

        }
    })

})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {

    const user = new profile({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        password: '@'+md5(req.body.password)
    })
    const cnfpass = req.body.cnfpass
    if (cnfpass === req.body.password) {

        user.save().then(() => {

            res.redirect('/')

        }).catch((e) => {
            console.log(e)
            res.send(e)

        })
    }
    else {
        res.send("password and confirm password should be same")
    }

})

app.post('/profile', (req, res) => {

    const cnfpass = req.body.cnfpassword
    profile.findOneAndUpdate({ email: req.body.email }, { $set: { name: req.body.name, password: req.body.password, name: req.body.name, mobile: req.body.mobile, address: req.body.address, } }, { new: true }, (err, user) => {
        if (err) { throw new Error(err) }
        else {
            console.log("Updated");
        }

        if (cnfpass === req.body.password) {

            if (user.admin == true) {
                res.redirect('/dashboard')
            }
            else {
                res.redirect('/student-dashboard')
            }

        }
        else {
            res.send("password and confirm password should be same")
        }

    });


})

app.post('/questions', (req, res) => {
    console.log(req.body.Eid,"hjk")  
    const qus = new Question({
        question: req.body.question,
        option_1: req.body.option1,
        option_2: req.body.option2,
        option_3: req.body.option3,
        option_4: req.body.option4,
        answer: req.body.answer,
        No :  req.body.No,
        exam_id : mongoose.Types.ObjectId(req.body.Eid)

        
      
    })

    qus.save().then(() => {
    
     res.redirect('/view-questions?Eid='+req.body.Eid)

    }).catch((e) => {
        console.log(e)
        res.send(e)

    })
    

})

app.get('/dashboard', (req, res) => {
    if (req.session.userId) {
        res.render('dashbord.ejs')
    } else {
        res.redirect('/');
    }
})
app.get('/profile', (req, res) => {
    if (req.session.userId) {
        res.render('profile.ejs')
    } else {
        res.redirect('/');
    }

})
app.get('/student-dashboard', (req, res) => {
    if (req.session.userId) {
        res.render('student-dashboard.ejs')
    } else {
        res.redirect('/');
    }

})
app.get('/students', (req, res) => {
    if (req.session.userId) {
        profile.find({ admin: false }, (error, user) => {


            res.render('Students.ejs', { userlist: user })


        })
    } else {
        res.redirect('/');
    }



})


app.get('/otp', (req, res) => {
    res.render('otp.ejs')

})
app.get('/forgot', (req, res) => {
    res.render('forgot.ejs')
})

app.get('/exam', (req, res) => {
    if (req.session.userId) {
        exam.find({ is_deleted: false }, (error, exam) => {

            res.render('create-exam.ejs', { examlist: exam })
        })
    } else {
        res.redirect('/');
    }

})
app.get('/new_exam', (req, res) => {
    if (req.session.userId) {
        res.render('create-new-exam.ejs')
    } else {
        res.redirect('/');
    }


})
 app.get('/questions', (req, res) => {
    console.log(req.query.Eid)
     if (req.session.userId) {
         res.render('create-questions.ejs', {Eid : req.query.Eid})
     } else {
         res.redirect('/');
     }

 })
app.get('/test', async (req, res) => {
   // if (req.session.userId) {


        Question.find({ is_deleted: false }, (err, qus) => {
           
            console.log(qus[1],"gfsg")
           
           
           var answer = []
           qus.forEach(element => {
               answer.push(element.answer)
           });
           console.log(answer,"dghg")
            res.render('index.ejs', {quslist : qus,answer})
            if (err) {
                res.send(err)
            }
           
            
        })

   // } else {
     //   res.redirect('/');
   // }

})
// app.post('/test', (req, res) => {
//     if (req.session.userId) {
//         Question.find({}, (error, qus) => {

//             console.log(qus)
//             res.render('index.ejs', qus)

//         })
//     } else {
//         res.redirect('/');
//     }


//})
app.get('/edit-question', (req, res) => {
    if (req.session.userId) {
        res.render('edit-questions.ejs')
    } else {
        res.redirect('/');
    }

})
app.get('/view-questions', (req, res) => {
    if (req.session.userId) {
        console.log(req.query.Eid,"gugk")
        
            if(req.query.E_name){
                exam.findOne({exam_name : req.query.E_name}, (err, E) => {
                    Question.find({ is_deleted: false , exam_id : E._id}, (err, qus) => {
                    res.render('view-all-question.ejs', {quslist : qus, Eid : E._id})
                      
                })
                })
            }
            if(req.query.Eid)
            {
        Question.find({ is_deleted: false , exam_id : req.query.Eid}, (err, qus) => {
            res.render('view-all-question.ejs', {quslist : qus, Eid : req.query.Eid})
          
    })
}
}
       
    else {
        res.redirect('/');
    }

})

app.post('/forgot', async (req, res) => {

    let email = req.body.email;
    console.log("vszwa", email)
    const user = await profile.findOne({ email: email })

    if (!user) {
        sendOtpMail(email, otp)
        res.redirect('/otp?email=' + email)

    }


})

app.post('/new_exam', (req, res) => {

    if (req.session.userId) {
        const Exam = new exam({
            exam_name: req.body.name,
            
            exam_date: req.body.date.toString(),

            user_id : req.session.userId

        })
        Exam.save().then(() => {

            res.redirect('/exam')

        }).catch((e) => {
            console.log(e)
            res.send(e)

        })
    } else {
        res.redirect('/');
    }


})

app.post('/otp', (req, res) => {
    profile.findOne({ email: req.body.user - email }, (err, user) => {
        res.send(user)
    })
})
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })


})




app.get('/StudentExam', (req, res) => {
    //if (req.session.userId) {
        exam.find({ is_deleted: false , exam_status : true }, (error, exam) => {

            res.render('Student-exam.ejs', { examlist: exam })
        })
    //} else {
      //  res.redirect('/');
   // }

})
app.use(router)
app.listen(port, () => {
    console.log(`Port is set on  ${port} `)
})