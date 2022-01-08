var express = require('express')
var router = express.Router()
const path = require("path");

router.use(express.static(path.join(__dirname, "./")));

const AFD = require("../models/AFD_model"); // Database for user as Admin and FD
const Student = require("../models/student_model"); // Database for user as Student
const Post = require("../models/post_model"); // Database for all Post

router.get("/main", (req, res, next) => {
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
            Post.find({}).sort({updatedAt:-1}).then(function(posts){
                record = posts
                res.render("main", {record: record, user: req.session.data, userId: userId});
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
            Post.find({}).sort({updatedAt:-1}).then(function(posts){
                record = posts
                res.render("main", {record: record, user: req.session.data, userId: userId});
            })
        });
    }
});

router.post("/viewPost", (req, res, next) => {
    var body = req.body
    
    Post.find({_id: body.post_id}).then(function(posts){
        res.send(posts)
    })
});

module.exports = router