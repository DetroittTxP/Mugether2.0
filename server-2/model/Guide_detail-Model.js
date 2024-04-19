const monggose = require('mongoose');

const guide_detail = monggose.Schema({
     id_guide:{type:String,required:true},
     firstname:{type:String,required:true},
     lastname:{type:String,required:true},
     contact:{
          tel:{type:String,required:true},
          email:{type:String,required:true},
          lineID:String,
          Ig:String,
          Facebook:String,
          URL:String,
     },
     guide_detail:String,
     mu_location:{type:[],required:true},
     guide_type:{
          type:String,
          required:true
     },
     guide_review:{
          type:{
               review_username:String,
               review_detail:String,
               review_score:String,
               review_like:Number,
          },
          default:[],
     },
     guide_post:{
        type:[{
             muplace:String,
             postDetail:String,
             postPhotos:[String],
             postActivity:[String],
             experience_img:[String],
             postReview:{type:[{
               username:String,
               score:Number,
               detail:String,
               review_img:[String],
               reply:{
                    type:{
                         replied:Boolean,
                         detail:String,
                    },
                    default:{
                         detail:'',
                         replied:false
                    }
               },
               like:{
                    type:{
                         countlike:Number,
                         countUser:[String],
                    },
                    default:{
                         countlike:0,
                         countUser:[]
                    }
               }
          }],
          default:[]},
        }],
        default:[]
     },


     profile_pic:{type:String,default:'profile_temp.png'},
})
module.exports =monggose.model('guide_detail', guide_detail);

