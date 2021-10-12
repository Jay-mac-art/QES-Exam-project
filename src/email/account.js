const sgMail = require('@sendgrid/mail')
const profile = require('../models/profile.js')
const  otpGenerator = require('otp-generator')

sgMail.setApiKey("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")
const otp = otpGenerator.generate(6)
const sendOtpMail = (email,otp) =>
{
    
sgMail.send({
    to : email,
    from : 'jayantk7722@gmail.com',
    subject : 'Password Recovery Mail',
    text : `Welcome User , Your Password Recovery OTP is ${otp} `

})
}
sendOtpMail('jayantk7722@gmail.com',otp)
module.exports = {
    sendOtpMail,
    
   
}

