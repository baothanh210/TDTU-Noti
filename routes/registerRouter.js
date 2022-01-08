const express = require('express')
const router = express.Router()

const updateValidator = require("./validators/updateValidator");
const registerValidator = require("./validators/registerValidator");
const changePwdValidator = require("./validators/changePwdValidator");

const { validationResult } = require('express-validator');

var bcrypt = require('bcryptjs');

const AFD = require("../models/AFD_model"); // Database for user as Admin and FD
const Student = require("../models/student_model"); // Database for user as Student

router.get("/register", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/index");

    } else if(req.session.userRole == 0) {
        Student.find({googleId: req.session.userId}, function(err, data_student){
            req.session.data = data_student[0]
            res.render("register", {user: req.session.data, error: ''});
        });
    }
    else {
        AFD.find({ _id: req.session.userId}, function (err, data_afd){
            if (data_afd.role == "admin"){
            } else {
            }
            req.session.data = data_afd[0];
            res.render("register", {user: req.session.data, error: ''});
        });
    }
});

router.get("/changePassword", function (req, res) {
    res.redirect("/index");
});

router.get("/updateProfile", function (req, res) {
    res.redirect("/index");
});

// Create a new FD
router.post('/register', registerValidator, (req, res) => {
    function render_register (error) {
        return res.render("register", {
            error: error,
            user: role = "admin"
        });
    }        
    let result  = validationResult(req);

    if (result.errors.length === 0) {
        const {name, email, password, rights} = req.body
        const hashed = bcrypt.hashSync(password, 10)

        AFD.find({ email: email }, function (err, data) {
            if (data.length == 0) {
                // Create FD account
                const FD = new AFD({ name: name,
                                    email: email,
                                    password: hashed,
                                    rights: rights,
                                    avatar: "public/images/logo/logo-fd.png",
                                    role: "F/D"       
                });
                // Save FD in the database
                FD.save()
                // Sign up success --> back to main
                res.redirect("/index");
            } else {
                error = "Email is used already."
                render_register(error);
            }
        })
    } else {
        result = result.mapped();

        let message;
        for (fields in result){
            message = result[fields].msg
            break;
        }        
        render_register(message);
    }
});

// Student update profile
router.post('/updateProfile', updateValidator, (req, res) => {
    
    function render_updateProf (error) {
        data = req.session.data
        return res.render("register", {
            error: error,
            user: data
        });
    }
    
    let result  = validationResult(req)
    let email = req.session.data.email;

    if (result.errors.length === 0) {
        const {name, className, faculty} = req.body
        Student.find({ email: email }, function (err, data) {
            if (data.length != 0) {
                const filter = {email: email}
                const update_query = {name: name, class: className, faculty: faculty}

                // update function
                Student.updateOne(filter, update_query, (err,result) => {
                    if (err) {
                        console.log(err);
                    } 
                    else {
                        res.redirect("/index");
                    }
                });
            }
        });

    } else {
        result = result.mapped();

        let message;
        for (fields in result){
            message = result[fields].msg
            break;
        }        
        render_updateProf(message);
    }
});
    
// F/D change password
router.post('/changePassword', changePwdValidator, (req, res) => {
       
    function render_changePwd (error) {
        data = req.session.data

        return res.render("register", {
            error: error,
            user: data
        });
    }
    
    let result  = validationResult(req);
    let email = req.session.data.email;

    if (result.errors.length === 0) {
        const {old_pwd, new_pwd, renew_pwd} = req.body
        AFD.find({ email: email }, function (err, data) {
            if (data.length != 0) {
                let data_pwd = data[0].password;
                const match = bcrypt.compareSync(old_pwd, data_pwd) 
                if (!match){
                    render_changePwd("Old password is wrong!");
                } else {
                    const hashed = bcrypt.hashSync(new_pwd, 10)

                    const filter = {email: email}
                    const update_query = {password: hashed}

                    // update function
                    AFD.updateOne(filter, update_query, (err,result) => {
                        if (err) {
                            console.log(err);
                        } 
                        else {
                            res.redirect("/index");
                        }
                    });
                }
            }
        });

    } else {
        result = result.mapped();

        let message;
        for (fields in result){
            message = result[fields].msg
            break;
        }        
        render_changePwd(message);
    }
});

module.exports = router