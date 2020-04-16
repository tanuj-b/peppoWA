var http = require('http')
var express = require('express');
var app = express();
var twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

app.get('/', function (req, res) {
  res.send('Hello Tanuj!');
  const client = new twilio(accountSid, authToken);

client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hello there!',
         to: 'whatsapp:+919867104169'
       })
      .then(message => console.log(message.sid));
});

app.post('/wa', function(req, res) { 
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.get('/photo', function (req, res) {
  res.send('Sending photo to Naman!');
  const client = new twilio(accountSid, authToken);

client.messages
  .create({
     mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
     from: 'whatsapp:+14155238886',
     body: `Automated picture of taco!`,
     //to: 'whatsapp:+919867104169'
     to: 'whatsapp:+919820415569'
   })
  .then(message => console.log(message.sid));
});

app.get('/location', function (req, res) {
  res.send('Sending location to Naman!');
  const client = new twilio(accountSid, authToken);

client.messages
  .create({
     from: 'whatsapp:+14155238886',
     body: `Automated location of favourite restaurant!`,
     persistentAction: ['geo:18.9623642,72.8023373|Naturals'],
     //to: 'whatsapp:+919867104169'
     to: 'whatsapp:+919820415569'
   })
  .then(message => console.log(message.sid));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});