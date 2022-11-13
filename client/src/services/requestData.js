// Ypu can do any requests
// const url = 'http://localhost:3000/events';



// const createEvent = (theEvent) => {
//   return fetch(url, {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify(theEvent),
//   })
//     .then(result => result.json())
//     .catch(error => console.log('Error in createEventService.js (POST)', error));
// };

const getHashtags = async () => {
  try {
    const result = await fetch('http://localhost:3000/getHashtagsFromDB');
    console.log(result);
    return await result.json();
  } catch (error) {
    console.log('Error in createEventService.js (GET)', error)
  }
}

// I don't need these
// // Sorting events by date
// const sortEvents = (events) => events.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

// const buttonAnimation = (setButtonText) => {
//   document.querySelector('.create-button').style.transition = 'all 0.5s';
//   document.querySelector('.create-button').style.backgroundColor = 'white';
//   // document.querySelector('.create-button').style.borderColor = 'white';
//   document.querySelector('.create-button').style.color = '#fe7b10';
//   document.querySelector('.create-button').style.fontSize = '22px';
//   setButtonText('✔');
//   setTimeout(() => {
//     document.querySelector('.create-button').style.backgroundColor = '#fe7b10';
//     document.querySelector('.create-button').style.color = 'white';
//     document.querySelector('.create-button').style.fontSize = '15px';
//     setTimeout(() => {
//       setButtonText('Create');
//     }, "300")
//     document.querySelector('.create-button:hover').style.cursor = 'pointer';
//     document.querySelector('.create-button:hover').style.backgroundColor = '#fe9845';
//     document.querySelector('.create-button:hover').style.borderColor = '#fe9845';
//   }, "1500")
// }

// const theNextEvent = () => {
//   console.log('should print just once');
// }

// module.exports = { createEvent, getEvents, sortEvents, buttonAnimation, theNextEvent };

module.exports = { getHashtags };
