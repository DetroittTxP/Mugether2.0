const Guide_detail = require('express').Router();
const Guide_detail_Model = require('../model/Guide_detail-Model');
const user = require('../model/User-model')
const multer = require('multer');
const {create_dir} = require('./uploadimages')
const fs = require('fs')
const dbusr = require('../model/User-model')
const path = require('path')
const {checkunuse_guide } = require('../util/checkunuse')
const db = Guide_detail_Model;

Guide_detail.get('/',(req,res) => {
     res.send('ok')
})


Guide_detail.post('/create_guide', async (req,res)=>{
     const {_id,firstname,lastname,mu_location,} = req.body;

     try{
          let check_id = await user.findOne({_id:_id});
          let check_guide = await db.findOne({id_guide:_id});
          
          if(!check_id || check_guide){
               return res.send({status:'error',msg:'duplicate guide or not user found'});
          }


          let create_guide = await db.create({
               id_guide:_id,
               firstname:firstname,
               lastname:lastname,
               mu_location:mu_location
          })
               
          

           await dbusr.findByIdAndUpdate({_id:_id},
                    {
                         guide:true,
                    }                    
               )

  
          return res.json({status:'success',result:create_guide});
     }
     catch(err){
          return res.send({status:'error',Error:err})
     }
})

Guide_detail.post('/create_post/:usr_id',async(req,res) => {

     const { usr_id } = req.params;
     const {post,photos} = req.body;
     
     const newpost = {
          ...post,
          postPhotos:photos
     }
     

     try{



          let og = await db.findOne({id_guide:usr_id}).select('guide_post');
          let oggg = await og.guide_post.filter(e => e.muplace !== newpost.muplace)
          let filterMU = await og.guide_post.filter(e => e.muplace === newpost.muplace);

          console.log(filterMU);
          let push_post;    
      
          if(filterMU.length === 0)
          {
                push_post = await db.findOneAndUpdate(
                    {
                         id_guide:usr_id
                         
                    },
                    {
                         $push:{guide_post:newpost}
                    }
               )
          }
          else{
              await oggg.push(newpost);
               
               push_post = await db.findOneAndUpdate(
                    {
                         id_guide:usr_id
                    },
                    {
                         guide_post:oggg
                    }
               )
          }

          let dir = path.dirname(__dirname);
          let imagedir = path.join(dir,"assets","guide",usr_id,"detail_img")
           
          let deletet_unuse_image = await checkunuse_guide(usr_id);
          const {status} = deletet_unuse_image;
          if(status !== 'sucees'){
                return {
                    status:'error',
                    msg:deletet_unuse_image.err
                }
          }
        
          return res.send(push_post)
     }
     catch(err){
          

       return res.send({status:'error',err})
     }


})


//get guide detail
Guide_detail.get('/get_list_guide/:muplace',async(req,res) => {
     const {muplace} = req.params;
   
     try{
         
          let data = await db.find({'guide_post.muplace':muplace});
        
          
           return res.send(data);
          
     }
     catch(err){
          res.send(err)
     }
})


//upload image profile guide
const profile_img = multer.diskStorage({
     destination:async(req,file,cb)=>{
          try{
               let dir = await create_dir(req.params.id_guide,"guide","profile_pic");
               cb(null,dir);
          }
          catch(err){
               console.log(err);
               return;
          }
         
     },
     filename:(req,file,cb)=>{
          cb(null,Date.now() + req.params.id_guide + file.originalname);
     }
}) 


const upload_guide_pic = multer({storage:profile_img})

Guide_detail.post('/upload_profile_guide/:id_guide',upload_guide_pic.single('profile_img'),
                async (req,res)=>{
         
          return res.send({
               status:'success',
               id_guide:req.params.id_guide,
               filename:req.file.filename
          })

})


//edit profile guide
Guide_detail.put('/update_profile/:id_guide',async (req,res) => {


          // const {firstname,lastname,profile_pic} = req.body.editGuide;
          const {id_guide} = req.params;
          const {firstname,lastname} = req.body.editGuide
          const {profile_pic} = req.body;

          let Og = await db.findOne({id_guide:id_guide});

        

          const data = {
               profile_pic:profile_pic || Og.profile_pic,
               firstname:firstname || Og.firstname,
               lastname:lastname || Og.lastname
          }
        
           try{
                const filter = {id_guide:id_guide};
               
            
               let res = await db.findOneAndUpdate(filter,data);
               return res.send(res);

           }catch(err){
               return res.send({status:'error',err})
           }

})


//delte post
Guide_detail.delete('/delete-post/:id_user/:muplace',async(req,res) => {
       const {muplace,id_user} = req.params

       try{
          let filter = {id_guide:id_user};
          let deletedata= {
                 $pull:{
                    guide_post:{muplace:muplace}
                 }
          }
          let deletepost = await db.findOneAndUpdate(filter,deletedata,{new:true});

          
          let deletet_unuse_image = await checkunuse_guide(id_user);
          const {status} = deletet_unuse_image;
          if(status !== 'sucees'){
                return {
                    status:'error',
                    msg:deletet_unuse_image.err
                }
          }
         
          return res.json({status:'ok',deletepost})
       }
       
       catch(err){
           return res.json({status:'err',err})
       }

   
})


//experince photo
const guide_exp = multer.diskStorage({
      destination:async (req,file,cb) => {
           let dir = await create_dir(req.params.id_guide,"guide","experinceImg");
           console.log(file.fieldname);
           cb(null,dir);
      },
      filename:(req,file,cb) => {
            cb(null,Date.now()+file.originalname);
      }
})

const upload_guide_exp = multer({storage:guide_exp});

Guide_detail.post('/upload/exp/:id_guide',upload_guide_exp.array('guide_exp',5),async (req,res) => {
     const photos = req.files.map(file => file.filename);
     console.log(photos);
     return res.send({status:'ok',msg:'exp image uploaded',photos:photos,usr_id:req.params.usr_id})
})


module.exports = Guide_detail;