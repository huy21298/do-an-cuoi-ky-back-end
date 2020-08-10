var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/upload" });
const fs = require("fs");
const { loadbaiTap, nopBaiTap, huyBaiTap, xemBaiTapHoanThanh} = require("../../controllers/baitap.controller");
router.get("/:id", loadbaiTap);
router.post("/nop-bai", nopBaiTap);
router.post("/huy-bai-tap", huyBaiTap)
router.get("/xem-diem/:bai_tap_id", xemBaiTapHoanThanh)
module.exports = router;

