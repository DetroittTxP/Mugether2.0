const mongoose = require('mongoose');

const user_model = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    resetpassword:{
        type:String,
        require:true
    },
    

    
    name:String,
    surname:String,
    tel:String,
    favorite_muplace:{
        type:[],
        default:[]
    },
    profile_pic:{
        type:String,
        default:'profile_temp.png'
    },
    guide:{type:Boolean,default:false},
    shop:{type:Boolean,default:false},
})


module.exports = mongoose.model(process.env.DB_USER, user_model);
