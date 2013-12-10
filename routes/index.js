var path = require("path");

exports.index = function(req, res){
  res.render('index', { title: "RealizeChangeDotOrg"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

exports.about = function(req, res){
  res.send("run along now.", 200);
};

exports.login = function(req, res){
  res.send("do you see what i see?", 200);
};
