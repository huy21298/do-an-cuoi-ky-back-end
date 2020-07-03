const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nguoiDungSchema = new Schema({
    id: Number,
    ho: String,
    ten: String,
    anh_dai_dien: String,
    email: String,
    ngay_sinh: Date,
    mat_khau: String,
    loai: Boolean,
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

nguoiDungSchema.virtual("hoten").get(function () {
    return this.ho + " " + this.ten;
});
module.exports = mongoose.model("NguoiDung", nguoiDungSchema, "nguoi_dung");
