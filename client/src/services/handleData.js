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

  // Somewhere here maybe I need to filter the occurrances then?
  // At least, they are kinda sorted by count
  // console.log(occurrencesFromDB);
  const occurrences = filterOccurrences(occurrencesFromDB);

  //////////////////////////////////////
  // Fetching hashtags
  // TODO: you are fetching hashtags for every location. A lot of hashtag repetition
  let occurrencesHTagsIds = occurrences.map(element => {
    return element.map(el => {
      return el.hashtag_id;
    });
  })
  console.log(occurrencesHTagsIds);
  // let hTagsIdsStrArr = occurrencesHTagsIds.map(element => {
  //   return element.join('-');
  // })
  // console.log(hTagsIdsStrArr);
  let hashtagsFromDB = await Promise.all(occurrencesHTagsIds.map(async idsArr => {
    const hashtag = await handleHashtags(idsArr);
    return await hashtag;
  }))

  //////////////////////////////////////
  // Fetching articles
  // ! Need to fix articles fetching now
  let occurrencesArticlesIds = occurrences.map(element => {
    return element.map(el => {
      let urlIds = el.url_id;
      return urlIds;
    });
  })

  // console.log(occurrencesArticlesIds);
  let allArticlesToFetch = [];
  occurrencesArticlesIds.forEach(element => {
    element.forEach(ids => {
      // console.log(ids);
      ids.forEach(id => {
        if (!allArticlesToFetch.includes(id)) {
          allArticlesToFetch.push(id);
        }
      })
    })
  })
  console.log(allArticlesToFetch);
  let articlesFromDB = await handleArticles(allArticlesToFetch)

  // Let's return an array of objects for every location (tie the related things in one object)
  // let finalArr = locations.map((element, index) => {
  //   let objArr = [];
  //   // objArr.push(element);
  //   objArr.push({location: element,
  //                occurrences: occurrences[index],
  //                hashtags: hashtagsFromDB[index],
  //                urls: articlesFromDB});
  //   return objArr;
  // });

  locations.forEach((element, index) => {
    // Sort occurrences by hashtag_count
    let tempOccurr = occurrencesFromDB[index];
    tempOccurr.sort(function(a, b){
      return b.hashtag_count - a.hashtag_count;
    })
    element.occurrences = occurrencesFromDB[index];
  })

  // console.log(hashtagsFromDB);
  let uniqHashtags = [];
  hashtagsFromDB.forEach((element) => {
    // console.log(element);
    if (element) {
      element.forEach(hTag => {
        if(!uniqHashtags.includes(hTag)) {
          uniqHashtags.push(hTag);
        }
      })
    }
  })

  // At this point I have all of the data (apart from the sources table, which I didn't set up in the server)
  // console.log(locations);
  // console.log(uniqHashtags);
  // console.log(articlesFromDB);

  return ([locations, uniqHashtags, articlesFromDB]);
}

const handleLocations = async () => {
  const locations = await getLocations();
  return locations;
}

const handleOccurrences = async (locationId) => {
  const occurrence = await getOccurrences(locationId);
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

function filterOccurrences(occurrencesFromDB) {
  occurrencesFromDB.forEach(element => {
    element.forEach(occurrence => {
      if (occurrence.url_id) {
        occurrence.url_id = [occurrence.url_id];
      }
    })
  })
  let occurrByLocation = [];
  occurrencesFromDB.forEach(element => {
    let countedHashtags = [];

    element.forEach(occurrence => {
      if (countedHashtags.length > 0 && countedHashtags[countedHashtags.length - 1].hashtag_id === occurrence.hashtag_id) {
        countedHashtags[countedHashtags.length - 1].hashtag_count = countedHashtags[countedHashtags.length - 1].hashtag_count + occurrence.hashtag_count;

        // if url ids are different
        if (!countedHashtags[countedHashtags.length - 1].url_id.includes(occurrence.url_id[0])) {
          countedHashtags[countedHashtags.length - 1].url_id.push(...occurrence.url_id);
        }
      } else {
        countedHashtags.push(occurrence);
      }
    })

    // countedHashtags.sort(function(a, b){
    //   return b.hashtag_count - a.hashtag_count;
    // })
    occurrByLocation.push(countedHashtags);
  })

  // ! Limit for the amount of hashtags per location
  // console.log(occurrByLocation);
  // const limit = [];
  // occurrByLocation.forEach(element => {
  //   limit.push(element.slice(0, 10));
  // })
  // occurrByLocation.slice(0, 10);

  // console.log(limit);
  return occurrByLocation;
}

export default handleData;

// ? Wasn't working, not sure why..
// module.exports = { handleData };
