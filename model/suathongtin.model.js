const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const suaThongTinSchema = new Schema({
    ma_sv: String,
    ly_do: String,
    lop_hoc: Number,
    trang_thai: Boolean

}, {
    timestamps: true,
});

module.exports = mongoose.model("SuaThongTin", suaThongTinSchema, "sua_thong");
