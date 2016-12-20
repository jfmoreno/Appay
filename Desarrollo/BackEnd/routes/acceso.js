var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done)
{
    done(null, user);
});

/* passport deserializeUser. */
passport.deserializeUser(function(user, done)
{
    done(null, user);
});


passport.use(new LocalStrategy( function(name, password, done){
    console.log("POR QUE NO ENTRAS");
        console.log('username : ' + username);
		console.log('password : ' + password);
        return done(null, user);
	}));




router.post('/login', function(req, res, next) {
    console.log("Entramos al post de login");
	login(req, res, next, function(err) {
		if(err) {
			res.status(401).json({status:'F',reason:err.message});
		} else {
			res.json({status:'S'});
		}
	});
});


function login(req, res, next, cb) {
    console.log("entramos en la funcion login");
	passport.authenticate('local', function (err, user) {	
        console.log("entramos en passport authenticate");
        console.log("user es "+user);
		if(err) {
			cb(new Error('Incorrect name or password.'));
		} else {
			req.logIn(user, function(err) {
				if(err) {
					cb(new Error('Incorrect name or password.'));
				} else {
					cb();
				}
			});
		}
	})(req, res, next);
}




module.exports = router;