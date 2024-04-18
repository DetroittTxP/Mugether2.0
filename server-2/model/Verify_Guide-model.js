const mongoose = require('mongoose');
const verify_guide_model = mongoose.Schema({
    info:{
        type:{
            detail:String,
            gender:String,
            dob:Date,
        }
    },
    id_user:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },

    lastname:{
        type:String,
        required:true
    },

    id_card:{
        type:String,
        required:true
    },

    id_guide:{
        type:String,
    },
    mu_place:{
        type:[],
        required:true,
    },
    tel:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
    image_guide:{
        type:String,
        default:''
    },
    status:{
        type:String,
        default:'pending'
    },
    contact:{
        type:{
            lineID:String,
            facebook:String,
            ig:String,
            website:String
        }
    },
    guide_type:{
        type:String,
        required:true
   },
})

module.exports = mongoose.model(process.env.DB_VERIFY_GUIDE,verify_guide_model)