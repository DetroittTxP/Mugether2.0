const Guide_detail = require('express').Router();
const Guide_detail_Model = require('../model/Guide_detail-Model');
const user = require('../model/User-model')
const multer = require('multer');
const {create_dir} = require('./uploadimages')
const fs = require('fs')
const path = require('path')
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
         
          let filterMU = await og.guide_post.filter(e => e.muplace !== newpost.muplace);

          let push_post;    
      
          if(filterMU.length !== 0)
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
              await filterMU.push(newpost);

               push_post = await db.findOneAndUpdate(
                    {
                         id_guide:usr_id
                    },
                    {
                         guide_post:newpost
                    }
               )
          }

          let dir = path.dirname(__dirname);
          let imagedir = path.join(dir,"assets","guide",usr_id,"detail_img")
           
          await check_unuse_image(usr_id,imagedir,newpost.muplace)
        
          return res.send(push_post)
     }
     catch(err){
          

       return res.send({status:'error',err})
     }


})


const check_unuse_image=async(id_guide,imagedir,muplace)=>{
       try{
            let dataindb = await db.findOne({id_guide:id_guide}).select('guide_post');
            dataindb = dataindb.guide_post.filter((e) => e.muplace === muplace);

            let db_data = dataindb[0].postPhotos;

            fs.readdir(imagedir,(err,files) => {
                  if (err) {
                         console.log(err);
                         return;
                  }
              
               files.forEach(img => {
                    if(!db_data.includes(img))
                    {
                         let filedir = path.join(imagedir,img);  
                         console.log(filedir); 
                         fs.unlink(filedir,(err)=>{
                              if(err){
                                console.log(err);
                                return;
                              }
                         }) 
                    }
               })
               
            })
            return;
       }
       catch(err){
           console.log(err);
           return;
       }
}

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


module.exports = Guide_detail;