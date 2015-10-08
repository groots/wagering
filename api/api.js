var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

 
var app = express();

app.use(passport.initialize());
app.use(bodyParser.json());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Handles and potential CORS issues
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});


var strategyOptions = {
    usernameField: 'email'
};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done){

    var searchUser = {
        email: email
    }
    User.findOne(searchUser, function(err, user){
        if(err) return done(err);
        
        //check if user is null
        if(!user){  
            return done(null, false, {
                message: 'The User Credentials are not correct'
            });
        }

        user.comparePasswords(password, function(err, isMatch){
            if(err) return done(err);
            
            if(!isMatch) return done(null, false, {
                    message: 'The User Credentials are not correct'
                });       

            return done(null, user);
        });
    });
});

var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done){

    var searchUser = {
        email: email
    }
    User.findOne(searchUser, function(err, user){
        if(err) return done(err);
        
        //check if user is null
        if(!user){  
            return done(null, false, {
                message: 'I think you\'ve been here before. Email already used!'
            });
        }
    });



    //create a new user
    var newUser = new User({
        email: email,
        password: password
    });

    newUser.save(function(err){
        done(null, newUser)
    });
});

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.post('/register', passport.authenticate('local-register'), function(req, res){
	createSendToken(req.user, res);
});


app.post('/login', passport.authenticate('local-login'), function(req, res){
    createSendToken(req.user, res);
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
	.send({user: user.toJSON(), token: token});
	
}


mongoose.connect('mongodb://localhost/tokenauth');
var server = app.listen(3000, function(){
	console.log('api listenting on ', server.address().port);
});