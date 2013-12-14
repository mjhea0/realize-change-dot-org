var path = require("path");

exports.ping = function(req, res){
  res.send("pong!", 200);
};

exports.about = function(req, res){
  res.send("run along now.", 200);
};

exports.answers = function(req, res){
  res.render('answers', { title: "RealizeChangeDotOrg | Answers"});
};
