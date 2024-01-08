const guide = require('express').Router();
const gide = require('../model/Guide-Model');
const bcrypt = require('bcrypt')


guide.get('/test',(req,res) => {
    res.send('ok guide')
})


const hash_password = (text_password) => bcrypt.hashSync(text_password,10);
   

//register
guide.post('/register', async (req,res) => {
    const {
        username,
        password,
        firstname,
        lastname,
        email,
        mu_location,
        detail,
        type
    } = req.body; 

try{
    let inserted = await gide.create({
        username:username,
        password:hash_password(password),
        firstname,
        lastname,
        email,
        mu_location,
        detail,
        type
   })


   return res.send({status:"success",inserted});
}
catch(err)
{
    console.log(err);
    return res.send({
        status:"error",
        err
    });
}
})

//login
guide.post('/login',async (req,res) => {
       const {username,password} = req.body;


       try{

          let check_usr = await gide.findOne({username:username});
          let check_pass = bcrypt.compareSync(password,check_usr.password);

          if(!check_usr)
          {
             res.send("error no data")
          }

          if(check_pass)
          {
              res.send('pass ok')
          }
          else{
            res.send('incorrect')
          }
          


       }
       catch(err)
       {
         console.log(err);
         res.send({
            status:"error",
            err
         })
       }
})

//update img // update img for guide
guide.post('/update/img/guide',(req,res) => {

})

//getguide //listguide for listguide page
guide.get('/list-guide', async (req,res) => {
     try{
        let data = await gide.find({}).select('firstname lastname profile_pic username')
        res.send(data);
     }
     catch(err)
     {
        console.log(err);
        res.send(err)
     }
})

//detail-guide for guidepage
guide.get('/detail-guide/:username', async (req,res) => {
    const {username} = req.params;

    try{
        let data = await gide.find({username:username}).select('-username -password')
        res.send(data)
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
})

//review_guiide
//


module.exports = guide;