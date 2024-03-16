const fs = require('fs');
const path = require('path');
const multer = require('multer')
const upload_img = require('express').Router();
const user_db = require('../model/User-model');
const guide_db = require('../model/Guide-Model');

//create dir to store image file
const create_dir=async(username,type,uploadtype)=>{
    let dir = path.dirname(__dirname);
    let dir_name =path.join(dir,"assets",type,username,uploadtype);
    if(!fs.existsSync(dir_name))
    {
        fs.mkdirSync(dir_name,{recursive:true});
        return dir_name;
    }
    return dir_name;
}

//handle user upload image
const userprofile = multer.diskStorage({
    destination:async(req,file,cb) => {
        const {username} = req.params;
        let dir_name = await create_dir(username,"user","profile_pic");
        cb(null,dir_name);
    }, 
    filename:(req,file,cb)=>{
         cb(null,Date.now() +  req.params.username + file.originalname)
    }
})

const upload_user_profile = multer({storage:userprofile});


//upload user profile
upload_img.post('/user/profile/:username',upload_user_profile.single('profile_img'),
                async (req,res) => {
                        const {username} = req.params;
                        console.log(req.file.filename);
                       try{
                            let  update = await user_db.updateOne(
                                {username:username},
                                {
                                $set:{
                                    profile_pic:req.file.filename
                                }
                                }
                        )
                        res.send({
                            status:'success',
                            update,
                        })
                       }
                       catch(err)
                       {
                        res.send(err);
                       }
                 })



//handle guide upload profile image
const guideprofile = multer.diskStorage({
    destination:async(req,file,cb) => {
          const {username} = req.params;
          let dir_name = await create_dir(username,"guide","profile_pic");
          cb(null,dir_name)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() +  req.params.username + file.originalname);
    }
})

const upload_guide_profile = multer({storage:guideprofile});

upload_img.post('/guide/profile/:username',upload_guide_profile.single('profile_img'),
    async(req,res) => {
        const {username} = req.params;
        try{
             let update = await guide_db.updateOne(
                {username:username},
                {
                    $set:{
                        profile_pic:req.file.filename
                    }
                    }
             )
             res.send({
                status:'success',
                update,
            })
        }
        catch(err)
        {
         res.send(err);
         
        }

})



//upload mutiple image for guide
const post_guide = multer.diskStorage({

    destination:async (req,file,cb)=>{
        try{
            let data = 5
            let typename = () => {
                  return file.fieldname === 'posts-img' ? 'detail_img' : 'experinceImg';
            }
            
            let dir = await create_dir(req.params.usr_id,"guide",`${typename()}`);
            
            cb(null,dir);
        }
        catch(err){
            console.log(err);
            return;
        }
    },
    filename:(req,file,cb)=>{
          try{
            cb(null,Date.now() + req.params.usr_id +file.originalname);
          }
          catch(err){
            console.log(err);
            return;
          }
    }
})

const upload_post_guide = multer({storage:post_guide})



upload_img.post('/guide/post/:usr_id',upload_post_guide.array('posts-img',5),async(req,res) => {
     
       //update image to database
    try{
        const photos = req.files.map(file => file.filename);
        console.log(photos);
        return res.send({status:'ok',msg:'image uploaded',photos:photos,usr_id:req.params.usr_id})
        // return res.send({status:'ok',msg:'image uploaded',photos:photos,usr_id:req.params.usr_id})
    }
    catch(err){
        return res.send({status:'error',err})
    }
       
})



//upload verify_guide
const guide_verity = multer.diskStorage({
    destination:async(req,file,cb) => {
        try{
            const {username} = req.params;
            let dir_name = await create_dir(username,"guide","verify_info");
            cb(null,dir_name)
        }
        catch(err){

        }
       
  },
  filename:(req,file,cb)=>{
      cb(null,Date.now() +  req.params.username + file.originalname);
  }   
})

const upload_guide_verify = multer({storage:guide_verity});

upload_img.post('/guide/verify/:username',upload_guide_verify.single('verify_img'),
     async (req,res) => {

        const {username} = req.params;
        try{
            
            let update_verify = await guide_db.updateOne(
                {username:username},
                {$set:{
                    verify_guide:{
                        verify_pic:req.file.filename
                    }
                }}
            )
             res.send({
                status:'success',
                update_verify,
            })
        }
        catch(err)
        {
         res.send(err);
         
        }
       

})




upload_img.get('/',(req,res) =>{
    res.send('ok kub upload')
})



module.exports = {
    upload_img,
    create_dir
};






