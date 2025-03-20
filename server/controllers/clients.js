const { clients, clientproperties } = require('../models');
const { Op } = require('sequelize');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');
const { hashSync, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { attachTokenToResponse } = require('../utils/createToken');
const deleteFile = require('../utils/deleteFile');
const mailer = require('../utils/sendMail');
const sendSMS = require('../utils/sendSMS');

//active now
const registration = async (req, res) => {
  const newClient = await clients.create(req.user);
  await clientproperties.create({ ...req.property, clientId: newClient.id });

  mailer({ client: newClient, property: req.property }, 'booking').catch(
    (err) => {
      // console.log(err);
    }
  );

  res.status(StatusCodes.CREATED).json({
    succeed: true,
    msg: 'Congratulations! Your booking for appointment is successful.',
  });
};

const login = async (req, res) => {
  let clientUser;
  const { email, password, isCookieLong } = req.body;

  if (!email || !password)
    return res.json({
      succeed: false,
      msg: 'Email or Password field should not be empty.',
    });
  clientUser = await clients.findOne({
    where: { email: email },
  });

  if (!clientUser)
    return res.json({
      succeed: false,
      msg: `${email} does not exist for students`,
    });

  const match = await compare(password, clientUser.password);
  if (!match) {
    if (req.signedCookies) {
      res.clearCookie('token');
    }
    return res.json({
      succeed: false,
      msg: 'Wrong email and password combination.',
    });
  }
  const user = {
    id: clientUser.id,
    userName: clientUser.userName,
    fullName: clientUser.fullName,
    email: clientUser.email,
    role: 'user',
  };

  const token = sign(user, process.env.CLIENT_SECRET, {
    expiresIn: isCookieLong ? 60 * 60 * 24 * 30 : 60 * 60 * 4,
  });
  attachTokenToResponse('token', { res, token, expiresInDay: 30 });
  res.json({
    succeed: true,
    msg: `successfully logged in as ${clientUser.fullName}`,
    username: clientUser.userName,
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({
    succeed: true,
    msg: 'successfully logged out. Please login again to access your account.',
  });
};

const getUser = async (req, res) => {
  const { id } = req.user;

  let extraInfo = {};
  extraInfo = await clients.findOne({
    where: { id: id },
    attributes: ['fullName', 'image', 'email'],
    include: {
      model: clientspaces,
    },
  });

  const result = {
    ...req.user,
    ...extraInfo.dataValues,
  };

  res.json({ succeed: true, result });
};

const deleteClient = async (req, res) => {
  const { password } = req.body;
  const id = req.user.id;

  if (!password)
    throw new BadRequestError('you should provide the password first');

  let clientUser = null;
  clientUser = await clients.findByPk(id, {
    attributes: ['password', 'image'],
  });
  const match = await compare(password, clientUser.password);
  if (!match) {
    throw new UnauthenticatedError('wrong password Entered');
  }
  await clients.destroy({ where: { id: id } });

  if (clientUser.image) deleteFile(clientUser.image);
  res.clearCookie('token');
  res.json({ succeed: true, msg: 'delete succeed' });
};

const resetPassSetToken = async (req, res) => {
  let clientUser;
  const { email, sendMode, number } = req.body;
  let finder = {
    [sendMode === 'sms' ? 'phone' : 'email']:
      sendMode === 'sms' ? number : email,
  };

  clientUser = await clients.findOne({
    attributes: ['email', 'phone'],
    where: finder,
  });

  if (!clientUser) {
    throw new NotFoundError(
      `user with this ${sendMode === 'sms' ? 'number' : 'email'} does not exist`
    );
  }
  let otp = new Date().getTime().toString() + Math.random().toString().slice(2);
  otp = otp.substring(otp.length - 4, otp.length);

  // mailing and sms the otp
  if (sendMode === 'sms' && number) {
    let hostUrl = undefined;
    if (req.headers.origin) hostUrl = new URL(req.headers.origin);
    else hostUrl = req.hostname;
    sendSMS(number, `Your ${hostUrl || 'resetPass'} OTP code is ${otp}`)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  } else if (email) {
    mailer(
      {
        client: {
          fullName: clientUser.fullName,
          email: clientUser.email,
        },
        info: {
          otp,
        },
      },
      'resetPass'
    ).catch((err) => {});
  } else {
    throw new BadRequestError('Email id or number must be provided');
  }

  const minute = 10;
  const expiresIn = (Date.now() + minute * 60 * 1000).toString();
  let metadata;

  const updateObj = {
    otp: otp,
    otpTime: expiresIn,
    otpCount: 0,
  };

  [metadata] = await clients.update(updateObj, { where: finder });

  if (metadata == 0) {
    res.json({
      succeed: false,
      msg: 'Something went wrong. Please try again later',
    });
  }

  res.json({
    succeed: true,
    msg: `${sendMode === 'sms' ? 'A sms' : 'An email'} with OTP was sent to ${
      sendMode === 'sms' ? clientUser.phone : clientUser.email
    }`,
  });
};

const resetPassVerify = async (req, res) => {
  const { email, otp, password, mode, phone, sendMode } = req.body;
  const maxOtpCount = 10;

  let finder = {
    [sendMode === 'sms' ? 'phone' : 'email']:
      sendMode === 'sms' ? phone : email,
  };

  let otpData;

  otpData = await clients.findOne({
    attributes: ['otp', 'otpCount', 'otpTime'],
    where: finder,
  });

  if (!otpData)
    throw new UnauthenticatedError(
      'did not match any record, please try with the correct email or mobile number'
    );

  if (mode === 'ov' && Date.now() <= Number(otpData.otpTime)) {
    await clients.increment('otpCount', { by: 1, where: finder });
  }

  if (Date.now() > Number(otpData.otpTime))
    throw new UnauthenticatedError('OTP timeout. Please request for another.');
  else if (otpData.otpCount > maxOtpCount)
    throw new UnauthenticatedError(
      'OTP became invalid. Please request for another.'
    );
  else if (otp !== otpData.otp)
    throw new UnauthenticatedError('Invalid OTP entered.');

  if (mode === 'ov') {
    return res.json({ succeed: true, msg: 'otp verifyed', type: mode });
  }

  if (mode !== 'ov') {
    const hassedPass = hashSync(password, Number(process.env.SALT));

    await clients.update(
      { password: hassedPass },
      { where: { [email ? 'email' : 'phone']: email ? email : phone } }
    );

    res.json({
      succeed: true,
      msg: 'Your password was changed successfully. Please login with the new password',
    });
  }
};

//active now
const getAllClients = async (req, res) => {
  const { skip, rowNum, propertyValue } = req.body;
  if (skip === '' || skip === null || skip === undefined || !rowNum)
    throw new BadRequestError('skip or rows field must not be empty');

  const propertiesWhereCondition =
    propertyValue !== 'all' && propertyValue ? { value: propertyValue } : {};

  result = await clients.findAll({
    include: {
      model: clientproperties,
      as: 'properties',
      attributes: ['heading', 'value'],
      where: propertiesWhereCondition,
    },
    attributes: { exclude: ['password', 'otp', 'otpCount', 'otpTime'] },
    offset: Number(skip),
    limit: Number(rowNum),
    order: [['id', 'DESC']],
  });

  const totalClients = await clients.count({
    include: {
      model: clientproperties,
      as: 'properties',
      where: propertiesWhereCondition,
    },
  });

  res.json({ succeed: true, result: result, totalCount: totalClients });
};

const getClientOnId = async (req, res) => {
  const { id, userName } = req.user;
  const username = req.params.username;
  if (userName !== username) {
    return res.json({
      succeed: false,
      type: 'rdView',
      msg: 'access denied',
    });
  }

  let clientUser;
  clientUser = await clients.findOne({
    where: { id: id },
    attributes: { exclude: ['password', 'otp', 'otpCount', 'otpTime'] },
    include: {
      model: clientproperties,
      as: 'properties',
    },
  });

  res.json({
    succeed: true,
    mode: mode,
    result: clientUser,
    msg: 'Client found',
  });

  res.json({
    succeed: false,
    msg: 'something went wrong finding the client',
  });
};

module.exports = {
  registration,
  login,
  logout,
  getUser,
  deleteClient,
  resetPassSetToken,
  resetPassVerify,
  getAllClients,
  getClientOnId,
};
