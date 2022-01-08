var mongoose = require('mongoose')
var Schema = mongoose.Schema

postSchema = new Schema( {
    user_id: String,
	user_name: String,
    user_avatar: String,
    user_role: String,
    title: String,
    content: String,
    post_img: String,
    url_youtube: String,
    // comments: [
    //     {
    //         type: String,
    //     }
    // ]
}, {collection: 'post', timestamps: true}),

Post = mongoose.model('Posts', postSchema)

module.exports = Post;