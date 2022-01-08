var express = require('express')
var router = express.Router()

const AFD = require("../models/AFD_model"); // Database for user as Admin and FD
const Student = require("../models/student_model"); // Database for user as Student
const Post = require("../models/post_model"); // Database for all Post

router.get("/profile", (req, res, next) => {
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
            Post.find({user_id: userId}).sort({updatedAt:-1}).then(function(posts){
                record = posts
                res.render("profile", {record: record, user: req.session.data});
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
            Post.find({user_id: userId}).sort({updatedAt:-1}).then(function(posts){
                record = posts
                res.render("profile", {record: record, user: req.session.data});
            })
        });
    }
});

//Cloudinary storage config
const { CloudinaryStorage } = require('multer-storage-cloudinary');
var bodyParser = require('body-parser')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "PostImage",
        allowedFormats: ["jpg", "png"],
        transformation: [{
            width: 500,
            height: 500,
            crop: "limit"
        }]
    }
})

const upload = multer({ storage: storage });

// Call Youtube video IDs getter
var idGetter = require('./function/youtubeID.js')

// ============================== POSTING SECTION ======================================
// Add post
router.post('/profile', upload.single("postImage"), (req, res) => {
    if(req.session.userRole == 0) {
        Student.find({googleId: req.session.userId}, function(err, data_student){
            req.session.data = data_student[0];           
        });
    }
    else {
        AFD.find({_id: req.session.userId}, function (err, data_afd){
            req.session.data = data_afd[0];
        });
    }

    if (req.session.userRole == 0){
        user_role = "0"
    } else {
        user_role = "1"
    }

    // Get post body
    var postData = {
        user_id: req.session.userId,
        user_name: req.session.data.name,
        user_avatar: req.session.data.avatar,
        user_role: user_role,
        title: req.body.title,
		content: req.body.content,
        url_youtube: idGetter.ytgetID(req.body.urlYoutube),
		post_img: req.file
	};

    var new_post = undefined

    // Handler for empty field
    Object.keys(postData)
    .forEach(key => postData[key] === undefined ? delete postData[key] : {});
    
    if(postData.post_img !== undefined){
        new_post = new Post({
                                user_id: postData.user_id,
                                user_name: postData.user_name,
                                user_avatar: postData.user_avatar,
                                user_role: postData.user_role,
                                title: postData.title,
                                content: postData.content,
                                url_youtube: postData.url_youtube,
                                post_img: postData.post_img.path})
    } else {
        new_post = new Post(postData)
    }

    // Write above thing to Post
    new_post.save()

    Post.findOne({user_id: req.session.userId}).then(function(post){
        var postDataAjax = {
            post_id: new_post._id,
            user_id: postData.user_id,
            user_name: postData.user_name,
            user_avatar: postData.user_avatar,
            user_role: postData.user_role,
            title: postData.title,
            content: postData.content,
            url_youtube: postData.url_youtube,
            post_img: postData.post_img
        };

        // Send data back to AJAX to add it without page reload
        res.send(postDataAjax)
    })
    
});

// Delete post
router.post('/deletePost', (req, res) => {
    var body = req.body

    Post.deleteOne({_id: body.post_id}, (err, data) => {
        if(err) console.log(err)
        else{
            res.send(data)
        }
    })
});

module.exports = router