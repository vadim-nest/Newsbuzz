const sequelize = require('../models');

// Add a new location to the locations table
async function addLocation(reqBody) {
  try {
    await sequelize.models.location.create({
      location_name: reqBody.location_name,
      latitude: reqBody.latitude,
      longitude: reqBody.longitude,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = addLocation;
