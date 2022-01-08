var express = require('express')
var router = express.Router()

// This logout is not protected, if user type in url '/something/logout', it will log out
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                res.send(error);
            } else {
                res.redirect("/index");
            }
        });
    }
});

module.exports = router