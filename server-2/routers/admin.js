const admin = require('express').Router();
const userdb = require('../model/User-model')
const verfiyG = require('../model/Verify_Guide-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path')
const {Reg_Guide_mail} = require('../mail/sendmail')
const fs = require('fs')

admin.get('/test', (req,res) => {
    return res.send('ok')
})

admin.post('/login',async (req,res) => {
     
    const {user} = req.body;

    let userr = await userdb.findOne({username:user.username});

    if(!userr || !userr.admin ){
        return res.send('ไม่พบผู้ใช้')
    }

    bcrypt.compare(user.password,userr.password,(err,correct) => {
          if(err){
            console.log(err);
            return res.send(err)
          }

          if(correct){
            let token = jwt.sign({ username:user.username }, process.env.ADMIN);
            return res.json({
                status:"success",
                usr_id:userr._id,
                admin:userr.admin,
                token:token
            })
          }else{
             return res.json({
                 msg:'username or password incorrect'
             })
          }
    })
})

admin.post('/verify',async (req,res) => {
    let tokenMEbearer =  req.headers.authorization
    let token = tokenMEbearer.split(' ')[1];
    console.log(req.body);
    jwt.verify(token, process.env.ADMIN, (err, result) => {
        if(err){
          return res.send({
              status:"error",
              err
          })
        }
        return res.send({
          status:'success',
          result,
          usr_id:req.body.usr_id,
          admin:req.body.admin,
          token:token
        })
    });
 
})


admin.get('/listregisguide', async (req,res) => {
      try{
            let dataregis = await verfiyG.find({});
            if(dataregis.length === 0)return console.log('nodata');

            //remove unuse img
            fs.readdir('./assets/verify_guide/',(err,dir) => {
                dir.forEach(dirname => {
                  let ispathexist = dataregis.find(data => data.id_user === dirname);
                  if(!ispathexist){
                    try {
                      fs.rmdirSync(`./assets/verify_guide/${dirname}`, { recursive: true });
                      console.log(`${path} ลบเเล้ว`);
                    } catch (err) {
                      console.error(`ลบไม่ได้ ${err}`);
                    }
                  }
                })
      
            })

            return res.json(dataregis);
      }
      catch(err){
        console.log(err);
         return res.send(err);
      }
})

//delete reg guide
admin.delete('/listregisguide/delete/:id/:id_user/:email', async (req,res) => {
     const {id,id_user} = req.params;
     try{
        let deleted = await verfiyG.findByIdAndDelete(id);
        
        await Reg_Guide_mail(req.params.email,'reject')
  
        return res.send({status:'ok',deleted});

     }
     catch(err){
        console.log(err);
        return res.send({status:'error',err})
     }
})

//get image
admin.get('/listregisguide/image/:id/:imgname',async (req,res) => {
      try{
            const {id,imgname} = req.params;
            let dir = path.dirname(__dirname);
            let filename = path.join(dir,"assets","verify_guide",id,"verify_img",imgname);
            console.log(filename);
            if(!fs.existsSync(filename)){
                console.log('no file found at adminreview');
                return res.status(404).send('error');
            }

            return res.sendFile(filename);
      }
      catch(err){
        console.log(err);
        return res.send(err);
      }
})
//reject guide
admin.put('/listregisguide/reject',async (req,res) => {
    
})


admin.get('/test/2.0',(req,res) => {
  return res.send('2.0');
})







module.exports = admin;