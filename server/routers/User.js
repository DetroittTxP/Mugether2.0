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
User.post('/login', async (req,res) => {
    const {username,password} = req.body;
    try{
        await client.connect();
        let userInfo = await client.db(process.env.DATABASE)
                       .collection(process.env.USER)
                       .find({username:username})
                       .toArray();
        await client.close();

        if(userInfo.length === 0){
            return res.send({status:"mai me user "})
        }

        bcrypt.compare(password,userInfo[0].password,(err,Login) => {
                
                if(err){
                    return res.send(err);
                }


                if(Login){
                    let token = jwt.sign({name:username},process.env.SECRET_ACCESS);
                    return res.send({status:'success',token:token})
                } 
                return res.send('failed')
        })
    }
    catch(err){
        return res.send(err)
    }
})

User.get('/verifytoken',(req,res) => {
     let token =  req.headers.authorization.split(' ')[1];
    
     jwt.verify(token,process.env.SECRET_ACCESS,(err,decoded) => {
          if(err){
            return res.send(err);
          }

          return res.send({
               status:'ok',
               username:decoded.name
          })
     })

     return;
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