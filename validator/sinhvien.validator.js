const {check, validateResult} = require('express-validator');

let validateSuaThongTin = () => {
    return [
        check('ly_do', 'Lý do không được bỏ trống')
        .not()
        .isEmpty()
    ];
}

module.exports = {validateSuaThongTin}