var express = require('express')
var router = express.Router()

const AFD = require("../models/AFD_model"); // Database for user as Admin and FD
const Student = require("../models/student_model"); // Database for user as Student
const Post = require("../models/post_model"); // Database for all Post

router.get("/:id", (req, res, next) => {
    var user_id = req.params.id.slice(1);
    var role = req.params.id.slice(0,1);

    if (!req.session.userId) {
        res.redirect("/index");
    } else if (role == 0){
        Student.find({googleId: user_id}, function(err, data_student){
            if (data_student) {
                userdata = data_student[0];
                
                // Initialize record of posts
                var record = []
                // Added sort here to sort by createdAt in decending order
                // Now sort by which post was lastly updated
                Post.find({user_id: user_id}).sort({updatedAt:-1}).then(function(posts){
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
                    res.render("userprofile", {record: record, user: req.session.data, userdata: userdata});
                });
            }
        });
    } else if (role == 1) {
        AFD.find({ _id: user_id}, function (err, data_afd){
            if (data_afd) {
                userdata = data_afd[0];

                // Initialize record of posts
                var record = []
                // Added sort here to sort by createdAt in decending order
                // Now sort by which post was lastly updated
                Post.find({user_id: user_id}).sort({updatedAt:-1}).then(function(posts){
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
                    res.render("userprofile", {record: record, user: req.session.data, userdata: userdata});
                })
            }
        });
    }
});

module.exports = router