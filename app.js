const createError = require("http-errors");
const express = require("express");
const path = require("path");
const passport = require('passport');
const dotenv = require('dotenv');
const plyr = require('plyr');

/**For authentication */
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");

/**Routes define */
const indexRouter = require("./routes/indexRouter");
const registerRouter = require("./routes/registerRouter");
const logoutRouter = require("./routes/logoutRouter");
const mainRouter = require("./routes/mainRouter");
const profileRouter = require("./routes/profileRouter");
const userprofileRouter = require("./routes/userprofileRouter");

const notiRouter = require("./routes/notiRouter");
const listRouter = require("./routes/listRouter");

//####################### Server Setup ###########################
const app = express();

//####################### Passport Setup #########################	
app.use(passport.initialize());
app.use(passport.session());

////////////////////////// Cloudinary config ///////////////////////////
const cloudinary = require('cloudinary').v2;
 
cloudinary.config({
    cloud_name: "dmszi0aiy",
    api_key: "555671746911794",
    api_secret: "BUQsPIdFwt7dODzBcChO5dYzfvQ"
});
//####################### App Setup ##############################	
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./")));

//####################### Connect to MongoDB  ####################
var db = require('./config/database')

//####################### Setup Express Session  #################
var date = new Date();

// Session expire date setup
var sessionExpireDate = date.setDate(date.getDate() + 1);

app.use(
    session({
        secret: "TDTU_Noti",
        resave: true,
        saveUninitialized: true,
        expires: sessionExpireDate
    })
);
//####################### Middleware Setup  #################
app.use("/", indexRouter)
app.all('/register', registerRouter)
app.all('/updateProfile', registerRouter)
app.all('/changePassword', registerRouter)
app.all('/logout', logoutRouter)
app.all('/main', mainRouter)
app.all('/profile', profileRouter)
app.all('/noti', notiRouter)
app.all('/details/:id', notiRouter)
app.all('/list', listRouter)
app.all('/deletePost', profileRouter)
app.all('/viewPost', mainRouter)
app.get('/:id', userprofileRouter)

//####################### 404 Handler  #####################
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

//####################### Listen Requests  #################
// set port
const PORT = process.env.PORT || 8080;

// server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});
