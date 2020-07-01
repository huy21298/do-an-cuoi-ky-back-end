/** Chỗ này import những thư viện bên ngoài vào  */
const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

/** Chỗ này import những thư viện do mình viết ra */
require("./model/connectDB")();

/** Chỗ này khai báo middleware */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/** Chỗ này khai báo router */

module.exports = app;
