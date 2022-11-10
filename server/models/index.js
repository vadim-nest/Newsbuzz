const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('buzznews', 'postgres', '1234', {
  dialect: 'postgres',
});

const modelDefiners = [
  require('./locations'),
  require('./hashtags'),
  require('./articles'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// Not sure if I need these
// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
