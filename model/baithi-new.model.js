const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;


const cauHoi = {
  cau_hoi_id: { type: Schema.Types.ObjectId, refPath: 'ds_cau_hoi.loai' },
  loai: { type: String, enum: ['TracNghiem', 'TuLuan'] },
}
const baiThi1Schema = new Schema(
  {
    tieu_de: String,
    nguoi_tao_id: { type: Schema.Types.ObjectId, ref: 'NguoiDung' },
    lop_hoc_id: { type: Schema.Types.ObjectId, ref: 'LopHoc' },
    ngay_thi: Date,
    thoi_gian_thi: {type: Number, required: true},
    trang_thai: {type: Boolean, default: true},
    ds_sinh_vien: [{type: Schema.Types.ObjectId, ref: 'SinhVien'}],
    ds_sinh_vien_da_thi: [{type: Schema.Types.ObjectId, ref: "SinhVien"}],
    ds_cau_hoi: [cauHoi],
    thoi_gian_tre: {
      type: Date,
      default: function() {
        return moment(this.ngay_thi).add("15", "minute").toDate()
      }
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
  }
);

baiThi1Schema.virtual("duoc_phep_thi").get(function () {
  const ngay_thi = moment(this.ngay_thi)

  const thoi_gian_tre = moment(ngay_thi).add("15", "minute");
  const thoi_gian_hien_tai = moment(new Date());
  const duoc_phep_thi = thoi_gian_tre > thoi_gian_hien_tai;
  return duoc_phep_thi;
});

baiThi1Schema.virtual("ngay_thi_format").get(function () {
  return moment(this.ngay_thi).lang("vi").format("lll") + "";
});

baiThi1Schema.virtual("tieu_de_format").get(function() {
  if (this.tieu_de) {
      if (this.tieu_de.length <= 12) {
          return this.tieu_de;
      }
      return this.tieu_de.slice(0, 12) + "...";
  }
})


module.exports = mongoose.model("BaiThi", baiThi1Schema, "bai_thi");