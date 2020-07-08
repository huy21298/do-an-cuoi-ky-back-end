/** Import third library  */
const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

/** Import custom module */
require("./model/connectDB")();
const baiThiRoute = require("./routers/api-v1/baithi.router");
const lopHoc = require("./routers/api-v1/trangchu.router");
const dSSinhVienLopHoc = require("./routers/api-v1/dssinhvienlophoc.router")
const thongTinSv = require("./routers/api-v1/thongtinsinhvien.model");

/** Define middleware */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/** Define route */
app.use("/api/v1/bai-thi", baiThiRoute); // localhost/api/v1/bai-thi
app.use("/api/v1/lop-hoc", lopHoc); // localhost/api/v1/lop-Hoc
app.use("/api/v1/danh-sach-sinh-vien", dSSinhVienLopHoc); //localhost/api/v1/danh-sach-sinh-vien
app.use("/api/v1/thong-tin-sinh-vien", thongTinSv);


module.exports = app;
