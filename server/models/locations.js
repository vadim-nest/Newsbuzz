// const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
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
			type: DataTypes.STRING
		},
    longitude: {
			allowNull: false,
			type: DataTypes.STRING
		},
	});
};
