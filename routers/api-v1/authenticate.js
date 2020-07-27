const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(res);
});

module.exports = router;