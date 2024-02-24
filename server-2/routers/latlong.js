const ll = require('express').Router();
const mu_place = require('../model/MuPlace-Model');
const nearby_places = require('../model/Nearby-Model');
const {mu_food,mu_hotel,mu_travel} = nearby_places



ll.get('/',(req,res) => {
     res.send('test');
})


const manange_nearby_data = (data) =>{

    let newdata = data.map((e) => {
         return{
            name:e.name,
            location:[e.lat,e.lng],
            distance_to_mu:e.distance_to_mu
         }
    })

    return newdata;
}

ll.get('/mu/nearby/:mu_place_name', async (req,res) => {
    
    try{
        const {mu_place_name} = req.params;;

        let mu_place_ll = await mu_place.findOne({name:mu_place_name})
                                .select('name lat long');

        let mu_food_ll = await mu_food.find({mu_place:mu_place_name}).select('name lat lng distance_to_mu');         
        let mu_hotel_ll = await mu_hotel.find({mu_place:mu_place_name}).select('name lat lng distance_to_mu');   
        let mu_travel_ll = await mu_travel.find({mu_place:mu_place_name}).select('name lat lng distance_to_mu');        
        
        let data = {
            muplace_latlong:{
                name:mu_place_ll.name,
                location:[mu_place_ll.lat,mu_place_ll.long]
                
            },
            food_latlong:manange_nearby_data(mu_food_ll),
            hotel_latlong:manange_nearby_data(mu_hotel_ll),
            travel_latlong:manange_nearby_data(mu_travel_ll),
         
        }

        return res.json(data)
    }
    catch(err)
    {
        return res.send(err)
    }
})


module.exports = ll;
