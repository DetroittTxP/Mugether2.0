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
User.post('/register',async(req,res) => {
    const {username,password,email} = req.body;
   


    bcrypt.hash(password,13,async(err,hash) => {
         if(err){
            return res.send(err);
         }

      return  res.send({
            username:username,
            plain:password,
            password:hash
        })

    })
})


module.exports = User;