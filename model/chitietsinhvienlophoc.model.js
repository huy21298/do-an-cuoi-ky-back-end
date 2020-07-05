const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chiTietSinhVienLopHocschema = new Schema({

    sinh_vien_id: { type: Schema.Types.ObjectId, ref: "SinhVien" },
    lop_hoc_id: { type: Schema.Types.ObjectId, ref: "LopHoc" },

},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("ChiTietSinhVienLopHoc", chiTietSinhVienLopHocschema, "ct_sinh_vien_lop_hoc");
