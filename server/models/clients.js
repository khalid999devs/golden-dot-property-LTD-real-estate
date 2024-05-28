module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define('clients', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    // clients.hasMany(models.properties, {
    //   foriegnKey: 'clientId',
    //   onDelete: 'CASCADE',
    // });
  };

  return clients;
};
