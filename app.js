var express   = require("express");
var helmet    = require('helmet')
var app     = express();
var router    = express.Router();
var path    = require('path');

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.use("/",router);
app.use(express.static(path.join(__dirname, 'app')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

