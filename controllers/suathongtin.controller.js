/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const SuaThongTin = require("../model/suathongtin.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
const {validationResult} = require('express-validator');
const suaThongTin = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({'success': false, errors: errors.array() });
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
module.exports = { suaThongTin }