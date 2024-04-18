const verify_g = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const db_verfiy_guide = require('../model/Verify_Guide-model')
const {create_dir} = require('./uploadimages');
const {Reg_Guide_Mail} = require('../mail/sendmail')
const usdb = require('../model/User-model')

verify_g.get('/',(req,res) => {
    res.send('test22');
})


const image_verify_guide = multer.diskStorage({
    destination:async(req,file,cb)=>{
        let dir = await create_dir(req.params.id,"verify_guide","verify_img")
   
        cb(null,dir)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }

})

const upload_verify_guide = multer({storage:image_verify_guide})

verify_g.post('/img/:id',upload_verify_guide.single('img-guide'),async(req,res) => {
    
    console.log(req.file.filename);
    try{
        let filter = {id_user:req.params.id}
        let data = {image_guide:req.file.filename};

        let updateimg =await db_verfiy_guide.findOneAndUpdate(filter,data);
 
        return res.send({status:'sucess',updateimg})
    }
    catch(err)
    {
        return res.send({status:'error',msg:err})
    }
})



//get_guide INFO
verify_g.post('/info', async (req,res) => {
     const {firstName,lastName,id_card,id_guide,mu_place,userID,tel,email,lineID,guide_type,contact} = req.body.guide;
    
    try{
   
        let querycheck = {
            $or:[
                {id_user:userID},
                {email:email}
            ]
        }
        let isExist = await db_verfiy_guide.findOne(querycheck)
        console.log('5555',isExist);
        if(isExist){
            return res.send({status:'duplicate'})
        }
        else{
            let insert = await db_verfiy_guide.create({
                id_user:userID,
                firstname:firstName,
                lastname:lastName,
                id_card:id_card,
                id_guide:id_guide,
                mu_place:mu_place,
                tel:tel,
                email:req.body.guide.email,
                contact:contact,
                guide_type:guide_type
            })
            console.log(insert);
            let sendemail = await usdb.findOne({_id:userID}).select('email');
            const {email} = sendemail;
            
            await Reg_Guide_Mail(email)
    
            return res.json({status:'success',msg:insert});
        }
    }
    catch(err)
    {   
        console.log(err);
        return res.json({status:'errorhaha',msg:err})
    }
})



module.exports = verify_g;