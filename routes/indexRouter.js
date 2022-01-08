const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const path = require('path');

const {check, validatResult, validationResult} = require('express-validator');

const AFD = require("../models/AFD_model"); // Database for user as Admin and FD
const Student = require("../models/student_model"); // Database for user as Student

const loginValidator = require("./validators/loginValidator");

var dotenv = require('dotenv')
dotenv.config({ path: path.resolve(__dirname, '../config/.env')});

router.use(express.static("../public"));
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function (req, res, next) {
    if (!req.session.userId) {
        
        res.redirect("/index");
    } else {
        res.redirect("/main");
    }
});

router.get("/index", (req, res, next) => {
    if (!req.session.userId) {
        res.render("index", { error: "", email: "", password: "" });
    } else {
        res.redirect("/main");
    }
});

/**POST
 * Login function, it will:
 * Check if the user is in the database or not then throw according error
 */
router.post("/index", loginValidator, (req, res) => {

    function render_login (email, password, error) {
        return res.render("index", {
            error: error,
            email: email,
            password: password
        });
    }

    // Validation for Admin & F/D
    let result  = validationResult(req);
    if (result.errors.length === 0) {
        let {email, password} = req.body
        let error = '';

        AFD.find({ email: email }, function (err, data) {
            if (data.length != 0) {
                
                // Admin sign in
                if (data[0].role == 'admin') {
                    let data_pwd = data[0].password;
                    let data_uid = data[0]._id;      
                    let data_role = data[0].role;

                    if (data_pwd == password) {
                        req.session.userId = data_uid;
                        req.session.userRole = data_role;
                        res.redirect("/main");
                    } else {
                        render_login(email, password, "Wrong password 😢");
                    }
                // F/D sign in
                } else {
                    let hash = data[0].password
                    let data_uid = data[0]._id;      
                    let data_role = data[0].role;

                    const match = bcrypt.compareSync(password, hash) 
                    if (!match){
                        render_login(email, password, "Wrong password 😢");
                    } else {
                        req.session.userId = data_uid;
                        req.session.userRole = data_role;
                        res.redirect("/main");
                    }
                }
            } else {
                render_login(email, password, "This user is undefined 😢");
            }
        });
    } else {        
        result = result.mapped();

        let message;
        for (fields in result){
            message = result[fields].msg
            break;
        }
        const {email, password} = req.body
    
        render_login(email, password, message);
    }
});

/********************************** GOOGLE AUTHENTICATION FOR STUDENTS **************************************/
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var domainCheck = require('./validators/domainValidator')
var keys = require('../config/key');
var studentProfile

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});;

passport.use( new GoogleStrategy ({ clientID: keys.googleClientID,
                                    clientSecret: keys.googleClientSecret,
                                    callbackURL: process.env.GOOGLE_PATH
    }, function(accessToken, refreshToken, profile, done) {
        studentProfile = profile;
        return done(null, studentProfile);
    }
));

router.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']}), 
    // passport.authenticate('google', {scope : ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']})
);

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req,res) {
        // Successful authentication, redirect success
        // Check if email is OK or not
        console.log(studentProfile);
        if (domainCheck(studentProfile.emails[0].value) == 1)
        {
            // Check in database if the student is there or not with googleId
            Student.find({googleId: studentProfile.id}, (err, data) => {
                if (err) {
                    return console.log(err)
                } else {
                // If the student is there already --> go to index page
                    if (data.length != 0) {
                        req.session.userId = studentProfile.id
                        req.session.userRole = 0
                        return res.redirect("/main");
                    }
                    // Else, student is new to database, create new student
                    else {
                        // create new student schema
                        var new_student = new Student({ googleId: studentProfile.id,
                                                        email: studentProfile.emails[0].value,
                                                        name: studentProfile.displayName,
                                                        class: 'None',
                                                        faculty: 'None',
                                                        avatar: studentProfile.photos[0].value || '',
                                                        role: 0})
                        // Save Student in the database
                        new_student.save((err, collection) => {
                            if(err){
                                return res.send(err)
                            }
                            else{
                                req.session.userId = studentProfile.id
                                req.session.userRole = 0
                                return res.redirect('/main');
                            }
                        });
                    }
                }
            });
        }   
});

module.exports = router;
