const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const danhMucTapSchema = new Schema({
    id: Number,
    tieu_de: String,
    mo_ta: String,
    nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },

},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });
module.exports = mongoose.model("DanhMuc", nopBaiTapSchema, "danh_muc");
