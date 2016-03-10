var port = 6969;

//  reqs
var http = require("http");
var express = require("express");
var models = require("./models");
var app = require("./routes/routes.js");

app.use(express.static(__dirname + '/dist'));


//Server
var server = http.createServer(app);



server.listen(port, function(){
	console.log('Listening on port ' + port);
});

//Serving Static Files
