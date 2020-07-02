const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiThiSchema = new Schema({
 
    id : Number,
    tieu_de : String,
    nguoi_tao : Number, 
    lop_hoc_id : Number,
    ngay_tao : Date,
    ngay_thi : Date,
    thoi_gian_thi : Date,
    trang_thai : Boolean,

});

module.exports = mongoose.model("BaiThi", baiThiSchema, "bai_thi");
