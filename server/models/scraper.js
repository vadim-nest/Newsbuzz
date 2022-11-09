const axios = require('axios');
const cheerio = require('cheerio');
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
const pageLink = 'https://www.theguardian.com/business/2022/nov/03/bank-of-england-raises-interest-rates-to-3-percent';

async function getHashTagsFromArticle (pageLink) {

  let hashtags = [];
  let allArrs = [];

  await axios(pageLink)
  .then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);
      $('p').each((_, article) => {
        const $article = $(article);
        // const url = $article.find('a').attr('href');
        const title = $article.text();

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
	}).catch(err => console.log(err));

  allArrs.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  // 2. Store a hashtag object in the 'hashtags' array
  // 2.1 Check by key if already includes, then just add + 1
  // !!! Create variables, what is this mess?
  //
  // The code below only works with a sorted array
  allArrs.forEach(el => {

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
        count: 0,
        url: pageLink
      })
    }
  })

  console.log(hashtags);

  return hashtags;

}

module.exports = { mainPageLinks, getHashTagsFromArticle };
