const { ERROR_CRASH} = require("../constant/error.constant");

const noticeCrash = (res) => {
  const data = {
    success: false,
    message: ERROR_CRASH,
  };
  res.json(data)
}

module.exports = {
  noticeCrash
}