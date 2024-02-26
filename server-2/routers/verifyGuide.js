const verify_g = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const db_verfiy_guide = require('../model/Verify_Guide-model')
const {create_dir} = require('./uploadimages');

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
        let filter = {_id:req.params.id}
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
     const {firstName,lastName,id_card,id_guide,mu_place} = req.body.guide;
    
    try{
   
        let insert = await db_verfiy_guide.create({
            firstname:firstName,
            lastname:lastName,
            id_card:id_card,
            id_guide:id_guide,
            mu_place:mu_place
        })

        return res.json({status:'success',msg:insert});
    }
    catch(err)
    {
        return res.json({status:'error',msg:err})
    }
})


module.exports = verify_g;