module.exports = (sequelize, DataTypes) => {
  return sequelize.define('article', {
    url: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    first_paragraph: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
  });
};
