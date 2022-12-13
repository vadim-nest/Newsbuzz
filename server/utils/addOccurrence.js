const sequelize = require('../models');

// Add a new occurrence to the locations table
async function addOccurrence(hashtagsArr, the_location_id, the_article_id) {
  await hashtagsArr.forEach(async (hTag) => {
    // find the hashtag_id
    console.error(hTag.hashtag);
    const the_hashtag_id = await sequelize.models.hashtag.findOne({
      where: { hashtag: hTag.hashtag },
    });
    console.error({ the_hashtag_id });

    try {
      const occurance = {
        hashtag_id: the_hashtag_id.id,
        location_id: the_location_id,
        hashtag_count: hTag.count,
        url_id: the_article_id,
      };
      await sequelize.models.occurrence.create(occurance);
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = addOccurrence;
