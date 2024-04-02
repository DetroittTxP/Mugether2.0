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
     const {_id,firstname,lastname,mu_location,contact} = req.body;

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
               mu_location:mu_location,
               contact
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
     const {post,dataphoto} = req.body;
     
     const newpost = {
          ...post,
          postPhotos:dataphoto.post,
          experience_img:dataphoto.exp
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



//review photos gudie
const reviewguideStorage = multer.diskStorage({
     destination:async(req,file,cb) => {
          let dir = await create_dir(req.params.id_guide,"guide","reviewImg");
          cb(null,dir);        
     },
     filename:(req,file,cb) => {
          cb(null,Date.now() + file.originalname);
     }
})


const upload_review_guide = multer({storage:reviewguideStorage})

Guide_detail.post('/review/upload/:id_guide',upload_review_guide.array('reviewImg',5),
     async (req,res) => {
           if(req.files.length !== 0){
                const photos = req.files.map(file => file.filename);
                return res.send({status:'ok',msg:'review image uploaded',photos:photos,usr_id:req.params.usr_id})
           }
     }
)





//review api for guide
Guide_detail.post('/review/:id_guide/:id_post', async (req,res) =>{

     try{
          console.log(req.params);
          console.log(req.body);
          const {review,imagedata} = req.body
          let datatoinset = {
                username:review.username,
                score:review.score,
                detail:review.detail,
                review_img:imagedata
          }
          
          let filter = {
               id_guide: req.params.id_guide,
               "guide_post._id":req.params.id_post
          }

          let pushreview = await db.findOneAndUpdate(filter,{
               $push:{'guide_post.$.postReview':datatoinset}
          })

          return res.json(pushreview)
          
     }
     catch(err){
          return res.send({stattus:'error',err})
     } 
})

//get review image
Guide_detail.get('/review/img/:id_guide/:img_name',async (req,res) => {
     const {id_guide,img_name} = req.params
     let dir = path.dirname(__dirname);
     let img = path.join(dir,'assets','guide',id_guide,'reviewImg',img_name);
     if(!fs.existsSync(img)){
          return res.send('no image found from review img guide')
      }  
      return res.sendFile(img)
})

//get expricene img
Guide_detail.get('/exp/img/:id_guide/:img_name',(req,res) => {
      const {id_guide,img_name} = req.params
      let dir = path.dirname(__dirname);
      let img = path.join(dir,'assets','guide',id_guide,'experinceImg',img_name);
      console.log(img);
      if(!fs.existsSync(img)){
          return res.send('no image found')
      }  

      return res.sendFile(img)
})


//delete review guide
Guide_detail.delete('/delete/review/:id_guide/:id_post/:id_review', 
     async (req,res) => {
               const {id_guide,id_review,id_post} = req.params;
               console.log(req.params);
               try{
          
                    let filter = {
                         id_guide:id_guide,
                         "guide_post._id":id_post
                    };
                    let datatoremove = {
                         $pull:{
                              'guide_post.$.postReview':{_id:id_review}
                         }
                    }
                    let deletereview = await db.updateOne(filter,datatoremove)
                    console.log(deletereview);
                    return res.json(deletereview)
               }
               catch(err){
                    return res.send(err);
               }
     }
)

//
Guide_detail.get('/review/:id_guide/:id_post',async (req,res) => {
         //guideID//postID
          try{
               const {id_guide,id_post} =req.params;
               let filter = {
                    id_guide:id_guide,
                    "guide_post._id":id_post
               };
               let data = await db.findOne(filter).select('guide_post.$');
               
               if(!data){
                    return res.status(404).send('error');
               }

       
                return res.json(data.guide_post[0].postReview);
             
          }
          catch(err){
               return res.send(err)
          }
          
         
})



module.exports = Guide_detail;