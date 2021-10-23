/* Author: Jacob Williams
 * Purpose: this file hosts the server, starts the DB, and controls logic for Chatty
 * Usage: node server.js -> follow address in terminal
 */

// creating constant variables
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const hostname = '143.198.105.222';
const port = 300;
// degine mongoose and DBURL
const db = mongoose.connection;
const mongoDBURL = 'mongodb://localhost/Chatty';

// given Schema code from spec
var Schema = mongoose.schema;

var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

mongoose.connect(mongoDBURL, { useNewUrlParser: true})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// use public_html as static files
app.use(express.static('public_html'));
// gets the messages from the DB sends back to client
app.get('/chats', function(req, res){
  if(req.url != '/favicon.ico'){
    ChatMessage.find({}).sort({"time":1}) // sorts the DB first
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
// gets the current time and creates a new message from the given url
app.post('/chats/:alias/:message', (req,res) => {
  if(req.url != '/favicon.ico'){
    var today = new Date();
    var t = today.getTime();
    var newMessage = new ChatMessage({time:t, alias: req.params.alias, message: req.params.message})
    newMessage.save((err) => {if (err) res.end('ERROR IN NEW MESSAGE'); res.end('SAVED')});
  }
});

// displays the address to webpage when start up
app.listen(port,function () {
  console.log(`App listening at http://${hostname}:${port}`);
});
