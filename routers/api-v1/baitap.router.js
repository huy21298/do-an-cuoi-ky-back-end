var express = require("express");
var router = express.Router();
const fileUpload = require('express-fileupload');
const { loadbaiTap, nopBaiTap, huyBaiTap, xemBaiTapHoanThanh} = require("../../controllers/baitap.controller");
router.get("/:id", loadbaiTap);
router.post("/nop-bai", fileUpload(), nopBaiTap);
router.post("/huy-bai-tap", huyBaiTap)
router.get("/xem-diem/:bai_tap_id", xemBaiTapHoanThanh)
module.exports = router;

