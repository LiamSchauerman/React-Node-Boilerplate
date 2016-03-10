var Sequelize = require('sequelize')
var models  = require('../models');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var bcrypt = require('bcryptjs');
var url = require('url');
var upload = multer(); // for parsing multipart/form-data
var cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var session = require('express-session')

app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: true
}))

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// passport initialization
app.use(passport.initialize());
app.use(passport.session());

 // passport config

passport.use(new LocalStrategy( {
  passReqToCallback: true,
  usernameField: 'email',
},
  function(req, username, password, done) {


    /* get the username and password from the input arguments of the function */

    // query the user from the database
    // don't care the way I query from database, you can use
    // any method to query the user from database
    models.user.find({where:{
      email: username
    }}).then(function(user){
        // console.log(hash + ":" + user.password)
        if(!user)
          // if the user is not exist
          return done(null, false, {message: "The user is not exist"});
        else if(!bcrypt.compare(req.body.password, user.password), function(err, res){
                // if password does not match
                 return done(null, false, {message: "Wrong password"});
        })

        else
          // if everything is OK, return null as the error
          // and the authenticated user
          req.login(user,function(err){
                  if(err){
                      return next(err);
                  }
                  return done(null,user);
              });
  }).error(function(err){
    // if command executed with error
    return done(err);
  });
}))

passport.serializeUser( function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});







//api routing
var router  = express.Router();

var authRouter  = express.Router();

authRouter.post("/new/user", upload.array(), function(req, res){
  // console.log(req.body)
  var newUser = models.user.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  })

  bcrypt.hash(req.body.password, 8, function(err, hash) {
    newUser.password = hash;
    newUser.save().then(function(){
      // req.body.username = newUser.email;
      // req.body.password = newUser.password;
      // console.log(req.body)

      passport.authenticate('local', function(err, user, info){


        res.redirect('/')
      })(req, res)

    })

  });

})
//

authRouter.post('/login', upload.array(),
function(req, res){
  if(req.user){
    res.send(200)
  }
  else{
    passport.authenticate('local', function(err, user, info){
      res.redirect('/')
    })(req, res)
  }
});
authRouter.get('/acct', upload.array(),
function(req, res){
  if(req.user){
    res.send(req.user)
  }
  else{
    res.redirect('/')
  }
});
authRouter.get('/logout', upload.array(),
function(req, res){
  if(req.isAuthenticated()){
    req.logout();
  }
    res.redirect('/');
});

app.use('/auth', authRouter);



app.use(function(req,res,next){
  var datenTime = new Date();
  var dateString = datenTime.getMonth() + "/" + datenTime.getDate() + " at " +
    datenTime.getHours() + ":" + datenTime.getMinutes()
      + "." + datenTime.getSeconds();
  console.log('Route Call to ' + req.url + " at "+ dateString + " from " + req.ip);
  next();
});

module.exports = app;
