// Helper function for createHashtags.js

const today = new Date();
const day = String(today.getDate()).padStart(2, '0')
const month = today.toLocaleString('default', { month: 'short' }).toLowerCase();

function assignFilter(name, mainLink, location_id) {
  // console.log(name === 'The Guardian');
  // location: global
  if (name === 'The Guardian') return [mainLink, `${month}/${day}`, undefined, location_id];
  if (name === 'BBC') return [mainLink, `/news/`, 'https://www.bbc.co.uk', location_id];

  // location: Liverpool
  if (name === 'Liverpool BBC') return [mainLink, `/news/`, 'https://www.bbc.co.uk', location_id];
  if (name === 'Liverpool Echo') return [mainLink, `/news/`, undefined, location_id, '#comments-wrapper'];

  // location: Edinburgh
  if (name === 'Edinburgh BBC') return [mainLink, `/news/`, 'https://www.bbc.co.uk', location_id];
  if (name === 'Edinburgh Live') return [mainLink, `/news/`, undefined, location_id, '#comments-wrapper'];



  return undefined;
};

module.exports = { assignFilter };

// ? Filters description
// 1. Main page link
// 2. Filter (to get the right links from the Main page)
// 3. Some websites store links without the main part (like BBC), so we need to attach it in order to scrape later. Can be undefined.
// ! 4. Passing the location_id further, to store in the hashtags table
// 5. Filter to exclude
