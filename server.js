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
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  //searchOnDatabase(fullUrl);
  //res.redirect(url);

});
app.use('/new', function (req, res){
  res.send("hola");
  var url = req.url.substr(1);
  let fullUrl = req.protocol + '://' + req.get('host') + '/';
  console.log( url, fullUrl);
  writeToDatabase(url, fullUrl);
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function writeToDatabase(url, fullUrl){
  MongoClient.connect(address, function (err, db) {
   //(Focus on This Variable)
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
  console.log('Connection established to mlab.com');

  // do some work here with the database.
  var number = Math.floor((Math.random() * 10000) + 1);
  var jsonObject = {
  original_url : url,
  short_url : fullUrl + number
}, dbo = db.db("urlshortened");
dbo.collection('urls').insert( jsonObject, function(err, ok){
  if (err) throw err;
  if (ok) console.log('document inserted!', ok);
});

  //Close connection
  db.close();
}
});
}

function searchOnDatabase(fullUrl){
MongoClient.connect(address, function (err, db) {
   //(Focus on This Variable)
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
  console.log('Connection established to mlab.com');

  // do some work here with the database.
  var  dbo = db.db("urlshortened");
  dbo.collection('urls').find({ short_url: fullUrl})
.toArray(function(err, res){
  if (err) throw err;
  var response = {
  original_url : res[0].original_url,
  short_url : res[0].short_url
  };
  res.json(response);
});

  //Close connection
  db.close();
}
});
}