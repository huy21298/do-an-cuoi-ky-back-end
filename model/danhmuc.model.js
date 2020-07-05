const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const danhMucTapSchema = new Schema({
 
    id : Number,
    tieu_de : String, 
    mo_ta : String,
    nguoi_tao : Number

},{
    timestamps: true,
});
module.exports = mongoose.model("DanhMuc", nopBaiTapSchema, "danh_muc");
