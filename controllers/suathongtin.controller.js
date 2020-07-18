/** Import third library */
const mongoose = require("mongoose");
const fs = require("fs");
/** Import model */
const SuaThongTin = require("../model/suathongtin.model");
const SinhVien = require("../model/sinhvien.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
const { validationResult } = require('express-validator');
const suaThongTin = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({ 'success': false, errors: errors.array() });
        return;
    }
    const nguoi_dung_id = mongoose.Types.ObjectId(req.params.id);
    SuaThongTin.create(
        {
            'nguoi_dung_id': nguoi_dung_id,
            'ly_do': req.body.ly_do,
            'trang_thai': false
        })
        .then(suaThongTin => {
            if (suaThongTin) {
                res.json(suaThongTin).status(200);
            }

        }).catch(e => noticeCrash(res));
}
const CapNhatAvatar = (req, res) => {
    const _id = req.params.id;
    SinhVien.findById({ _id })
        .then(user => {
            if (user) {
                const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
                let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
                orgName = orgName.trim().replace(/ /g, "-")
                const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
                // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
                const newFullPath = `${fullPathInServ}-${orgName}`;
                fs.renameSync(fullPathInServ, newFullPath);
                req.body.anh_dai_dien = orgName;
                // console.log(processedFile);
                // console.log(orgName);
                // console.log(fullPathInServ);
                const _id = req.params.id
                SinhVien.updateOne({ _id }, { $set: { anh_dai_dien: req.body.anh_dai_dien } })
                    .then(aVaTar => {
                        if (aVaTar) {
                            res
                                .status(200)
                                .json({ 'success': true, 'msg': 'Cập nhật avatar thàng công', 'fileNameInServer': orgName });
                        }
                    })
                    .catch(e => noticeCrash(res));
            }
        })
        .catch(e => noticeCrash(res));

}
module.exports = { suaThongTin, CapNhatAvatar }