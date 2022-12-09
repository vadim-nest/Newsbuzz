module.exports = (sequelize, DataTypes) => {
  return sequelize.define('location', {
    // id
    location_name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    latitude: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    longitude: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
