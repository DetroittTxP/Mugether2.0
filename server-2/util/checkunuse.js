const fs = require('fs');
const path =require('path');
const guide_db = require('../model/Guide_detail-Model');
require('dotenv').config({path:'../.env'});


const mongoose = require('mongoose');

mongoose.connect(process.env.CON_STR)
.then(() => console.log('db connected at checkuse'))
.catch(err => console.log(err,' at check use'))

const query_guide_image = async (id_user)=>{
    try{
        let data = await guide_db.findOne({id_guide:id_user}).select('guide_post');
        let allphoto = data.guide_post.flatMap(data => data.postPhotos);

        return allphoto;
    }
    catch(err){
        return console.log(err);
      
    }
}


const checkunuse_guide=async(id_user)=>{
    const image_in_db = await query_guide_image(id_user);
    try{
        let dir = path.dirname(__dirname);
        let imgpath = path.join(dir,"assets","guide",id_user,"detail_img")

        fs.readdir(imgpath,(err,files) => {
              if(err){
                console.log(err);
                return;
              }

              
              files.forEach(image => {
                    if(!image_in_db.includes(image)){
                          let imagefile = path.join(imgpath,image);
                          fs.unlink(imagefile,(err) => {
                              if(err){
                                  console.log("error from delete" , err);
                              }
                              
                          })
                    }
              })
        })

        return {
            status:'sucees'
        }
     
    }  
    catch(err){
        console.log(err);
        
        return{
            status:'error',
            err
        }
    }    
}




module.exports = {
    checkunuse_guide
}