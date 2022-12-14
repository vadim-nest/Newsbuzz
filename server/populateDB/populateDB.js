require('dotenv').config();
const sequelize = require('../models');
const fs = require('fs');
const csvParser = require('csv-parser');
const { createDB } = require('./setUpDB');

async function populateArticles() {
  await new Promise((resolve, reject) => {
    fs.createReadStream('../server/populateDB/articles.csv')
    .pipe(csvParser())
    .on('data', async (data) => {
      // data is an object representing a single line from the CSV file
      try {
        await sequelize.models.article.create(data);
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    })
    .on('end', (allData) => {
      // all data has been parsed
      console.log('1/5 - articles table has been populated');
    });
  });
};

async function populateLocations() {
  await new Promise((resolve, reject) => {
    fs.createReadStream('../server/populateDB/locations.csv')
    .pipe(csvParser())
    .on('data', async (data) => {
      // data is an object representing a single line from the CSV file
      try {
        await sequelize.models.location.create(data);
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    })
    .on('end', (allData) => {
      // all data has been parsed
      console.log('2/5 - locations table has been populated');
    });
  });
};

async function populateHashtags() {
  await new Promise((resolve, reject) => {
    fs.createReadStream('../server/populateDB/hashtags.csv')
    .pipe(csvParser())
    .on('data', async (data) => {
      // data is an object representing a single line from the CSV file
      try {
        // console.log(data);
        await sequelize.models.hashtag.create(data);
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    })
    .on('end', (allData) => {
      // all data has been parsed
      console.log('3/5 - hashtags table has been populated');
    });
  });
};

async function populateOccurrences() {
  await new Promise((resolve, reject) => {
    fs.createReadStream('../server/populateDB/occurrences.csv')
    .pipe(csvParser())
    .on('data', async (data) => {
      // data is an object representing a single line from the CSV file
      try {
        await sequelize.models.occurrence.create(data);
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    })
    .on('end', (allData) => {
      // all data has been parsed
      console.log('4/5 - occurrences table has been populated');
    });
  });
};

async function populateSources() {
  await new Promise((resolve, reject) => {
    fs.createReadStream('../server/populateDB/sources.csv')
    .pipe(csvParser())
    .on('data', async (data) => {
      // data is an object representing a single line from the CSV file
      try {
        await sequelize.models.source.create(data);
        resolve(true);
      } catch (error) {
        console.log(error);
      }
    })
    .on('end', (allData) => {
      // all data has been parsed
      console.log('5/5 - sources table has been populated');
    });
  });
};

async function populateDB () {
  await populateArticles();
  await populateLocations();
  await populateHashtags();
  await populateOccurrences();
  await populateSources();
}

module.exports = { populateDB }
