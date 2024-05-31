const { CustomAPIError } = require('../errors');
const { mobileResExp } = require('../utils/regex');

module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define('clients', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      // unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isValidPhone: function (value) {
          if (!mobileResExp.test(value))
            throw new CustomAPIError(
              'Phone Format Error! Please provide a correct one.'
            );
        },
      },
    },
    address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    otpCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    otpTime: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });

  clients.associate = (models) => {
    clients.hasMany(models.clientproperties, {
      foriegnKey: 'clientId',
      onDelete: 'CASCADE',
    });
  };

  return clients;
};
