var router = require("express").Router();
const { loginHandle } = require("../../controllers/login.controller");
router.post("/", loginHandle);
module.exports = router