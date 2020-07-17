/** Import third library */
const mongoose = require("mongoose");
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
                req.body.anh_dai_dien = req.file.filename;
                const _id = req.params.id
                SinhVien.updateOne({ _id }, { $set: { anh_dai_dien: req.body.anh_dai_dien } })
                    .then(aVaTar => {
                        if (aVaTar) {
                            res
                                .status(200)
                                .json({ 'success': true, 'msg': 'Cập nhật avatar thàng công' });
                        }
                    })
                    .catch(e => noticeCrash(res));
            }
        })
        .catch(e => noticeCrash(res));

}
module.exports = { suaThongTin, CapNhatAvatar }