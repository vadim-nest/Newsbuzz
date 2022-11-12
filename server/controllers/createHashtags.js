const { mainPageLinks, getHashTagsFromArticle } = require('./scraper');
const sequelize = require('../models');

async function  filterBySite (filter) {
  const linksAndLocation_id = await mainPageLinks(...filter);
  const links = linksAndLocation_id[0];
  const location_id = linksAndLocation_id[1];
  console.log(links);

  // You might need to create a filter for getHashTagsFromArticle() function, because there might be different structure on different websites
  // TODO doing it already? - when calling the function on every link, you can already here somewhere store the links in the article array.

  let allHashtags = [];
  console.log(links);
  await Promise.all(links.map(async (link, index) => {
    // ! Maybe here I can populate the array??
    // index is limiting links to 10 (just for the tests)
    let theLinkHashtags = await getHashTagsFromArticle(link);
    allHashtags.push(...theLinkHashtags);

    if (theLinkHashtags.length > 0) {
      // findOne link_id, not the link itself
      const article = await sequelize.models.article.findOne({ where: { url: link } });
      if (article === null) {
        console.log(link);
        console.log('Not found!');
      } else {

        // The three lines below were outside the if statement
        await storeHashtag(theLinkHashtags);
        await storeOccurance(theLinkHashtags, location_id, article.id);
      }
    }
  }));

  allHashtags.sort(function (a, b) {
    return a.hashtag.toLowerCase().localeCompare(b.hashtag.toLowerCase());
  });

  return (allHashtags);
}

module.exports = { filterBySite };


// Storing hashtags in the db!
async function storeHashtag (hashtagsArr) {

  hashtagsArr.forEach(async hTag  => {
    try {
      const hashtag = {
        hashtag: hTag.hashtag,
      }
      const existing_hash = await sequelize.models.hashtag.findOne({ where: { hashtag: hTag.hashtag } });
      if (!existing_hash) {
        await sequelize.models.hashtag.create(hashtag);
      }
    } catch (error) {
      // console.log(error);
    }
  })
}

async function storeOccurance (hashtagsArr, the_location_id, the_article_id) {

  await hashtagsArr.forEach(async hTag  => {
    // find the hashtag_id
    console.error(hTag.hashtag);
    const the_hashtag_id = await sequelize.models.hashtag.findOne({ where: { hashtag: hTag.hashtag } });
    console.error({the_hashtag_id});

    try {
      const occurance = {
        hashtag_id: the_hashtag_id.id,
        location_id: the_location_id,
        hashtag_count: hTag.count,
        url_id: the_article_id,
      }
      await sequelize.models.occurance.create(occurance);
    } catch (error) {
      console.log(error);
    }
  })
}


// hashtag_id: {
//   allowNull: false,
//   type: DataTypes.INTEGER,
// },
// location_id: {
//   allowNull: false,
//   type: DataTypes.INTEGER,
// },
// hashtag_count: {
//   allowNull: false,
//   type: DataTypes.INTEGER,
// },
// url_id: {
//   allowNull: false,
//   type: DataTypes.INTEGER,
// },