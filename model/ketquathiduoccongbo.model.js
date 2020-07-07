const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ketQuaThiSchema = new Schema({
    sinh_vien_id : { type: Schema.Types.ObjectId, ref: "SinhVien" },
    lop_hoc_id: { type: Schema.Types.ObjectId, ref: "LopHoc" },
    bai_thi_id: { type: Schema.Types.ObjectId, ref: "BaiThi" },
    cau_hoi : Array,
    ngay_cong_bo : Date

},
{
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

module.exports = mongoose.model("KetQuaThi", ketQuaThiSchema, "ket_qua_thi");
