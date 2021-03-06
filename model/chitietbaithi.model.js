const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chiTietBaiThiSchema = new Schema({

    bai_thi_id: { type: Schema.Types.ObjectId, ref: "BaiThi" },
    cau_hoi_id: [{ type: Schema.Types.ObjectId, ref: "CauHoi" }],
    diem: Number,
    dap_an: String,
    version_cau_hoi: String
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("ChiTietBaiThi", chiTietBaiThiSchema, "ct_bai_thi");
