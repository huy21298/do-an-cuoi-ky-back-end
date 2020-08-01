const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lichSuSchema = new Schema({

    id : Number,
    ma_log: String,
    noi_dung : String,
    nguoi_tao_id : Number,
    loai_nguoi_dung: Number

},
{
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

module.exports = mongoose.model("LichSu", lichSuSchema, "lich_su");
