const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CauHoichema = new Schema({

    id: Number,
    version: Number,
    tieu_de: String,
    noi_dung: String,
    dap_an_a: String,
    dap_an_b: String,
    dap_an_c: String,
    dap_an_d: String,
    dap_an_dung: String,
    nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
    diem: Number,
    loai_cau_hoi: {
        type: Boolean,
        default: true,
        get: (v) => {
            return v === true ? "Trắc Nghiệm" : "Tự luận";
        },
    },
    danh_muc_id: { type: Schema.Types.ObjectId, ref: "DanhMuc" },
    la_version_moi_nhat: Boolean
}, {
    timestamps: true,
});

module.exports = mongoose.model("CauHoi", CauHoichema, "cau_hoi");
