const User = require('express').Router();
const {MongoClient} = require('mongodb')
require('dotenv').config({path:'../.env'})
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const client = new MongoClient(process.env.CONNECT_STRING_POND);


User.get('/',(req,res) => {
    res.send('ok ken ok ken oken ')
})

//login
User.post('/login',(req,res) => {
    res.send('ok ken ok ken oken ')
})

//regsiter
User.post('/regsiter',async(req,res) => {
    const {Username,password,email} = req.body;

    bcrypt.hash(password,bcrypt.genSalt(10),(err,hash) => {
         if(err){
            res.send('error');
         }

         
    })
})


module.exports = User;