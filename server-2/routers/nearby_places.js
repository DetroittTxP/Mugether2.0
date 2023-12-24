const nearby_places = require('../model/Nearby-Model');
const nearby = require('express').Router();

const {mu_food,mu_hotel,mu_travel} = nearby_places


nearby.get('/multiple/:muplace_name',async (req,res) => {
     const {muplace_name} = req.params;

     try{
        let food = await mu_food.find(
            {$or:[{mu_place:{$regex:muplace_name}},{mu_place:muplace_name}]}
         )
    
         let hotel = await mu_hotel.find(
            {$or:[{mu_place:{$regex:muplace_name}},{mu_place:muplace_name}]}
            )
    
        let travel = await mu_travel.find(
            {$or:[{mu_place:{$regex:muplace_name}},{mu_place:muplace_name}]}
        )

        console.log(food);
    
        return res.json({
            status:'ok',
            travel:travel,
            food:food,
            hotel:hotel
     })
    

     }  
     catch(err){
        return res.send(err)
     }

    
})





module.exports = nearby;