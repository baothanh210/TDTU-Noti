const mongoose = require('mongoose')

const AFDSchema = new mongoose.Schema({
    /**Name for Admin,F/D account */
    name:{
        type: String,
        required: false
    },

    avatar:{
        type: String,
        required: false
    },
    
    /**Username for Admin,F/D account */
    email:{
        type: String,
        required: true
    },

    /**Password for Admin,F/D account */
    password:{
        type: String,
        required: true
    },

    /**Role for Admin,F/D account */
    role: {
        type: String,
        required: true
    },

    /**Post rights for Admin,F/D account */
    rights : {
        type : Array ,
        "default" : []
    }

}, {collection: "AFD"}),

AFD = mongoose.model('AFD', AFDSchema)

module.exports = AFD