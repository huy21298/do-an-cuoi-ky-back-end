const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const diemSchema = new Schema({
    loai: String,
    diem: Number,
    sinh_vien_id: {ref: "SinhVien", type: Schema.Types.ObjectId},
    lop_hoc_id: { ref: "LopHoc", type: Schema.Types.ObjectId},
    ex_id: { ref: "BaiTap", type: Schema.Types.ObjectId}
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });
module.exports = mongoose.model("Diem", diemSchema, "diem");
