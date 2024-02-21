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
    }
})


module.exports = mongoose.model(process.env.DB_USER, user_model);
