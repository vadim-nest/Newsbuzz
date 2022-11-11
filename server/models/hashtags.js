// const { DataTypes } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('hashtag', {
    // id
    // date
    // Might need to add article date column later, if want to roll back functionality
    location_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
    },
    hashtag: {
			allowNull: false,
			type: DataTypes.STRING,
    },
    hashtag_count: {
			allowNull: false,
			type: DataTypes.INTEGER,
    },
    url_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
    },
	});
};
