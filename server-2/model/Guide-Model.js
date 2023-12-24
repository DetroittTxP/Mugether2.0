const mongoose = require('mongoose');

const Guide_model = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    aka:{type:String,default:''},
    email:{type:String,required:true},
    mu_location:{type:[String],required:true},
    email:{type:String,required:true},
    detail:{type:String,required:true},
    type:{type:String,required:true},
    profile_pic:{type:String,default:''},
    review:[],
    photos:[]
})

module.exports = mongoose.model(process.env.DB_GUIDE, Guide_model)