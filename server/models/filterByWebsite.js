// import { mainPageLinks } from "./scraper";
const { mainPageLinks, getHashTagsFromArticle } = require('./scraper');

const today = new Date();
// You stopped here. Get the today's date and store in the array
const day = String(today.getDate()).padStart(2, '0')
const month = today.toLocaleString('default', { month: 'short' }).toLowerCase();
console.log(`${month}/${day}`);

const theGuardian = ['https://www.theguardian.com/uk', `${month}/${day}`];
async function  filterBySite () {
  // console.log(String(filterBySite));
  const links = await mainPageLinks(...theGuardian)
  // console.log(result);

  let allHashtags = [];
  // Should be this one instead
  links.forEach(async link => {
    // need to store it in something
    allHashtags.push(... await getHashTagsFromArticle(link));
  })

  // YOU ARE HERE!!!
  // TODO: You now have all of the hashtags from all of the articles for the day (from the guardian). Count and sort them, multiple links in one

  console.log(allHashtags);


  // allHashtags.push(...getHashTagsFromArticle(links[0]));
  // console.log(links[0]);

  //
  return (allHashtags);

}

module.exports = { filterBySite };
