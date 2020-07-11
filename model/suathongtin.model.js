const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const suaThongTinSchema = new Schema({
    nguoi_dung_id: { type: Schema.Types.ObjectId, ref: "SinhVien" },
    ly_do: String,
    trang_thai: {
        type: Boolean,
        default: true,
        get: (v) => {
          return v === true ? "Xác nhận" : "Chưa xác nhận";
        },
      },

},
{
    toObject: {
        virtuals: true
    },
    toJson: {
        virtuals: true
    },
    timestamps: true,
});

module.exports = mongoose.model("SuaThongTin", suaThongTinSchema, "sua_thong_tin");
