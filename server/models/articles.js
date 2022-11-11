// const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('article', {
    url: {
			allowNull: false,
      unique: true,
			type: DataTypes.STRING
		},
    first_paragraph: {
			allowNull: true,
			type: DataTypes.TEXT
		},
	});
};
