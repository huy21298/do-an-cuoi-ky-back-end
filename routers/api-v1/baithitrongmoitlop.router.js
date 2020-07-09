var express = require("express");
var router = express.Router();
const { loadBaiThiTrongMotLop } = require("../../controllers/baithitrongmotlop.controller");
router.get("/:id", loadBaiThiTrongMotLop);
module.exports = router;
