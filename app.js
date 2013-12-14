// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Answers = require('./models/answers.js');

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
  Answers.find(function(error, emps){
      console.log(emps)
      res.render('index', {
            title: 'Employees',
            employees:emps
        });
  });
});
app.get('/ping', routes.ping);
app.get('/about', routes.about);
app.get('/answers', routes.answers);

app.get('/searching', function(req, res){
  var url = 'https://github.com/mjhea0/realize-change-dot-org/blob/master/answers.md'
  var request_options = {
    url: url
  };	
  request(request_options, function(err, resp, body) {
    $ = cheerio.load(body)
  	var projects = $('.markdown-body p');
    var randNum = Math.floor(Math.random() * projects.length);
    var project = $(projects)[randNum];
    var title = $(project).find('strong').text();
    var description = $(project).text().slice(title.length + 3);
    res.send('<div id="title">'+title+'</div><div id="description">'+description+'</div>');
  });
});

// mongo config
var MONGOLAB_URI= "add_your_mongolab_uri_here"
var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/realize-change-dot-org'
mongoose.connect(mongo);

// mongo model


// run server
app.listen(app.get('port'), function(){
  console.log('\nExpress server listening on port ' + app.get('port'));
});

mongoose.connection.on('open', function() {
  console.log('You are connected to mongodb');
});
