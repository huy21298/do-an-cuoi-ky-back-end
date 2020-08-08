var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/upload" });
const fs = require("fs");
const { loadbaiTap, nopBaiTap, huyBaiTap} = require("../../controllers/baitap.controller");
router.get("/:id", loadbaiTap);
router.post("/nop-bai", nopBaiTap);
router.post("/huy-bai-tap", huyBaiTap)
module.exports = router;
