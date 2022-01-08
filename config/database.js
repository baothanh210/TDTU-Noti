const mongoose = require('mongoose')

// Connect to MongoDB database
// var url = "mongodb://localhost:27017/TDTU_Noti";
var url ="mongodb+srv://dbTDTU:dbTDTU@cluster0.ac9it.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var db = mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            console.log("MongoDB Connection Succeeded.");
        } else {
            console.log("Error in DB connection : " + err);
        }
    }
);

// MongoDB connection console throws an error if it fails
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

