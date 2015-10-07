var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple');

 
app.use(bodyParser.json());


//Handles and potential CORS issues
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();

});

var wagers = [
	'Cook',
	'SuperHero',
	'Whisper',
	'Mountain Lion'	
];

app.post('/register', function(req, res){
	//store everything that came in
	var user = req.body;

	//create a new user
	var newUser = new User({
		email: user.email,
		password: user.password
	});

	newUser.save(function(err){
		createSendToken(newUser, res);
	});
});


app.post('/login', function(req, res){
	req.user = req.body;
	var searchUser = {
		email: req.user.email
	}; 
	User.findOne(searchUser, function(err, user){
		if(err){
			throw err;
		}
		//check if user is null
		if(!user){	
			return res.status(401).send({
				message: 'The User Credentials are not correct'
			});
		}

		user.comparePasswords(req.user.password, function(err, isMatch){
			if(err){
				throw err;
			}
			if(!isMatch){
				return res.status(401).send({
					message: 'The User Credentials are not correct'
				});				
			}
			createSendToken(user, res);
		});
	});
});

app.get('/wagers', function(req, res){ 
	//if there is no authorize header...dont proceed
	if(!req.headers.authorization){
		return res.status(401).send({
			message: 'You are not authorized to see this page'
		});
	}

	//split to separate token from bearer
	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, 'secret...keey');

	if(!payload.sub){
		res.status(401).send({
			message: "You are not authorized to see this page"
		});
	}
	res.json(wagers);
});


function createSendToken(user, res){
	var payload = {
		//issuer of token
		// iss: req.hostname, 
		//subject is the user id
		sub: user.id
	}

	//var to hold encoded token
	var token = jwt.encode(payload, "secret...keey");
	res.status(200)
	.send({
		user: user.toJSON(), 
		token: token
	});
}


mongoose.connect('mongodb://localhost/tokenauth');
var server = app.listen(3000, function(){
	console.log('api listenting on ', server.address().port);
});