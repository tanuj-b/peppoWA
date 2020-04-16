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


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});