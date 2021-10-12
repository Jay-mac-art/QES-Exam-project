const mongoose = require('mongoose')
const db = require('mongodb')
mongoose.connect('mongodb://127.0.0.1:27017/profile-api',
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false})