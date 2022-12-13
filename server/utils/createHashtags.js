const { mainPageLinks, getHashTagsFromArticle } = require('./scraper');
const addHashtag = require('./addHashtag');
const addOccurrence = require('./addOccurrence');
const sequelize = require('../models');

async function filterBySite(filter) {
  const linksAndLocation_id = await mainPageLinks(...filter);
  const links = linksAndLocation_id[0];
  const location_id = linksAndLocation_id[1];
  console.log(links);

  // You might need to create a filter for getHashTagsFromArticle() function, because there might be different structure on different websites
  // TODO doing it already? - when calling the function on every link, you can already here somewhere store the links in the article array.

  let allHashtags = [];
  console.log(links);
  await Promise.all(
    links.map(async (link, index) => {
      // ! Maybe here I can populate the array??
      // index is limiting links to 10 (just for the tests)
      let theLinkHashtags = await getHashTagsFromArticle(link, filter);
      allHashtags.push(...theLinkHashtags);

      if (theLinkHashtags.length > 0) {
        // findOne link_id, not the link itself
        const article = await sequelize.models.article.findOne({
          where: { url: link },
        });
        if (article === null) {
          console.log(link);
          console.log('Not found!');
        } else {
          // The three lines below were outside the if statement
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

module.exports = { filterBySite };
