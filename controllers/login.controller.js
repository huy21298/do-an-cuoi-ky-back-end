/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const passport = require("passport");

/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loginHandle = (req, res, next) => {

    passport.authenticate('local', function (err, user, info) {
      if (err) {
          return next(err);
      }
      // Redirect if it fails
      if (!user) {
          return res
              .status(400)
              .json({'success': false, 'errors': 'Email hoặc mật khẩu không đúng'});
      }
      req.logIn(user, function (err) {
          if (err) {
              return next(err);
          }
          return res
              .status(200)
              .json({'success': true, 'msg': 'Login successful'});
      });
    })(req, res, next)

  }
  module.exports = {loginHandle}