const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cauHoiTepTinschema = new Schema({

    noi_dung : String,
    duong_dan: String
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("CauHoiTepTin", cauHoiTepTinschema, "cau_hoi_tep_tin");
