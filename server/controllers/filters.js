// Helper function for createHashtags.js

const today = new Date();
const day = String(today.getDate()).padStart(2, '0')
const month = today.toLocaleString('default', { month: 'short' }).toLowerCase();

// MainPageLinks filters
const theGuardian = ['https://www.theguardian.com/uk', `${month}/${day}`];

module.exports = { theGuardian };
