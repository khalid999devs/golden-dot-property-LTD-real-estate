const { clients } = require('../models');
const uniqid = require('uniqid');
const { validate } = require('deep-email-validator');
const { UnauthenticatedError, BadRequestError } = require('../errors');
const { hashSync, compare } = require('bcryptjs');
const deleteFile = require('../utils/deleteFile');
const hashSalt = Number(process.env.SALT);

const emailValidate = async (req, res, next) => {
  const { email } = req.body;
  const emailRes = await validate(email);
  if (email) {
    // if (emailRes?.valid) next();
    // else {
    //   throw new UnauthenticatedError(
    //     'Invalid email ID. Please provide a valid one.'
    //   );
    // }
    next();
  } else {
    deleteFile(req.file.path);
    throw new UnauthenticatedError('Email field should not be empty');
  }
};

const passwordValidate = async (req, res, next) => {
  const { id, mode } = req.user;
  const { password } = req.body;
  if (!password) {
  }

  const clientUser = await clients.findByPk(id, {
    attributes: ['password'],
  });
  const match = await compare(password, clientUser.password);
  if (!match) {
    throw new UnauthenticatedError('wrong password entered');
  } else next();
};

const clientRegValidate = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (fullName && email && password) {
    const isEmailThere = await clients.findOne({
      where: { email: email },
    });
    if (isEmailThere) {
      throw new UnauthenticatedError(`Already registered with ${email}`);
    }

    const hashedPass = hashSync(password, hashSalt);
    const username = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;

    const data = {
      fullName: fullName.trim(),
      email,
      userName: username,
      password: hashedPass,
    };

    req.user = data;
    next();
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};

module.exports = {
  clientRegValidate,
  emailValidate,
  passwordValidate,
};
