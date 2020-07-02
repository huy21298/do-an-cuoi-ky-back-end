const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiTapSchema = new Schema({
  id: Number,
  tieu_de :String,
  ngay_tao: Date,
  ngay_het_han: Date,
  nguoi_tao: Number,
  lop_hoc: Number

});

module.exports = mongoose.model("BaiTap", baiTapSchema, "bai_tap");
