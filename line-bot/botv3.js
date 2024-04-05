require('dotenv').config();
const express = require('express');
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



const finddist=async(lat1,lon1,lat2,lon2)=>{
    const R = 6371; 

    const toRadians = (degrees) => degrees * (Math.PI / 180);
  
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
}


 
const handledatabase=async(type,lat,long)=>{
    try {
        await Db_Client.connect();  
        let db =   Db_Client.db(process.env.DB);
       
        console.log('MongoDB connected successfully');
        let collection;
        let query;
        let nearby = [];
        switch(type){
            case 'ร้านอาหาร' :
                console.log(type);
                collection = db.collection(process.env.FOOD_MU);
                query = await collection.find({}).toArray();
                query.forEach((async data => {
                     let distance = await finddist(lat,long,data.lat,data.lng);
                     if(distance < 20){
                          nearby.push({
                              type:'location',
                              title:`${data.name} ระยะทาง ${distance.toFixed(2)} กม.`,
                              address:data.address,
                              latitude:data.lat,
                              longitude:data.lng,
                              dist:distance.toFixed(2)
                          })
                     }
                }))

                return nearby;
            case 'โรงแรม' :
                console.log(type);
               collection = db.collection(process.env.HOTEL_MU);
               query = await collection.find({}).toArray(); 
                
               query.forEach((async data => {
                let distance = await finddist(lat,long,data.lat,data.lng);
                if(distance < 20){
                     nearby.push({
                         type:'location',
                         title:`${data.name} ระยะทาง ${distance.toFixed(2)} กม.`,
                         address:data.address,
                         latitude:data.lat,
                         longitude:data.lng,
                         dist:distance.toFixed(2)
                     })
                }
           }))


             return nearby;
            case 'สถานที่ท่องเที่ยว':
                console.log(type);
                collection = db.collection(process.env.TRAVEL_MU);
                query = await collection.find({}).toArray(); 
                query.forEach((async data => {
                    let distance = await finddist(lat,long,data.lat,data.lng);
                    if(distance < 20){
                         nearby.push({
                             type:'location',
                             title:`${data.name} ระยะทาง ${distance.toFixed(2)} กม.`,
                             address:data.address,
                             latitude:data.lat,
                             longitude:data.lng,
                             dist:distance.toFixed(2)
                         })
                    }
               }))
                return nearby; 
            default:

                return;

        }
      } catch (err) {
        console.error('MongoDB connection error:', err);
   
      }
}

const userSteps = {};





const handleEvents=async(event)=>{
    const userID = event.source.userId;
        if(!userSteps[userID]){
            userSteps[userID] = { currentStep: 1, collectedData: {} };
        }
        
        const {currentStep,collectedData} = userSteps[userID];
           
        console.log(event);

     

        console.log(currentStep);
        if(currentStep  === 1){
             if(event.message.type !== 'text' || event.type !== 'message'){
                return client.replyMessage(event.replyToken,{type:'text', text:'โปรดเลือกร้านอาหาร หรือ สถานที่ท่องเที่ยว หรือ โรงแรม นะครับ'})
             }

             if(event.message.text !=='โรงแรม' && event.message.text !=='ร้านอาหาร' && event.message.text !=='สถานที่ท่องเที่ยว')
             {
                return client.replyMessage(event.replyToken,{type:'text', text:'โปรดเลือกร้านอาหาร หรือ สถานที่ท่องเที่ยว หรือ โรงแรม นะครับ'})
             }
        }
        else if(currentStep === 2){
            
            if(event.message.type !== 'location'&& event.type !== 'message'){
                return client.replyMessage(event.replyToken,{type:'text', text:'โปรดส่งโลเคชั่นมานะครับ'})
             }
        }



            try{
                switch(currentStep){
                     case 1:
                        if(event.type === 'message' && event.message.type === 'text'){
                            collectedData.name = event.message.text;
                            type = event.message.text;
                            userSteps[userID].currentStep = 2;
                            return client.replyMessage(event.replyToken, {
                                type: 'text',
                                text: `คุณต้องการไป ${collectedData.name} โปรดส่งโลเคชั่นของคุณมาครับ`, 
                                quickReply:{
                                    items:[
                                        {
                                            type:'action',
                                            action:{
                                                type:'location',
                                                label:'ส่งโลเคชั่น'
                                            }
                                        }
                                    ]
                                }
                              });
                        }
                        else{
                            return client.replyMessage(event.replyToken, {
                                type: 'text',
                                text: `โปรดเลือกร้านอาหาร หรือ สถานที่ท่องเที่ยว หรือ โรงเเรม นะครับ` 
                              });
                        }
                     
                     case 2:
                       if(event.type === 'message' && event.message.type === 'location'){
                          
                             const {latitude,longitude} = event.message;
        
                             let nearbylocation = await handledatabase(collectedData.name,latitude,longitude);
                             if(nearbylocation.length === 0){
                                return client.replyMessage(event.replyToken, {
                                    type: 'text',
                                    text: `ไม่พบสถานที่ใกล้เคียง. โปรดลองค้นหาอีกครั้ง`
                                });
                             }


                            let random = [];
                            for(let i =0;i<5;i++){
                                 let randomindex = Math.floor(Math.random() * nearbylocation.length);
                                 let randomdata = nearbylocation[randomindex];

                                if(randomdata.title.length > 100 || randomdata.address.length > 100){
                                    continue;
                                }
                                else{
                                    random.push(randomdata);
                                }
                            }
                            
                            userSteps[userID].currentStep = 1;
                            return client.replyMessage(event.replyToken,random);
                        }          
                     default:
                        userSteps[userID].currentStep = 1;
                        return;     
                }
            }
            catch(err){
                console.log(err);
                return;
            }     
}

const port = process.env.PORT || 5555;

app.listen(port,() => {
    console.log('connected at botv3 ', port);
})