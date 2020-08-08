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
    //ngay_thi: Date,
    ngay_thi: Date,
    thoi_gian_thi: { type: Number, required: true },
    trang_thai: { type: Boolean, default: true },
    ds_sinh_vien: [{ type: Schema.Types.ObjectId, ref: 'SinhVien' }],
    ds_sinh_vien_da_thi: [{ type: Schema.Types.ObjectId, ref: "SinhVien" }],
    ds_cau_hoi: [cauHoi]
  },
  {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
  }
);

baiThi1Schema.virtual("duoc_phep_thi").get(function () {
  const ngay_thi = moment(this.ngay_thi)  // vd 8/8/2020 12:05
  const thoi_gian_tre = moment(ngay_thi).add("15", "minute");  // vd 8/8/2020 12:20
  const thoi_gian_hien_tai = moment(new Date()); //8/8/2020 12:00 // và 12:25
  const duoc_phep_thi = thoi_gian_tre > thoi_gian_hien_tai; //12:20 >12:00  được thi ,nếu 12:20 > 12:25 không được thi
  return duoc_phep_thi;

});
baiThi1Schema.virtual("ngay_thi_format").get(function () {
  return moment(this.ngay_thi).format("DD/MM HH:mm") + "";
});

module.exports = mongoose.model("BaiThi", baiThi1Schema, "bai_thi");
