const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cauHoiTuLuanschema = new Schema({

    noi_dung : String
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("CauHoiTuLuan", cauHoiTuLuanschema, "cau_hoi_tu_luan");
