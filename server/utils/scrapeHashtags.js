const axios = require('axios');
const cheerio = require('cheerio');
const { addArticle } = require('../controllers/addToDB.js');

async function getHashTagsFromArticle(pageLink, filter) {
  let hashtags = [];
  let allArrays = [];

  await axios(pageLink)
    .then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);
      $('p')
        .each((i, article) => {
          const $article = $(article);
          const title = $article.text();

          if (i === 0) {
            addArticle(pageLink, title);
          }

          // regex to get hashtags
          let matches = title.match(/(([A-Z]\w*\s*){2,})|(\w{6,})/g);

          if (matches !== null) {
            matches.forEach((el) => {
              let temp = el.trim();
              let filteredMatch = hashtagsFiltering(temp, pageLink, filter);
              if (filteredMatch !== null) {
                allArrays.push(filteredMatch);
              }
            });
          }
        })
        .toArray();
    })
    .catch((err) => console.error(err));

  allArrays.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  // The code below only works with a sorted array
  allArrays.forEach(async (el) => {
    if (
      hashtags[hashtags.length - 1] &&
      hashtags[hashtags.length - 1].hashtag.toLowerCase() === el.toLowerCase()
    ) {
      hashtags[hashtags.length - 1].count += 1;
      if (hashtags[hashtags.length - 1].hashtag !== el) {
        // if one word mentioned with upperCase and lowerCase first letter, then it's probably not a name. We'll keep the one with the lowerCase
        hashtags[hashtags.length - 1].hashtag.charAt(0).toLowerCase();
      }
    } else {
      hashtags.push({
        hashtag: el,
        count: 1,
      });
    }
  });

  // We are filtering hashtags to store only the ones with the count of 3 or more
  const filteredHashtags = hashtags.filter((hTag) => {
    return hTag.count > 2;
  });

  return filteredHashtags;
}

function hashtagsFiltering(match, pageLink, filter) {
  if (
    match ===
    ('UK' ||
      'England' ||
      'Britain' ||
      'people' ||
      'residents' ||
      'street' ||
      'because' ||
      'family')
  )
    return null;

  // Filter by location
  if (filter[3] === 2) {
    if (match === ('Edinburgh' || 'Scotland')) return null;
  }

  if (filter[3] === 3) {
    if (match === 'Liverpool') return null;
  }

  // Filter by newspaper
  if (filter[0] === 'https://www.bbc.co.uk/news') {
    if (
      match ===
      ('BBC' ||
        'follow' ||
        'BBC North West' ||
        'Facebook' ||
        'Twitter' ||
        'Instagram' ||
        'northwest' ||
        'newsonline')
    )
      return null;
  }

  if (filter[0] === 'https://www.theguardian.com/uk') {
    if (match === 'Guardian') return null;
  }

  // if (filter[0] === 'https://www.liverpoolecho.co.uk/news/liverpool-news/') {
  //   if (match === ('Liverpool')) return null;
  // }

  return match;
}

// helpers


module.exports = { getHashTagsFromArticle };
