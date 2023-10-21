const Uploadimage = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {MongoClient} = require('mongodb')
require('dotenv').config({path:'../.env'})

const client = new MongoClient(process.env.CONNECT_STRING_POND)

const checkfolder = (foldername, foldertype) => {
    let dir = path.dirname(__dirname);
    let directory = path.join(dir, "photofile", foldertype, foldername);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}

const storageUserProfile= multer.diskStorage({
    destination: (req, file, cb) => {
       console.log(req.params.username);
        checkfolder(req.params.username,'User')
        cb(null,  `./photofile/User/${req.params.username}`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const uploadUserProfile= multer({ storage:storageUserProfile});


Uploadimage.post('/profile/user/:username', uploadUserProfile.single('image'), async (req, res) => {

    try{
        await client.connect();
        let InsertPICNAME = await client.db(process.env.DATABASE)
                                  .collection(process.env.USER)
                                  .updateOne(
                                    {username:req.params.username},
                                    {
                                        $set:{
                                            profile_pic_name:req.file.filename
                                        }
                                    }
                                  )

        return res.send({
            status:"insert pic leaw",
            InsertPICNAME,
        })                          
    }
    catch(err){
       return   res.send(err)
    }
  
});

module.exports = Uploadimage;

