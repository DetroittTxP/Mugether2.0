const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();
const line = require('@line/bot-sdk')
const app = express();


const lineConfig = {
    channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret:process.env.SECRET
}


let food = ['หิวข้าว', 'กินข้าว','ร้านอาหาร','ร้านกับข้าว','ไปกินข้าว'];

let status= '';


const client = new line.Client(lineConfig)
const Db_Client = new MongoClient(process.env.CONNECT_STRING)

const Get_data =async (lat,long,status,event) =>{
    await Db_Client.connect();

    let isStatusFound = food.some(item => item.includes(status));
    if(isStatusFound)status = 'ร้านอาหาร'
    let str =lat + " " + long + " " + status

 

    return client.replyMessage(event.replyToken,{type:'text',text:str})
 
}

app.post('/webhook',line.middleware(lineConfig),async(req,res) => {
    try{

        const {events} = req.body;
        if(events.length > 0){
            await events.map(e => handleEvent(e))
        }
        else{
            res.send('OK').status(200)
        }
    }
    catch(err){
        res.send(err).status(500)
    }

})

const handleEvent=async(event)=>{
    const {type,text} = event.message;
    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        status = event.message.text;
        const message = {
          type: 'text',
          text: 'โปรดส่งโลเคชั่น',
          quickReply: {
            items: [
              {
                type: 'action',
                action: {
                  type: 'location',
                  label: 'ส่งโลเคชั่น',
                  
                },
              },
            ],
          },
        };
        
        return client.replyMessage(event.replyToken, message);
      };

    if(event.message.type === 'location')
    {
        const {latitude,longitude} = event.message;
        Get_data(latitude,longitude,status,event)
        return;
    }

    return;
}




app.listen(process.env.PORT,() =>{
    console.log('ok');
})