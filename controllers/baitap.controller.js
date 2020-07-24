/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const CauHoi = require("../model/cauhoi.model");
const BaiTap = require("../model/baitap.model");
const SinhVien = require("../model/sinhvien.model");
const NopBaiTap = require("../model/nopbaitap.model");
const fs = require("fs");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
const loadbaiTap = (req, res) => {
    const _id = req.params.id;
    BaiTap.findById({ _id })
        .select("tieu_de noi_dung ngay_het_han nguoi_tao_id lop_hoc_id han_nop_bai")
        .populate({ path: "nguoi_tao_id", select: "ho ten" })
        .populate({ path: "lop_hoc_id", select: "tieu_de" })
        .then(baiTap => {
            res.json({ 'success': true, baiTap }).status(200);
        })
        .catch(e => noticeCrash(res));
}

const nopbaiTap = (req, res) => {
    const _id = mongoose.Types.ObjectId(req.params.idSinhVien);
    SinhVien.findOne({ _id })
        .then(sinhVien => {
                let _id = mongoose.Types.ObjectId(req.params.idBaiTap);
                BaiTap.findById({ _id })
                    .select("tieu_de noi_dung ngay_het_han nguoi_tao_id lop_hoc_id han_nop_bai")
                    .populate({ path: "nguoi_tao_id", select: "ho ten" })
                    .populate({ path: "lop_hoc_id", select: "tieu_de" })
                    .then(baiTap => {
                        if (baiTap) {
                            const bai_tap_id = baiTap._id;
                            const lop_hoc_id = baiTap.lop_hoc_id;
                            const sinh_vien_id = sinhVien._id;
                            console.log("id sinh viên",sinhVien._id);
                            const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
                            let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
                            orgName = orgName.trim().replace(/ /g, "-")
                            const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
                            // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
                            const newFullPath = `${fullPathInServ}-${orgName}`;
                            fs.renameSync(fullPathInServ, newFullPath);
                            req.body.upload = orgName;
                            //console.log(orgName);
                            NopBaiTap.create({
                                'bai_tap_id': bai_tap_id,
                                'lop_hoc_id': lop_hoc_id,
                                'sinh_vien_id': sinh_vien_id,
                                'bai_nop': req.body.upload
                            })
                                .then(baiNop => {
                                    if (baiNop) {
                                        res.json({ 'success': true, 'msg': 'Nộp bài thành công', 'fileNameInServer': orgName }).status(201);
                                    }

                                })
                                .catch(e => noticeCrash(res));
                        }
                    })
                    .catch(e => noticeCrash(res));
        })
        .catch(e => noticeCrash(res));
}
const huyUpLoad = (req, res) => {
    const _id = req.params.id;
    NopBaiTap.deleteOne({ _id })
        .then(huyfile => {
            if (huyfile) {
                res.json({ 'success': true, 'msg': 'Hủy File thành công' });
            }
        })
        .catch(e => noticeCrash(res));

}
module.exports = { loadbaiTap, nopbaiTap, huyUpLoad }