const sequelize = require('../models');

// Add a new hashtag to the locations table
async function addHashtag(hashtagsArr) {
  hashtagsArr.forEach(async (hTag) => {
    try {
      const hashtag = {
        hashtag: hTag.hashtag,
      };
      const existing_hash = await sequelize.models.hashtag.findOne({
        where: { hashtag: hTag.hashtag },
      });
      if (!existing_hash) {
        await sequelize.models.hashtag.create(hashtag);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = addHashtag;
