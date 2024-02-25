const mongoose = require('mongoose');

const verify_guide_model = mongoose.Schema({
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

    image_guide:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model(process.env.DB_VERIFY_GUIDE,verify_guide_model)