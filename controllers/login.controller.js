/** Import third library */
const mongoose = require("mongoose");
const passport = require("passport");
/** Import model */
const { validationResult } = require('express-validator');
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loginHandle = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({'success': false, 'errors': errors.array()})
    }
    passport.authenticate('local', function (err, user, info) {

        if (err) {
            return next(err);
        }
        // Redirect if it fails
        if (!user) {
            return res
                .status(400)
                .json({ 'success': false, 'errors': 'Email hoặc mật khẩu không đúng' });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res
                .status(200)
                .json({ 'success': true, 'msg': 'Login successful' });
        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ 'success': false, 'errors': errors.array() })
        }
    })(req, res, next)

}
module.exports = { loginHandle }