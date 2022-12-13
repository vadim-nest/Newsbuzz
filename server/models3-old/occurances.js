module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'occurance',
    {
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
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['hashtag_id', 'location_id', 'hashtag_count', 'url_id'],
        },
      ],
    }
  );
};
