const express = require("express");
const router = express.Router();

// Routes
// =============================================================
router.get('/', (req, res) => {


    var data = {
        hello: ' World'
    }

    res.render('index', data);

});

router.post('/', (req, res) => {

    console.log(req.body);

});

module.exports = router;