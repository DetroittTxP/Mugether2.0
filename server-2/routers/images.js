const fs = require('fs');
const path = require('path');
const img = require('express').Router();
const user = require('../model/User-model');
const guide = require('../model/Guide-Model')
const multer = require('multer')



//image of muplace
img.get('/mu/:place_name/:id',async (req,res) => {
     try{
        const {place_name,id} = req.params;
        let photo_dir = path.dirname(__dirname)

        let photo_file = path.join(photo_dir,"assets","photofile","MuPlace",place_name,`${place_name}${id}.jpg`)

        if(!fs.existsSync(photo_file))
        {
            return res.send('no photo found')
        }
        else{
            return res.sendFile(photo_file)
        }
    
     }
     catch(err){
         return res.send(err)
     }
})

//image of nearbyplace
img.get('/nearby/:type/:name/:id',(req,res) => {
    const {id,type,name} = req.params;

    try{

        let dir_ = path.dirname(__dirname);
        let imagesFile = path.join(dir_,"assets","photofile","Nearby",type,name,`${name}${id}.jpg`);
        if(!fs.existsSync(imagesFile)){
            return res.send('no NEARBY images found')
         } 
        return res.sendFile(imagesFile)

    }
    catch(err){
        return res.send(err)
    }
})

//image of user
img.get('/user/profile/:username',async(req,res) => {
    const {username} = req.params;

    try{
        let userdata =  await user.findOne({username:username});
        const {profile_pic} = userdata;
        let dir_ = path.dirname(__dirname);
        let imagesFile = path.join(dir_,"assets","user",profile_pic);
        return res.sendFile(imagesFile)
    }
    catch(err){
        return res.send(err)
    }
})

//image of guide_detail
img.get('/guide/detail/:username/:imgname', async (req,res) => {
    const {username,imgname} = req.params;
    
    try{
        let dir_ = path.dirname(__dirname);
        let imagesFile = path.join(dir_,"assets","guide",username,"detail_img",imgname);
        res.sendFile(imagesFile)
    }
    catch(err)
    {
        console.log(err);
    }

})




module.exports = img;
