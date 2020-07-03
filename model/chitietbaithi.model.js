const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chiTietBaiThiSchema = new Schema({

    bai_thi_id : String,
    cau_hoi_id : String,
    diem : String,
    dap_an : String,
    version_cau_hoi : String
},{
    timestamps: true,
});

module.exports = mongoose.model("ChiTietBaiThi", chiTietBaiThiSchema, "ct_bai_thi");
