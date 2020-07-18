const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiThi1Schema = new Schema(
  {
    id : {type: Schema.Types.ObjectId, ref: "BaiThiGoc"}, 
    tieu_de :String, 
    loai_bai_thi : Number,
    lop_hoc_id: { type: Schema.Types.ObjectId, ref: "LopHoc" },
    ngay_thi : Date,
    thoi_gian_thi: Date,
    trang_thai: {
      type: Boolean,
      default: true,
      get: (v) => {
        return v === true ? "Phát hành" : "Bản nháp";
      },
    },
    nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
    ds_sinh_vien : [{ type: Schema.Types.ObjectId, ref: "SinhVien" }],
    ds_cau_hoi : [{type: Array, default: []}]
  },
  {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
  }
);

module.exports = mongoose.model("BaiThi1", baiThi1Schema, "bai_thi");
