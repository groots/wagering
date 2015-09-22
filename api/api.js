var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('./services/jwt.js');

 
app.use(bodyParser.json());


//Handles and potential CORS issues
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();

});

app.post('/register', function(req, res){
	var user = req.body;

	var newUser = new User.model({
		email: user.email,
		password: user.password
	});

	var payload = {
		//issuer
		iss: req.hostname, 
		//subject is the user
		sub: user._id
	}

	//var to hold encoded token
	var token = jwt.encode(payload, "secret...keey");

	newUser.save(function(err){
		res.status(200).send({user: newUser.toJSON(), token: token});
	});
});

mongoose.connect('mongodb://localhost/tokenauth');
var server = app.listen(3000, function(){
	console.log('api listenting on ', server.address().port);
});