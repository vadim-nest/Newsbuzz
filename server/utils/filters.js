// Helper function for createHashtags.js

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const monthWordShort = today.toLocaleString('default', { month: 'short' }).toLowerCase();

function assignFilter(name, mainLink, location_id) {
  // location: global
  if (name === 'The Guardian') return [mainLink, `${monthWordShort}/${day}`, undefined, location_id];
  if (name === 'BBC') return [mainLink, `/news/`, 'https://www.bbc.co.uk', location_id];

  // location: London
  if (name === 'Evening Standard') return [mainLink, '/news/', 'https://www.standard.co.uk', location_id];
  if (name === 'London Metro') return [mainLink, `/2022/`, 'https://metro.co.uk/tag/london/', location_id];

  // location: Liverpool
  if (name === 'Liverpool BBC') return [mainLink, `/news/`, 'https://www.bbc.co.uk', location_id];
  if (name === 'Liverpool Echo') return [mainLink, `/news/`, undefined, location_id, '#comments-wrapper'];

  // location: Edinburgh
  if (name === 'Edinburgh BBC') return [mainLink, `/news/`, 'https://www.bbc.co.uk', location_id];
  if (name === 'Edinburgh Live') return [mainLink, `/news/`, undefined, location_id, '#comments-wrapper'];

  // location Birmingham
  if (name === 'Birmingham Mail') return [mainLink, `/news/`, undefined, location_id, '#comments-wrapper'];
  if (name === 'Express & Star') return [mainLink, `/news/`, 'https://www.expressandstar.com/news', location_id, '#comments-wrapper'];
  
  return undefined;
};

module.exports = { assignFilter };

// ? Filters description
// 1. Main page link
// 2. Filter (to get the right links from the Main page)
// 3. Partial link. Some websites store links without the main part (like BBC), so we need to attach it in order to scrape later. Can be undefined.
// ! 4. Passing the location_id further, to store in the hashtags table
// 5. Filter to exclude
