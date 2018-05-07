// server.js
// where your node app starts
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var urlRemoteEnvVariable= process.env.MONGOLAB_URI;
var secreto = process.env.SECRET;
console.log(urlRemoteEnvVariable);
console.log(secreto);


//init project
var express = require('express');
var app = express();

//we've started you off with Express, 
//but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


MongoClient.connect(urlRemoteEnvVariable, function (err, db) {
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
  console.log('Connection established to mlab.com:15340/urlshortened');

  // do some work here with the database.


  //Close connection
  db.close();
}
});