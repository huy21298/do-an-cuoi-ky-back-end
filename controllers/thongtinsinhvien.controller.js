/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const LopHoc = require("../model/lophoc.model");
const SinhVien = require("../model/sinhvien.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const LoadThongTinSinhVien = (req, res) => {

    const _id = mongoose.Types.ObjectId(req.params.id);
    SinhVien.findOne({_id})
    .populate({path: "ds_lop_hoc", select: "tieu_de"})
    .populate({path: "nguoi_tao_id" ,select: "ho ten"})
        .then(thongTinSinhVien => {
            const data = {
                thongTinSinhVien
            }
            res.json(data).status(200);

        })
        .catch(e => noticeCrash(res));

}
module.exports = { LoadThongTinSinhVien }