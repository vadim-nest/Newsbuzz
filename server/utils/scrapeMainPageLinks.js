const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeMainPageLinks (websiteName, linkFilter, partialLink, location_id, toExclude) {
  let links = [];

  await axios(websiteName)
    .then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);
      $('div').each((i, article) => {
        const $article = $(article);
        let url = $article.find('a').attr('href');

        if (url && url.includes(linkFilter) && url !== 'url' && !url.includes(toExclude)) {

          // If the link is partial
          if (partialLink && !url.includes('http') && partialLink !== undefined) {
            url = partialLink + url;
          }

          // ! Limiting amount of links to 15 for now (for performance)
          // Well, I probably need the first 15 links anyway, as they will be selected / more discussed
          if (!links.includes(url) && (links.length < 15)) {
            links.push(url);
          }
        }
      })
      .toArray();
	}).catch(err => console.log(err));
  return [links, location_id];
}

module.exports = scrapeMainPageLinks;
