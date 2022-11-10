const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('hashtag', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		// id: {
		// 	allowNull: false,
		// 	autoIncrement: true,
		// 	primaryKey: true,
		// 	type: DataTypes.INTEGER
		// },
		hashtag: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		count: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
    articles_ids: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.DECIMAL)
		},

	});
};
