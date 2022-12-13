module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'occurrence',
    {
      hashtag_count: {
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
