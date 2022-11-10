const axios = require('axios');
const cheerio = require('cheerio');
const { getArticles, addArticle  } = require('./articles.js');
const sequelize = require('../models');
// const https = require('https');
// const express = require("express");
// const app = express();
// const fs = require('fs');
// const writeStream = fs.createWriteStream('devBlog.csv');

async function mainPageLinks (websiteName, linkFilter) {
  let links = [];

  await axios(websiteName)
    .then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);
      $('div').each((_, article) => {
        const $article = $(article);
        const url = $article.find('a').attr('href');

        if (url && url.includes(linkFilter) && url !== 'url') {
          if (!links.includes(url)) {
            links.push(url);
          }

        }
      })
      .toArray();
	}).catch(err => console.log(err));

  return links;
}


// !!! - working, getting hashtags from an article from The Guardian
// Function to get the text from the page (Guardian)
// const pageLink = 'https://www.theguardian.com/business/2022/nov/03/bank-of-england-raises-interest-rates-to-3-percent';

async function getHashTagsFromArticle (pageLink) {

  let hashtags = [];
  let allArrs = [];
  let articleId;

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
  // !!! Create variables, what is this mess?
  //
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

      // console.log('articleId, line 104:', articleId)
      articleId = await findArticleId(pageLink);
      // console.log('articleId, line 62:', articleId);

      hashtags.push({
        hashtag: el,
        count: 1,
        articles_ids: articleId
      })
    }
  })

  return (hashtags);
}

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

async function findArticleId (link) {
  const project = await sequelize.models.article.findOne({ where: { url: link } });
  if (project === null) {
    console.log('Not found!');
  } else {
    // console.log(project instanceof sequelize.models.article); // true
    // console.log('project.id, line 133:', project.id); // 'My Title'
    return project.id;
  }
}


module.exports = { mainPageLinks, getHashTagsFromArticle };
