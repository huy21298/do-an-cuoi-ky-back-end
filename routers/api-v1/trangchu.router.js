var express = require("express");
var router = express.Router();
const { loadLopHocThamGia } = require("../../controllers/trangchu.controller");
router.get("/:id", loadLopHocThamGia);
module.exports = router;
