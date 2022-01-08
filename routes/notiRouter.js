var express = require('express')
var router = express.Router()

const AFD = require("../models/AFD_model"); // Database for user as Admin and FD
const Student = require("../models/student_model"); // Database for user as Student
const Post = require("../models/post_model"); // Database for all Post

router.get("/noti", (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/index");
    } else if(req.session.userRole == 0) {

        Student.find({googleId: req.session.userId}, function(err, data_student){
            req.session.data = data_student[0];
            userId = data_student[0].googleId;
                
            // Initialize record of posts
            var record = []
            // Added sort here to sort by createdAt in decending order
            // Now sort by which post was lastly updated
            Post.find({user_role: 1}).sort({updatedAt:-1}).then(function(posts){
                record = posts
                res.render("noti", {record: record, user: req.session.data, userId: userId});
            })
        });
    }
    else {

        AFD.find({ _id: req.session.userId}, function (err, data_afd){
            req.session.data = data_afd[0];
            userId = data_afd[0]._id;
            
            // Initialize record of posts
            var record = []
            // Added sort here to sort by createdAt in decending order
            // Now sort by which post was lastly updated
            Post.find({user_role: 1}).sort({updatedAt:-1}).then(function(posts){
                record = posts
                res.render("noti", {record: record, user: req.session.data, userId: userId});
            })
        });
    }
});

router.get("/details/:id", (req, res, next) => {
    var post_id = req.params.id;

    if (!req.session.userId) {
        res.redirect("/index");
    } else { 
        // Initialize record of posts
        var record = []
        // Added sort here to sort by createdAt in decending order
        // Now sort by which post was lastly updated
        Post.find({_id: post_id}).sort({updatedAt:-1}).then(function(posts){
            record = posts
            if(req.session.userRole == 0) {
                Student.find({googleId: req.session.userId}, function(err, data_student){
                    req.session.data = data_student[0];
                });
            } else {
                AFD.find({_id: req.session.userId}, function (err, data_afd){
                    req.session.data = data_afd[0];
                });
            }
            res.render("details", {record: record, user: req.session.data});
        });
    }
});
module.exports = router