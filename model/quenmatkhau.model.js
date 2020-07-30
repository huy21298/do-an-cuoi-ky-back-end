const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quenMatKhauSchema = new Schema({
    expire: Number,
    code: String,
    email: String,
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

module.exports = mongoose.model("QuenMatKhau", quenMatKhauSchema, "quen_mat_khau");
