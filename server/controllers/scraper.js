const axios = require('axios');
const cheerio = require('cheerio');
const { getArticles, addArticle  } = require('./articles.js');
const sequelize = require('../models');

async function mainPageLinks (websiteName, linkFilter, partialLink, location_id) {
  let links = [];

  await axios(websiteName)
    .then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);
      $('div').each((i, article) => {
        const $article = $(article);
        let url = $article.find('a').attr('href');
        // console.log(url);

        if (url && url.includes(linkFilter) && url !== 'url') {

          // If the link is partial
          if (partialLink && !url.includes('http') && partialLink !== undefined) {
            url = partialLink + url;
          }

          if (!links.includes(url)) {
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
async function getHashTagsFromArticle (pageLink) {
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
            allArrs.push(temp);
          })
        }
      })
      .toArray();
	}).catch(err => console.error(err));

  allArrs.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  // 2. Store a hashtag object in the 'hashtags' array
  // 2.1 Check by key if already includes, then just add + 1
  //
  // The code below only works with a sorted array

  // !!! Don't delete the count. You need to store it later in the realtions table maybe? not sure. (when returning the hashtags, return the count into the raltions table)
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
  console.log(hashtags);
  return (hashtags);
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
    console.log();
  }
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
