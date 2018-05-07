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
var jsonObject = {};


//we've started you off with Express,
app.use(express.static('public'));
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get(/\d/, function(req, response, next) {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  MongoClient.connect(address, function(err, db) {
    //(Focus on This Variable)
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to mlab.com');
      // do some work here with the database.
      var dbo = db.db("urlshortened");
      dbo.collection('urls').find({
        short_url: fullUrl
      }).limit(1).next(function(err, doc) {
        if (!doc) {
          response.send("the url does not exist in the database, try again with a correct number");
        } else {
          console.log("redirecting...");
          response.redirect(doc.original_url);
        }
      });
      //Close connection
      db.close();
      //});
    }
  });
});
app.use('/new', function(req, res) {
  var url = req.url.substr(1);
  var number = Math.floor((Math.random() * 10000) + 1);
  let fullUrl = req.protocol + '://' + req.get('host') + '/' + number;
  console.log(url, fullUrl);
  writeToDatabase(url, fullUrl);
  var body = {
    "original_url": url,
    "short_url": fullUrl
  }
  res.json(body);
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

function writeToDatabase(url, fullUrl) {
  MongoClient.connect(address, function(err, db) {
    //(Focus on This Variable)
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to mlab.com');

      // do some work here with the database.
      var jsonObject = {
          original_url: url,
          short_url: fullUrl
        },
        dbo = db.db("urlshortened");
      dbo.collection('urls').insert(jsonObject, function(err, ok) {
        if (err) throw err;
        if (ok) console.log('document inserted!', ok);
      });

      //Close connection
      db.close();
    }
  });
}
