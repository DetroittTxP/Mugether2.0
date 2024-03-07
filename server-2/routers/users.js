const user = require('../model/User-model');
const usr = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Reg_User_mail} = require('../mail/sendmail')
usr.get('/',(req,res) => {
    res.send('ok')
})



usr.post('/login', async (req,res) => {
    const {username,password} = req.body;
    try{
        let user_data = await user.find({username:username});

        if(user_data.length == 0)
        {
            return res.send({
                status:"error",
                message:'user not found'
            })
        }

        bcrypt.compare(password, user_data[0].password, (err, result) => {
             if(result)
             {
                let token = jwt.sign({ username:username }, process.env.SECRET_KEY,)
                return res.send({
                    status:"success",
                    usr_id:user_data[0]._id,
                    guide:user_data[0].guide,
                    shop:user_data[0].shop,
                    token:token
                });
             }
             else
             {
                return res.send({
                    status:"error",
                    message:'error wrond password'
                })
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
          if(err){
            return res.send({
                status:"error",
                err
            })
          }

          return res.send({
            status:'success',
            result,
            userID:req.body.usr_id,
            guide:req.body.guide,
            shop:req.body.shop,
            token:token
          })
      });
   
})


usr.post('/register', async (req,res) => {
     const {username,password,email} = req.body;
    
     try{

        //เช็คชื่อซ้ำ
        let usr = await user.find( {$or:[{username:username},{email:email}]});

        if(usr.length !== 0)
        {
            console.log(usr);
            return res.send({
                status:"error",
                message:"มีชื่อซ้ำกัน"
            });
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

            await Reg_User_mail(email);
            return res.send({
                status:"success",
                insert_usr
            });


        });
     }
     catch(err)
     {
        return res.send(err);
     }
})

usr.put('/update/profile/',async (req,res) => {
     const {editdata} = req.body
     let filter = editdata.username
    
    try{
        let updatedata= await user.findOneAndUpdate({username:filter},editdata)
        
    }
    catch(err)
    {
        console.log(err);return;
    }
     
     
     res.json(editdata)
     
})

usr.post('/add/favorite', async (req,res) =>{
    const {id,username,favorite_item,status} = req.body;

 
    try{
     


        // let update_item = await user.updateOne({username:username} 
        //     ,{$push:{favorite_muplace:favorite_item}}
        //     )
            console.log(req.body.favorite_item);
           let update_item = await user.findByIdAndUpdate({_id:id} 
            ,{favorite_muplace:favorite_item}
            )



       return res.send({status:'ok',update_item})     


    
    }
    catch(err)
    {
        return res.send(err);
    }




})

//get fav
usr.get('/fav/:id',async (req,res) => {
    
     try{
          const userID = req.params.id

          let fav_data = await user.findOne({_id:userID}).select('favorite_muplace');
   ;
            return res.json(fav_data);
            
     }
     catch(err){
        return res.send({status:'error',err})
     }
})



module.exports = usr;