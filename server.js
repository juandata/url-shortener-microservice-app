// server.js
// where your node app starts
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//init project
var express = require('express');
var app = express();
var address = process.env.SECRET;


//we've started you off with Express, 
//but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  //connectToDatabase();
});
app.get('/new', function (req, res){
  console.log("new");
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function connectToDatabase(){
  MongoClient.connect(address, function (err, db) {
   //(Focus on This Variable)
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
  console.log('Connection established to mlab.com');

  // do some work here with the database.
  var jsonObject = {
  name : "Juan David",
  lastName : "Tabares Arce"
}, dbo = db.db("urlshortened");
dbo.collection('users4').insert( jsonObject, function(err, ok){
  if (err) throw err;
  if (ok) console.log('document inserted!', ok);
});

  //Close connection
  db.close();
}
});
}
/*
MongoClient.connect(address, function (err, db) {
   //(Focus on This Variable)
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
  console.log('Connection established to mlab.com');

  // do some work here with the database.
  var jsonObject = {
  name : "Juan David",
  lastName : "Tabares Arce"
}, dbo = db.db("urlshortened");
dbo.collection('users4').insert( jsonObject, function(err, ok){
  if (err) throw err;
  if (ok) console.log('document inserted!', ok);
});

  //Close connection
  db.close();
}
});*/