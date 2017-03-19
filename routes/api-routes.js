const express = require("express");
const router = express.Router();

router.post("/signup", function(req, res) {
    console.log('SIGNUP')

    console.log(req.body)

});

router.post("/login", function(req, res) {
    console.log('LOGIN')

    console.log(req.body)

});

module.exports = router;