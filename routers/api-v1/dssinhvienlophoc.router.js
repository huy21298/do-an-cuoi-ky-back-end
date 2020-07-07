var express = require("express");
var router = express.Router();
const { loadDsSinhVienTrongLop } = require("../../controllers/dssinhvientronglop.controller");
router.get("/:id",loadDsSinhVienTrongLop );
module.exports = router;
