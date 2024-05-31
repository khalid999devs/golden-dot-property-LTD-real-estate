module.exports = (sequelize, DataTypes) => {
  const clientproperties = sequelize.define('clientproperties', {
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subText: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    location: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
  });

  clientproperties.associate = (models) => {
    clientproperties.belongsTo(models.clients);
  };

  return clientproperties;
};
