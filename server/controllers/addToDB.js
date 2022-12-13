const sequelize = require('../models');

// Add a new hashtag to the locations table
async function addArticle(link, first_p) {
  try {
    const article = {
      url: link,
      first_paragraph: first_p
    }
    await sequelize.models.article.create(article);
  } catch (error) {
    console.log(error);
  }
}

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

module.exports = { addArticle, addHashtag, addLocation, addOccurrence, addSource };
