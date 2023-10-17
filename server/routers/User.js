const User = require('express').Router();
const {MongoClient} = require('mongodb')
require('dotenv').config({path:'../.env'})



User.get('/',(req,res) => {
    res.send('ok ken ok ken oken ')
})


User.get('/register',(req,res) => {
    res.send('ok ken ok ken oken ')
})


User.get('/login',(req,res) => {
    res.send('ok ken ok ken oken ')
})


module.exports = User;