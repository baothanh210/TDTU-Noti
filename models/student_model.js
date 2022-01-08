const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    /**Google ID for Student google account */
    googleId:{
        type: String
    },

    /**Email for Student account */
    email:{
        type: String,
        required: false
    },

    /**Username for Student account */
    name:{
        type: String,
        required: false
    },

    /**Class for Student account */
    class:{
        type: String,
        required: false
    },

    /**Faculty for Student account */
    faculty:{
        type: String,
        required: false
    },
    /**Avatar for Student account */
    avatar:{
        type: String,
        required: false
    },
    /**Role for Student account */
    role: {
        type: String,
        required: true
    },

}, {collection: "student"}),

Student = mongoose.model('Student', studentSchema)

module.exports = Student