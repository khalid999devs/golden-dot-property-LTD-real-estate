module.exports = (sequelize, DataTypes) => {
  const properties = sequelize.define('properties', {
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
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    galleryImgs: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    videos: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    virtualTourVideo: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    projectInfos: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    keyPlans: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    features: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    location: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
  });

  return properties;
};
