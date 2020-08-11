const { ERROR_CRASH} = require("../constant/error.constant");
const status = require("../constant/status.constant");

const noticeCrash = (res) => {
  const data = {
    success: false,
    msg: ERROR_CRASH,
  };
  res.status(status.SERVER_ERROR).json(data)
}

module.exports = {
  noticeCrash
}