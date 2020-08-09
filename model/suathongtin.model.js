const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const data = new Schema(
  {
    ma_sv: { type: String, default: "" },
    ho: { type: String, default: "" },
    ten: { type: String, default: "" },
    ngay_sinh: { type: String, default: new Date() },
    gioi_tinh: { type: Boolean, default: true },
    sdt: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { _id: false }
);
const suaThongTinSchema = new Schema(
  {
    nguoi_dung_id: { type: Schema.Types.ObjectId, ref: "SinhVien" },
    ly_do: String,
    thong_tin_sua: data,
    la_sinhvien: Boolean,
    trang_thai: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJson: {
      virtuals: true,
      getters: true,
    },
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SuaThongTin",
  suaThongTinSchema,
  "sua_thong_tin"
);
