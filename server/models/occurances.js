// const { DataTypes } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('occurance', {
    // id
    // date
    // Might need to add article date column later, if want to roll back functionality
    hashtag_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
    },
    location_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
    },
    hashtag_count: {
			allowNull: false,
			type: DataTypes.INTEGER,
    },
    url_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
    }
	},
  {
    indexes: [
        {
            unique: true,
            fields: ['hashtag_id', 'location_id', 'hashtag_count', 'url_id']
        }
    ]
})
}



// var Tag = sequelize.define('Tag', {
//   id: {
//       type: DataTypes.INTEGER(11),
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//   },
//   user_id: {
//       type: DataTypes.INTEGER(11),
//       allowNull: false,
//   },
//   count: {
//       type: DataTypes.INTEGER(11),
//       allowNull: true
//   },
//   name: {
//       type: DataTypes.STRING,
//       allowNull: true,
//   }
// },
// {
//   indexes: [
//       {
//           unique: true,
//           fields: ['user_id', 'count', 'name']
//       }
//   ]
// });