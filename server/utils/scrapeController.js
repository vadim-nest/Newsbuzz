const { getHashTagsFromArticle } = require('./scrapeHashtags');
const scrapeMainPageLinks = require('./scrapeMainPageLinks')
const { addHashtag, addOccurrence } = require('../controllers/addToDB');
const sequelize = require('../models');

async function scrapeController(filter) {
  const linksAndLocation_id = await scrapeMainPageLinks(...filter);
  const links = linksAndLocation_id[0];
  const location_id = linksAndLocation_id[1];

  let allHashtags = [];
  await Promise.all(
    links.map(async (link) => {
      let theLinkHashtags = await getHashTagsFromArticle(link, filter);
      allHashtags.push(...theLinkHashtags);

      if (theLinkHashtags.length > 0) {
        const article = await sequelize.models.article.findOne({
          where: { url: link },
        });
        if(article) {
          await addHashtag(theLinkHashtags);
          await addOccurrence(theLinkHashtags, location_id, article.id);
        }
      }
    })
  );

  allHashtags.sort(function (a, b) {
    return a.hashtag.toLowerCase().localeCompare(b.hashtag.toLowerCase());
  });

  return allHashtags;
}

module.exports = { scrapeController };
