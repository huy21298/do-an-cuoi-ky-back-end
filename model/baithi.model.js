const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiTapSchema = new Schema({
  od: String,
});

module.exports = mongoose.model("BaiTap", baiTapSchema, "bai_tap");
