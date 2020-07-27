/** Import third library  */
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
// const session = require('express-session');
// const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;
// const {check} = require('express-validator');
/** Import custom module */
require("./model/connectDB")();
const baiThiRoute = require("./routers/api-v1/baithi.router");
const baiTapRoute = require("./routers/api-v1/baitap.router");
const lopHocRoute = require("./routers/api-v1/lophoc.router");
const sinhVienRoute = require("./routers/api-v1/sinhvien.router");
const validate = require("./validator/sinhvien.validator");
const loGinRoute =require("./routers/api-v1/login.router");
const dangNhapRoute = require("./routers/api-v1/dang-nhap.router");
/** Define middleware */
app.use(bodyParser.urlencoded({ extended: true })); // => khai báo để sử dụng req.body (lấy ra những biến POST)
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/** Define middleware cho passport */ 
// require("./model/passport")(passport);
// app.use(session({
//   secret : "secret",
//   saveUninitialized: true,
//   resave: true
// }))
app.use(passport.initialize()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./authenticate/passport')(passport);
// app.use(passport.session());

/** Define route */

app.use("/api/v1/dang-nhap", dangNhapRoute)

app.use(passport.authenticate("jwt", { session: false }));
app.use("/api/v1/bai-thi", baiThiRoute); // localhost/api/v1/bai-thi
app.use("/api/v1/bai-tap", baiTapRoute); // localhost/api/v1/bai-thi
app.use("/api/v1/lop-hoc", lopHocRoute); // localhost/api/v1/lop-Hoc
app.use("/api/v1/sinh-vien", sinhVienRoute); //localhost/api/v1/thong-tin-sinh-vien
// app.use("/api/v1/login",validate.validateLogin(),loGinRoute);
module.exports = app;
