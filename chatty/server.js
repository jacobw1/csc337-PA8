

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const hostname = 'localhost';
const port = 300;

const db = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/Chatty';

var Schema = mongoose.schema;

var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

var timeCount = 1;

mongoose.connect(mongoDBURL, { useNewUrlParser: true})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('public_html'));

app.get('/chats', function(req, res){
  if(req.url != '/favicon.ico'){
    ChatMessage.find({})
    .exec((err,results) =>{
      var resString = '';
      for(i in results){
        r = results[i];
        resString += '<div class="message"> <strong>'+ r.alias+':</string>'+ r.message+'</div><br>';
      }
      res.end(resString);
    })
  }
});

app.post('/chats/:alias/:message', (req,res) => {
  if(req.url != '/favicon.ico'){
    var newMessage = new ChatMessage({time:timeCount, alias: req.params.alias, message: req.params.message})
    newMessage.save((err) => {if (err) res.end('ERROR IN NEW MESSAGE'); res.end('SAVED')});
  }
});


app.listen(port,function () {
  console.log(`App listening at http://localhost:${port}`);
});
