const monggose = require('mongoose');

const guide_detail = monggose.Schema({
     id_guide:{type:String,required:true},
     firstname:{type:String,required:true},
     lastname:{type:String,required:true},
     guide_detail:String,
     mu_location:{type:[],required:true},
     guide_post:{
        type:[{
             muplace:String,
             postDetail:String,
             postPhotos:[String],
             postActivity:[String]
        }],
        default:[]
     },
    
     guide_review:{type:[],default:[]},
     profile_pic:{type:String,default:'profile_temp.png'}
})

module.exports =monggose.model('guide_detail', guide_detail);