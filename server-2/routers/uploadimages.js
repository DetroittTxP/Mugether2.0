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










upload_img.get('/',(req,res) =>{
    res.send('ok kub upload')
})



// let filep = path.dirname(__dirname);

// let fi = path.join(filep,"assets","guide","test");
// console.log(fi);
// fs.mkdir(fi,{recursive:true}, (err) => { 
//     if (err) { 
//         return console.error(err); 
//     } 
//     console.log('Directory created successfully!'); 
// }); 
// console.log(filep);


module.exports = upload_img;






