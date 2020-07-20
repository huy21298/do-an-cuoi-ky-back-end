var express = require("express");
var router = express.Router();
const { loadbaiTap } = require("../../controllers/baitap.controller");
router.get("/:id", loadbaiTap);
module.exports = router;