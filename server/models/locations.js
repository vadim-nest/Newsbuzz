const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('location', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		// id: {
		// 	allowNull: false,
		// 	autoIncrement: true,
		// 	primaryKey: true,
		// 	type: DataTypes.INTEGER
		// },
		location_name: {
			allowNull: false,
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
    hashtags_ids: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.DECIMAL)
		},

	});
};
