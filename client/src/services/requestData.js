const baseUrl = 'http://localhost:3000/';

const getLocations = async () => {
  try {
    const response = await fetch(baseUrl + 'getLocations');
    return await response.json();
  } catch (error) {
    console.log('Error in requestData.js - getLocations (GET)', error);
  }
}

const getOccurrences = async (locationId) => {
  try {
    const response = await fetch(baseUrl + 'getOccurrences/location_id/:' + locationId);
    return await response.json();
  } catch (error) {
    console.log('Error in requestData.js - getOccurrences (GET)', error)
  }
}

const getHashtags = async (hashtagsIds) => {
  const hashtagsToRequest = JSON.stringify(hashtagsIds);
  try {
    const response = await fetch(baseUrl + 'getHashtags', {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: hashtagsToRequest
  });
    return await response.json();
  } catch (error) {
    console.log('Error in requestData.js - getOccurrences (GET)', error)
  }
}

const getArticles = async (articlesIds) => {
  try {
    const articlesToRequest = JSON.stringify(articlesIds);
    const response = await fetch(baseUrl + 'getArticles', {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: articlesToRequest
  });
    return await response.json();
  } catch (error) {
    console.log('Error in requestData.js - getOccurrences (GET)', error)
  }
}

module.exports = { getLocations, getOccurrences, getHashtags, getArticles };
