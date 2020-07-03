const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CauHoichema = new Schema({

    id : Number,
    version : Number,
    tieu_de : String,
    noi_dung : String,
    dap_an_a : String,
    dap_an_b : String,
    dap_an_c : String,
    dap_an_d : String,
    dap_an_dung : String,
    nguoi_tao_id : Number,
    diem : Number,
    loai_cau_hoi : Boolean,
    danh_muc_id : Number,
    la_version_moi_nhat : Boolean

},{
    timestamps: true,
});

module.exports = mongoose.model("CauHoi", CauHoichema, "cau_hoi");
