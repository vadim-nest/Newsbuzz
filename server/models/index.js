const Sequelize = require('sequelize');
const db = {};
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('newsbuzz', process.env.DATABASE_USERNAME || 'postgres', process.env.DATABASE_PASSWORD || '1234', {
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  logging: false,
});

const files = fs.readdirSync(__dirname);

for (let file of files) {
  if (file !== 'index.js') {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  }
}

// Defining relations
db.source.belongsTo(db.location, {
  foreignKey: 'location_id',
});
db.location.hasMany(db.source, {
  foreignKey: 'location_id',
});

db.occurrence.belongsTo(db.hashtag, {
  foreignKey: 'hashtag_id',
});
db.hashtag.hasMany(db.occurrence, {
  foreignKey: 'hashtag_id',
});

db.occurrence.belongsTo(db.location, {
  foreignKey: 'location_id',
});
db.location.hasMany(db.occurrence, {
  foreignKey: 'location_id',
});

db.occurrence.belongsTo(db.article, {
  foreignKey: 'url_id',
});
db.article.hasMany(db.occurrence, {
  foreignKey: 'url_id',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
