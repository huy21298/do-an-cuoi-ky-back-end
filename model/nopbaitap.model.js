const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nopBaiTapSchema = new Schema({
 
  bai_tap_id : Number,
  sinh_vien_id : Number,
  bai_nop : String,
  thoi_gian_nop : Date

},{
  timestamps: true,
});

module.exports = mongoose.model("NopBaiTap", nopBaiTapSchema, "nop_bai_tap");
