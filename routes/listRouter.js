var express = require('express')
var router = express.Router()

const AFD = require("../models/AFD_model"); // Database for user as Admin and FD
const Student = require("../models/student_model"); // Database for user as Student

router.get("/list", (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/index");
    } else if(req.session.userRole == 0) {
        
        Student.find({googleId: req.session.userId}, function(err, data_student){
            req.session.data = data_student[0]

            var list_all = []
            var list_student = []
            var list_afd = []

            Student.find({}).then(function(data_student){
                list_student = data_student

                AFD.find({}).then(function(data_afd){
                    list_afd = data_afd;

                    list_all = list_student.concat(list_afd);

                    res.render("list", {list_all: list_all, user: req.session.data});
                });
            });
        });
    }
    else {

        AFD.find({ _id: req.session.userId}, function (err, data_afd){
            req.session.data = data_afd[0];

            var list_all = []
            var list_student = []
            var list_afd = []

            Student.find({}).then(function(data_student){
                list_student = data_student

                AFD.find({}).then(function(data_afd){
                    list_afd = data_afd;

                    list_all = list_student.concat(list_afd);

                    res.render("list", {list_all: list_all, user: req.session.data});
                });
            });
        });
    }
});
module.exports = router