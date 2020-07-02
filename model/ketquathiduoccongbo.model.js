const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ketQuaThiDuocCongBoSchema = new Schema({
    id : Number,
    sinh_vien_id : Number,
    lop_hoc_id : Number,
    bai_thi_id : Number,
    cau_hoi_id : Number,
    la_cau_dung : Boolean,
    diem : Number,
    ngay_cong_bo : Date

});

module.exports = mongoose.model("KetQuaThiDuocCongBo", ketQuaThiDuocCongBoSchema, "ket_qua_thi_duoc_cong_bo");
