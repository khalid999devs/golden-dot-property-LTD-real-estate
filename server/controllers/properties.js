const { clients } = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');
const mailer = require('../utils/sendMail');

const createProperty = async (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(req.files);
  if (req.files.length > 0) {
    // console.log(req.files);
    // req.files.forEach((file) => {
    // });
  }
  res.json({
    succeed: true,
    msg: 'Successfully added the Property!',
  });
};

module.exports = { createProperty };
