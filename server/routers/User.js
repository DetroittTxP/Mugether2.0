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


    bcrypt.hash(password,10,async(err,hash) => {
         if(err){
            return res.send(err);
         }

         await client.connect();

         let inserted = await client.db(process.env.DATABASE)
                        .collection(process.env.USER)
                        .insertOne({
                            username:username,
                            password:hash,
                            email:email
                        })

      return  res.send(inserted)

    })
})


module.exports = User;