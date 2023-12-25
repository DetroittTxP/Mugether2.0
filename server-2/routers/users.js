const user = require('../model/User-model');
const usr = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

usr.get('/',(req,res) => {
    res.send('ok')
})



usr.post('/login', async (req,res) => {
    const {username,password} = req.body;
    try{
        let user_data = await user.find({username:username});

        if(user_data.length == 0)
        {
            return res.send('user not found')
        }

        bcrypt.compare(password, user_data[0].password, (err, result) => {
             if(result)
             {
                let token = jwt.sign({ username:username }, process.env.SECRET_KEY);
                return res.send(token);
             }
             else
             {
                return res.send('error wrond password')
             }
        });

    }
    catch(err)
    {
        res.send(err)
    }
})



usr.post('/verify',(req,res) => {
    let tokenMEbearer =  req.headers.authorization
    let token = tokenMEbearer.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
           return res.send(result);
      });
    return res.send(token);
})

usr.post('/register', async (req,res) => {
     const {username,password,email} = req.body;
    
     try{

        //เช็คชื่อซ้ำ
        let usr = await user.find( {$or:[{username:username},{email:email}]});

        if(usr.length !== 0)
        {
            return res.send('มีชื่อซ้ำกัน');
        }

        //เข้ารหัส password
        bcrypt.hash(password, 10 , async (err, hash) => {

            if(err)
            {
                return res.send(err);
            }

            let insert_usr = await user.create({
                username:username,
                password:hash,
                email:email
            })

            return res.send(insert_usr);
        });
     }
     catch(err)
     {
        return res.send(err);
     }
})





module.exports = usr;