module.exports = (sequelize, DataTypes) => {
  return sequelize.define('hashtag', {
    hashtag: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  });
};
