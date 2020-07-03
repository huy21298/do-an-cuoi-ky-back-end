const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiThiSchema = new Schema(
  {
    id: Number,
    tieu_de: String,
    lop_hoc_id: { type: Schema.Types.ObjectId, ref: "LopHoc" },
    ngay_thi: Date,
    thoi_gian_thi: Date,
    trang_thai: {
      type: Boolean,
      default: true,
      get: (v) => {
        return v === true ? "Phát hành" : "Bản nháp";
      },
    },
    nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
  },
  {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
  }
);

module.exports = mongoose.model("BaiThi", baiThiSchema, "bai_thi");
