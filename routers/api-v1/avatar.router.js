var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/avatar" });
const { CapNhatAvatar } = require("../../controllers/suathongtin.controller");
router.post("/:id",upload.single("avatar"), CapNhatAvatar);
module.exports = router;
