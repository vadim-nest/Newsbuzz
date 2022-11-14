import { getLocations, getOccurrences, getHashtags, getArticles } from './requestData';

// todo Create a separate function on top, for handling the requests chain (instead of having it all in the handleLocations() function)

const handleData = async () => {
  //////////////////////////////////////
  // Fetching locations
  const locations = await handleLocations();

  //////////////////////////////////////
  // Fetching occurrences
  const locationsIdsArr = locations.map(location => {
    return location.id;
  })

  let occurrencesFromDB = await Promise.all(locationsIdsArr.map(async id => {
    const occurrence = await handleOccurrences(id);
    return await occurrence;
  }))

  //////////////////////////////////////
  // Fetching hashtags
  let occurrencesHTagsIds = occurrencesFromDB.map(element => {
    return element.map(el => {
      return el.hashtag_id;
    });
  })

  let hTagsIdsStrArr = occurrencesHTagsIds.map(element => {
    return element.join('-');
  })

  let hashtagsFromDB = await Promise.all(hTagsIdsStrArr.map(async id => {
    const hashtag = await handleHashtags(id);
    return await hashtag;
  }))

  //////////////////////////////////////
  // Fetching articles
  let occurrencesArticlesIds = occurrencesFromDB.map(element => {
    return element.map(el => {
      return el.url_id;
    });
  })

  let urlsIdsStrArr = occurrencesArticlesIds.map(element => {
    return element.join('-');
  })

  let articlesFromDB = await Promise.all(urlsIdsStrArr.map(async id => {
    const article = await handleArticles(id);
    return await article;
  }))

  // At this point I have all of the data (apart from the sources table, which I didn't set up in the server)
  console.log(locations);
  console.log(occurrencesFromDB);
  console.log(hashtagsFromDB);
  console.log(articlesFromDB);

  // Let's return an array of objects for every location (tie the related things in one object)
  let finalArr = locations.map((element, index) => {
    let objArr = [];
    // objArr.push(element);
    objArr.push({location: element,
                 occurrences: occurrencesFromDB[index],
                 hashtags: hashtagsFromDB[index],
                 urls: articlesFromDB[index],});
    return objArr;
  });

  return (finalArr);
}

const handleLocations = async (locationId) => {
  // console.log(locationId);

  const locations = await getLocations();

  // console.log(occurrence);
  return locations;
}

const handleOccurrences = async (locationId) => {
  // console.log(locationId);

  const occurrence = await getOccurrences(locationId);
  // console.log(occurrence);
  return occurrence;
}

const handleHashtags = async (hashtagsIds) => {
  if (hashtagsIds.length > 0) {
    const hashtags = await getHashtags(hashtagsIds);
    return hashtags;
  }
}

const handleArticles = async (articlesIds) => {
  if (articlesIds.length > 0) {
    const hashtags = await getArticles(articlesIds);
    return hashtags;
  }
}

export default handleData;
