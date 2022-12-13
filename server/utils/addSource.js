const sequelize = require('../models');

// Add a new source to the sources table
async function addSource(reqBody) {
  try {
    await sequelize.models.source.create({
      name: reqBody.source_name,
      main_page_url: reqBody.main_page_url,
      location_id: reqBody.location_id,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = addSource;
