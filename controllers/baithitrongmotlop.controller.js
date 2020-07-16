/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const BaiTap = require("../model/baitap.model");
const BaiThi = require("../model/baithi-new.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadBaiThiTrongMotLop = (req, res) => {

    const lop_hoc_id = mongoose.Types.ObjectId(req.params.id)
    BaiThi.find({ lop_hoc_id }).select("tieu_de ngay_thi nguoi_tao_id")
        .populate({ path: "nguoi_tao_id", select: "ho ten" })
        .then(dsBaiThi => {
            BaiTap.find({ lop_hoc_id }).select("tieu_de han_nop_bai nguoi_tao_id")
                .populate({ path: "nguoi_tao_id", select: "ho ten" })
                .then(baiTap => {
                    const data = {
                        dsBaiThi, baiTap
                    }
                    res.json(data).status(200);
                })
                .catch(e => noticeCrash(res));
        })
        .catch(e => noticeCrash(res));
}
module.exports = { loadBaiThiTrongMotLop }