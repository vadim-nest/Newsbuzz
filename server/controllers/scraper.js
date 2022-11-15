const axios = require('axios');
const cheerio = require('cheerio');
const { getArticles, addArticle  } = require('./getHTagsFromDB.js');
const sequelize = require('../models');

async function mainPageLinks (websiteName, linkFilter, partialLink, location_id, toExclude) {
  let links = [];

  await axios(websiteName)
    .then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);
      $('div').each((i, article) => {
        const $article = $(article);
        let url = $article.find('a').attr('href');
        // console.log(url);

        if (url && url.includes(linkFilter) && url !== 'url' && !url.includes(toExclude)) {

          // If the link is partial
          if (partialLink && !url.includes('http') && partialLink !== undefined) {
            url = partialLink + url;
          }

          // ! Limiting amount of links to 15 for now (for performance)
          if (!links.includes(url) && (links.length < 15)) {
            links.push(url);
          }
        }
      })
      .toArray();
	}).catch(err => console.log(err));

  return [links, location_id];
}


// Working, getting hashtags from an article from The Guardian
// Function to get the text from the page (Guardian)
async function getHashTagsFromArticle (pageLink, filter) {
  console.log('getHashTagsFromArticle')
  console.log(pageLink);

  let hashtags = [];
  let allArrs = [];

  await axios(pageLink)
  .then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);
      $('p').each((i, article) => {
        const $article = $(article);
        const title = $article.text();

        if (i === 0) {
          storeArticle(pageLink, title);
        }


        // regex to get hashtags
        let matches = title.match(/(([A-Z]\w*\s*){2,})|(\w{6,})/g);

        // Trim the whitespace in the end of the tag
        if (matches !== null) {
          matches.forEach(el => {
            let temp = el.trim()
            console.log(temp);
            let filteredMatch = hashtagsFiltring(temp, pageLink, filter);
            console.log(filteredMatch);
            if (filteredMatch !== null) {
              allArrs.push(filteredMatch);
            }
          })
        }
      })
      .toArray();
	}).catch(err => console.error(err));

  allArrs.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });


  // The code below only works with a sorted array

  allArrs.forEach(async el => {

    if (hashtags[hashtags.length - 1]
        && hashtags[hashtags.length - 1].hashtag.toLowerCase() === el.toLowerCase()) {
      hashtags[hashtags.length - 1].count += 1;
      if (hashtags[hashtags.length - 1].hashtag !== el) {
        // if one word mentioned with upperCase and lowerCase first letter, then it's probably not a name. We'll keep the one with the lowerCase
        hashtags[hashtags.length - 1].hashtag.charAt(0).toLowerCase();
      }
    } else {
      hashtags.push({
        hashtag: el,
        count: 1
      })
    }
  })
  // You have all of the variables at this point?
  // hashtags
  // console.log(hashtags);
  // We are filtering hashtags to store only the ones with the count of 3 or more
  const filteredHashtags = hashtags.filter((hTag) => {
    return hTag.count > 2;
  });

  return (filteredHashtags);
}

// Storing articles in the db!
async function storeArticle (link, first_p) {
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

function hashtagsFiltring(match, pageLink, filter) {
  console.log('*******************************');
  console.log('*******************************');
  console.log('*******************************');
  console.log('*******************************');
  console.log('*******************************');
  console.log(pageLink);
  console.log(filter);
  console.log('*******************************');
  console.log('*******************************');
  console.log('*******************************');
  console.log('*******************************');
  console.log('*******************************');

  if (match === ('UK' || 'England' || 'Britain' || 'people' || 'residents' || 'street' || 'because' || 'family')) return null;

  // Filter by location
  if (filter[3] === 2) {
    if (match === ('Edinburgh' || 'Scotland')) return null;
  }

  if (filter[3] === 3) {
    if (match === ('Liverpool')) return null;
  }

  // Filter by newspaper
  if (filter[0] === 'https://www.bbc.co.uk/news') {
    if (match === ('BBC' || 'follow' || 'BBC North West' || 'Facebook' || 'Twitter' || 'Instagram' || 'northwest' || 'newsonline')) return null;
  }

  if (filter[0] === 'https://www.theguardian.com/uk') {
    if (match === ('Guardian')) return null;
  }

  // if (filter[0] === 'https://www.liverpoolecho.co.uk/news/liverpool-news/') {
  //   if (match === ('Liverpool')) return null;
  // }

  return match;

}

// async function findArticleId (link) {
  // const project = await sequelize.models.article.findOne({ where: { url: link } });
  // if (project === null) {
  //   console.log('Not found!');
  // } else {
  //   // console.log(project instanceof sequelize.models.article); // true
  //   // console.log('project.id, line 133:', project.id); // 'My Title'
  //   return project.id;
  // }
// }


module.exports = { mainPageLinks, getHashTagsFromArticle };
