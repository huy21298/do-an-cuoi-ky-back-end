const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lopHocSchema = new Schema({
  id: Number,
  tieu_de :String,
  nguoi_tao_id : Number,
});

module.exports = mongoose.model("LopHoc", lopHocSchema, "lop_hoc");
