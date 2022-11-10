const { mainPageLinks, getHashTagsFromArticle } = require('./scraper');

async function  filterBySite (filter) {
  const links = await mainPageLinks(...filter)

  // You might need to create a filter for getHashTagsFromArticle() function, because there might be different structure on different websites
  // TODO doing it already? - when calling the function on every link, you can already here somewhere store the links in the article array.
  // links.forEach(link => {

  // })
  // maybe not here..

  let allHashtagsArrs = await Promise.all(links.map(link => getHashTagsFromArticle(link)));
  let allHashtags = [];

  allHashtagsArrs.forEach(el => {
    allHashtags.push(...el);
  })

  allHashtags.sort(function (a, b) {
    return a.hashtag.toLowerCase().localeCompare(b.hashtag.toLowerCase());
  });

  // some notes..
  // When storing hashtags, need to go
  // Need to create a new hashtag object, where it counts
  // List of hashtags
  // create a new object name of a hashtag, count, article_ids

  return (allHashtags);
}

module.exports = { filterBySite };
