const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiThiCuaSinhVienchema = new Schema({

    sinh_vien_id : Number,
    bai_thi_id : Number,
    cau_hoi_id : Number,
    dap_an_da_chon : String

});

module.exports = mongoose.model("BaiThiCuaSinhVien", baiThiCuaSinhVienchema, "bai_thi_sinh_vien");
