var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/upload" });
const fs = require("fs");
const { loadbaiTap, nopBaiTap, huyUpLoad} = require("../../controllers/baitap.controller");
router.get("/:id", loadbaiTap);
router.post("/nop-bai", nopBaiTap);
module.exports = router;


// router.post("/:idBaiTap/sinh-vien",upload.single("upload"), nopbaiTap); // id sinh viên , id bài tập
// router.patch("/:id/huy-file", huyUpLoad); //id của nộp bài tập