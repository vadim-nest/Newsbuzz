const baseUrl = 'http://localhost:3000/';

const getLocations = async () => {
  try {
    const response = await fetch(baseUrl + 'getLocations');
    // console.log(response.json());
    return await response.json();
  } catch (error) {
    console.log('Error in requestData.js - getLocations (GET)', error);
  }
}

const getOccurrences = async (locationId) => {
  try {
    // console.log(baseUrl + 'getOccurrences/location_id/:' + locationId);
    const response = await fetch(baseUrl + 'getOccurrences/location_id/:' + locationId);
    // console.log(response.json());
    return await response.json();
  } catch (error) {
    console.log('Error in requestData.js - getOccurrences (GET)', error)
  }
}

const getHashtags = async (hashtagsIds) => {
  const hashtagsToRequest = JSON.stringify(hashtagsIds);
  try {
    // console.log(baseUrl + 'getOccurrences/location_id/:' + locationId);
    const response = await fetch(baseUrl + 'getHashtags', {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: hashtagsToRequest
  });
    // console.log(response.json());
    return await response.json();
  } catch (error) {
    console.log('Error in requestData.js - getOccurrences (GET)', error)
  }
}

const getArticles = async (articlesIds) => {
  try {
    const articlesToRequest = JSON.stringify(articlesIds);
    // console.log(baseUrl + 'getOccurrences/location_id/:' + locationId);
    const response = await fetch(baseUrl + 'getArticles', {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: articlesToRequest
  });
    // console.log(response.json());
    return await response.json();
  } catch (error) {
    console.log('Error in requestData.js - getOccurrences (GET)', error)
  }
}

// router.get('getHashtags/hashtags/:hashtags', (req, res) => {
//   req.hashtags = req.params;
//   getHashtags(req, res);
// });

module.exports = { getLocations, getOccurrences, getHashtags, getArticles };
