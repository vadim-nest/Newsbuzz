// const { DataTypes } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('hashtag', {
    // id
    // date
    // Might need to add article date column later, if want to roll back functionality

    hashtag: {
			allowNull: false,
      unique: true,
			type: DataTypes.STRING,
    },
	});
};
