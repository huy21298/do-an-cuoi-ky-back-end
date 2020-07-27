const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inviteSchema = new Schema({

    lop_hoc_id: { type: Schema.Types.ObjectId, ref: "LopHoc" },
    nguoi_moi_id: [{ type: Schema.Types.ObjectId, ref: "NguoiDung" }],
    kich_hoat: Boolean,
    code: String,
    email: String
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("Invite", inviteSchema, "invite");
