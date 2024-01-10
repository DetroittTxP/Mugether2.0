const fs = require('fs');
const path = require('path');
const multer = require('multer')
const upload_img = require('express').Router();
const user_db = require('../model/User-model');

//create dir to store image file
const create_dir=async(username,type)=>{
    let dir = path.dirname(__dirname);
    let dir_name =path.join(dir,"assets",type,username,"profile_pic");
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
        let dir_name = await create_dir(username,"user");
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






