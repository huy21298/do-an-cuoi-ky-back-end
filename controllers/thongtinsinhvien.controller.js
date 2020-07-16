/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const LopHoc = require("../model/lophoc.model");
const SinhVien = require("../model/sinhvien.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const LoadThongTinSinhVien = (req, res) => {

    const _id = req.params.id;
    SinhVien.findById({ _id }).select("ma_sv ho ten email ngay_sinh anh_dai_dien")
        .then(thongTinSinhVien => {
            const data = {
                thongTinSinhVien
            }
            res.json(data).status(200);

        })
        .catch(e => noticeCrash(res));

}


module.exports = { LoadThongTinSinhVien }