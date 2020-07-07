const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiThiCuaSinhVienchema = new Schema({

    sinh_vien_id: { type: Schema.Types.ObjectId, ref: "SinhVien" },
    bai_thi_id: { type: Schema.Types.ObjectId, ref: "BaiThi" },
    cau_hoi_id: { type: Schema.Types.ObjectId, ref: "CauHoi" },
    dap_an_da_chon: String

},
{
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

module.exports = mongoose.model("BaiThiCuaSinhVien", baiThiCuaSinhVienchema, "bai_thi_sinh_vien");
