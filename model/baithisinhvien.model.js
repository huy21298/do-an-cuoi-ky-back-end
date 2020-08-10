const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cauHoi = {
    cau_hoi_id: {type: Schema.Types.ObjectId, refPath:'bai_thi_sinh_vien.loai'},
    loai: {type: String, enum:['TracNghiem', 'TuLuan']},
    dap_an: { type: String }
  }
const baiThiCuaSinhVienchema = new Schema({

    sinh_vien_id: { type: Schema.Types.ObjectId, ref: "SinhVien" },
    bai_thi_id: { type: Schema.Types.ObjectId, ref: "BaiThi" },
    lop_hoc_id: { type: Schema.Types.ObjectId, ref: "LopHoc" },
    bai_thi_sinh_vien: [cauHoi]

},
{
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

module.exports = mongoose.model("BaiThiSinhVien", baiThiCuaSinhVienchema, "bai_thi_sinh_vien");
