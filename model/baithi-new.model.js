const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;


const cauHoi = {
  cau_hoi_id: {type: Schema.Types.ObjectId, refPath:'ds_cau_hoi.loai'},
  loai: {type: String, enum:['TracNghiem', 'TuLuan']},
}
const baiThi1Schema = new Schema(
  {
    tieu_de: String,
    nguoi_tao_id: {type: Schema.Types.ObjectId, ref:'NguoiDung'},
    lop_hoc_id: {type: Schema.Types.ObjectId, ref: 'LopHoc'},
    ngay_thi: Date,
    // ngay_thi: {
    //   type: Date,
    //   required: true,
    //   get: v => moment(v).format("DD/MM/yyyy") + ""
    // },
    thoi_gian_thi: {type: Number, required: true},
    trang_thai: {type: Boolean, default: true},
    ds_sinh_vien: [{type: Schema.Types.ObjectId, ref: 'SinhVien'}],
    ds_cau_hoi: [cauHoi]
  },
  {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
  }
);

module.exports = mongoose.model("BaiThi", baiThi1Schema, "bai_thi");

module.exports = mongoose.model("BaiThi", baiThi1Schema, "bai_thi");
