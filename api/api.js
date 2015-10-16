var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var moment = require('moment');
 
var app = express();

app.use(passport.initialize());
app.use(bodyParser.json());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Handles and potential CORS issues
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

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
    });
});

var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done){

    var searchUser = {
        email: email
    }
    User.findOne(searchUser, function(err, user){
        if(err) return done(err);
        
        //check if user is null
        if(user){  
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

app.post('/auth/google', function(req, res){
    console.log(req.body.code);
    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: 'jx72t6CWmhnpd7EEzr_Al8qL'
    }

    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    request.post(url, {
        json: true,
        form: params
    }, function(err, response, token){
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        }

        //we can make a request to google apis now that we have a token
        request.get({
            url: apiUrl,
            headers: headers,
            json: true
        }, function(err, response, profile){
            console.log(profile);
            User.findOne({googleId: profile.sub}, function(err, foundUser){
                if(foundUser) return createSendToken(foundUser, res);

                var newUser = new User();
                newUser.googleId = profile.sub;
                newUser.displayName = profile.name;

                newUser.save(function(err){
                    if(err) return next(err);

                    createSendToken(newUser, res);
                });
            });
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
		sub: user.id,
        exp: moment().add(10, 'days').unix()
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