const express = require('express');
const {SessionsClient} = require('dialogflow')
const { Client } = require('@line/bot-sdk');
require('dotenv').config()
const app = express();
app.use(express.json());

const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.SECRET,
  };

  const lineClient = new Client(lineConfig);

app.post('/dialogflow', (req, res) => {
    // Log the incoming request from Dialogflow
   
    if (
        req.body &&
        req.body.originalDetectIntentRequest &&
        req.body.originalDetectIntentRequest.payload &&
        req.body.originalDetectIntentRequest.payload.data &&
        req.body.originalDetectIntentRequest.payload.data.source &&
        req.body.originalDetectIntentRequest.payload.data.source.userId
      ) {
        const userId = req.body.originalDetectIntentRequest.payload.data.source.userId;
    
        // Handle Dialogflow webhook request
        const intent = req.body.queryResult.intent.displayName;
        // Process intent and generate response
    
        // Send response to LINE
        const lineMessage = {
          type: 'text',
          text: 'Hello from your Node.js server!',
        };

        console.log(userId);
    
        lineClient.pushMessage(userId, lineMessage)
          .then(() => res.status(200).send('OK'))
          .catch((err) => console.error(err));
      } else {
        // Handle the case when the expected properties are not present
        console.error('Invalid request format');
        res.status(400).send('Bad Request');
      }
});

app.listen(1234, () => {
    console.log('Express.js server is running on port 1234');
});
