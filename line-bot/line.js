require('dotenv').config();
const express = require('express');
const axios = require('axios');
const line = require('@line/bot-sdk')
const {MongoClient} = require('mongodb')

const app = express();
const lineConfig = {
    channelAccessToken:process.env.LINE_ACCESS_TOKEN,
    channelSecret:process.env.LINE_CHANNEL_SECRET

}


const client = new line.Client(lineConfig)
const Db_Client = new MongoClient(process.env.CONNECT_STRING)


app.post('/webhook',line.middleware(lineConfig) , async (req,res) => {
    try{

        const {events} = req.body;
        if(events.length > 0){
            await events.map(e => handleEvents(e))
        }
        else{
            res.send('OK').status(200)
        }
    }
    catch(err){
        res.send(err).status(500)
    }
})




const handleEvents= async (events)=>{
     if(events.type === 'message' && events.message.type === 'text'){

        console.log(events.message.text);

        let ken = events.message.text


        if (ken === 'โรงแรม' || ken === 'สถานที่ท่องเที่ยว' || ken === 'ร้านอาหาร') {
            return;
        }
        
        let hotel = 'โรงแรม'
        let food = 'ร้านอาหาร'
        let travel = 'สถานที่ท่องเที่ยว'
    
        if(ken.includes(hotel) ){
           
            if(events.message.text.length <= 10){
                return client.replyMessage(events.replyToken,{type:'text',text:'โปรดพิมใหม่นะครับ'})
            }   

            let mu_place  = (events.message.text).split("โรงแรมใกล้").pop()  

            let res = await axios.get('http://localhost:1111/location',{
                params:{
                    mu_place:mu_place,
                    keytype:hotel
                }
            })

            let location_map = res.data.map(e => {
                 return{
                    type:'location',
                    title:`${e.name} ระยะทาง ${e.distance_to_mu}`,
                    address:e.address,
                    latitude:e.lat,
                    longitude:e.lng
                 }
            })

           return  client.replyMessage(events.replyToken,location_map)
        
        }
        else if(ken.includes(food))
        {

            if(events.message.text.length <= 13){
                return client.replyMessage(events.replyToken,{type:'text',text:'โปรดพิมใหม่นะครับ'})
            }   

            let mu_place  = (events.message.text).split("ร้านอาหารใกล้").pop()  

            let res = await axios.get('http://localhost:1111/location',{
                params:{
                    mu_place:mu_place,
                    keytype:food
                }
            })

                
            let location_map = res.data.map(e => {
                 return{
                    type:'location',
                    title:`${e.name} ระยะทาง ${e.distance_to_mu}`,
                    address:e.address,
                    latitude:e.lat,
                    longitude:e.lng
                 }
            })



            return client.replyMessage(events.replyToken,location_map)
        
        }
        else if(ken.includes(travel)){

            if(events.message.text.length <= 21){
                return client.replyMessage(events.replyToken,{type:'text',text:'โปรดพิมใหม่นะครับ'})
            }  
          
            let mu_place  = (events.message.text).split("สถานที่ท่องเที่ยวใกล้").pop()  

            let res = await axios.get('http://localhost:1111/location',{
                params:{
                    mu_place:mu_place,
                    keytype:travel
                }
            })

            let location_map = res.data.map(e => {
                 return{
                    type:'location',
                    title:`${e.name} ระยะทาง ${e.distance_to_mu}`,
                    address:e.address,
                    latitude:e.lat,
                    longitude:e.lng
                 }
            })



           return  client.replyMessage(events.replyToken,location_map)
        

        }
        else{
            return client.replyMessage(events.replyToken,{type:'text',text:'โปรดพิมใหม่นะครับ'})
        }
     }
}

























//

app.get('/location',async (req,res) => {
     await Db_Client.connect()

     const {mu_place,keytype} = req.query;

     if(keytype === 'โรงแรม')
     {
        let result = await Db_Client.db(process.env.DB).collection(process.env.HOTEL_MU).find({ mu_place: {$regex:mu_place} }).sort({distance_to_mu:1}).limit(5).toArray();
        res.json(result)
        return;
     }
     else if(keytype === 'ร้านอาหาร'){
        let result = await Db_Client.db(process.env.DB).collection(process.env.FOOD_MU).find({ mu_place: {$regex:mu_place} }).limit(5).toArray();
        res.json(result)
        return;
     }
     else if(keytype === 'สถานที่ท่องเที่ยว'){
        let result = await Db_Client.db(process.env.DB).collection(process.env.TRAVEL_MU).find({ mu_place: {$regex:mu_place} }).limit(5).toArray();
        res.json(result)
        return;
     }
     else{
        res.send('พิมใหม่ไอ่โง่')
        return;
     }
     
})



app.get('/test',(req,res) => {
    res.send('test ok')
})


app.listen(process.env.PORT,() => {
    console.log('server ok on ',process.env.PORT);
})

