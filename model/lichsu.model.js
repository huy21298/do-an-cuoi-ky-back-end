const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lichSuSchema = new Schema({

    id : Number,
    noi_dung : String,
    nguoi_tao_id : Number, 
    ngay_tao : Date,
    lop_hoc_id : Number

},
{
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

module.exports = mongoose.model("LichSu", lichSuSchema, "lich_su");
