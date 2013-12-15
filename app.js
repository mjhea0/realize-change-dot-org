// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Answers = require('./models/answers.js'); // mongo model

// global config
var app = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// env config
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// routes
app.get('/', function(req, res){
  Answers.find(function(error, answers){
    res.render('index', {
      title: 'RealizeChangeDotOrg',
      answerOne:answers[0]["answer"],
      answerTwo:answers[1]["answer"]
    });
  });
});
app.post('/rating', function(req, res){
  addOne = req.body["addOne"]
  addTwo = req.body["addTwo"]
  // Answers.find(function(error, answers){
  //   ratingOne = answers[0]["rating"] + parseInt(addOne)
  //   ratingTwo = answers[1]["rating"] + parseInt(addTwo)
  // });
  if (addOne) {
    Answers.update({answer:"I think we should do nothing."}, {$inc: {rating: +1}}, function(err, updated) {
      if( err || !updated ) console.log("not updated");
      else console.log("updated");
    });
  } else if (addTwo) {
    Answers.update({answer:"I think we should do something."}, {$inc: {rating: +1}}, function(err, updated) {
      if( err || !updated ) console.log("not updated");
      else console.log("updated");
    });
  };
});

app.get('/ping', routes.ping);
app.get('/about', routes.about);
app.get('/answers', routes.answers);

// mongo config - $ heroku config | grep MONGOLAB_URI
var MONGOLAB_URI = "mongodb://heroku_app20244101:29bthc7358ast2t12fen96cf0@ds061318.mongolab.com:61318/heroku_app20244101"
var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/realize-change-dot-org'
mongoose.connect(mongo)

// run server
app.listen(app.get('port'), function(){
  console.log('\nExpress server listening on port ' + app.get('port'));
});

mongoose.connection.on('open', function() {
  console.log('You are connected to mongodb');
});
