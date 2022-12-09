module.exports = (sequelize, DataTypes) => {
  return sequelize.define('source', {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    main_page_url: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    location_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });
};
