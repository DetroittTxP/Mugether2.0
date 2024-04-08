const monggose = require('mongoose');

const guide_detail = monggose.Schema({
     id_guide:{type:String,required:true},
     firstname:{type:String,required:true},
     lastname:{type:String,required:true},
     contact:{
          tel:{type:String,required:true},
          email:{type:String,required:true},
          lineID:String,
          Ig:String
     },
     guide_detail:String,
     mu_location:{type:[],required:true},

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
                    type:Number,
                    default:0
               }
          }],
          default:[]},
        }],
        default:[]
     },

     guide_review:{type:[{
          username:String,
          score:Number,
          detail:String,
          review_img:[] 
     }],
     default:[]},
     profile_pic:{type:String,default:'profile_temp.png'},
   
})

module.exports =monggose.model('guide_detail', guide_detail);

