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
  await Promise.all(links.map(async link => {
    // ! Maybe here I can populate the array??
    let theLinkHashtags = await getHashTagsFromArticle(link);
    console.log('link in filter by site', link);
    allHashtags.push(...theLinkHashtags);
    // console.log('the link hashtags in filter by site', theLinkHashtags);
    console.log('THE ONE AND ONLY');
    // console.log(theLinkHashtags);
    if (theLinkHashtags.length > 0) {
      // findOne link_id, not the link itself

      // const articles = await sequelize.articles.findOne();
      // console.log(sequelize);
      console.log(link);
      const article = await sequelize.models.article.findOne({ where: { url: link } });
      if (article === null) {
        console.log('Not found!');
      } else {
        // console.log(project instanceof Project); // true
        console.log(article.id); // 'My Title'
      }
      console.log(article.id);
      storeHashtag(location_id, theLinkHashtags, article.id);
    }
    // I might not need the next forEach? I can just do it inside here?

  }));

  // allHashtagsArrs.forEach(el => {
  //   allHashtags.push(...el);
  // })

  allHashtags.sort(function (a, b) {
    return a.hashtag.toLowerCase().localeCompare(b.hashtag.toLowerCase());
  });


  // console.log(allHashtags);
  // storeHashtag(allHashtags);

  // todo Stored all of the hashtags, now can store


  return (allHashtags);
}

module.exports = { filterBySite };


// Storing hashtags in the db!
async function storeHashtag (location_id, hashtagsArr, url_id) {
  // console.log(hashtagsArr);
  // console.log('THE THREE CONSOLE.LOGS');
  // console.log(location_id);
  // console.log(hashtagsArr[0].hashtag);
  // console.log(url_id);

  hashtagsArr.forEach(async hTag  => {
    try {
      const hashtag = {
        location_id: location_id,
        hashtag: hTag.hashtag,
        hashtag_count: hTag.count,
        url_id: url_id
      }
      // console.log(hashtag);
      await sequelize.models.hashtag.create(hashtag);
    } catch (error) {
      // handling errors
      console.log(error);
    }
  })
}


// location_id: {
//   allowNull: false,
//   type: DataTypes.INTEGER,
// },
// hashtag: {
//   allowNull: false,
//   type: DataTypes.STRING,
// },
// url_id: {
//   allowNull: false,
//   type: DataTypes.INTEGER,
// },