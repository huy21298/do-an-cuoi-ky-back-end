const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chiTietBaiThiCuaSinhVienchema = new Schema({

    sinh_vien_id: { type: Schema.Types.ObjectId, ref: "SinhVien" },
    bai_thi_id: { type: Schema.Types.ObjectId, ref: "BaiThi" },

},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("ChiTietBaiThiSinhVien", chiTietBaiThiCuaSinhVienchema, "ct_bai_thi_sinh_vien");
