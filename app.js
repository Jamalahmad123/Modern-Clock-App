'use strict';

// UI ELements
// CONTAINERS
const overlayContainer = document.querySelector('.overlay');

// BUTTONS ELEMENT
const btnRefresh = document.querySelector('.refresh');
const btnMore = document.querySelector('.btn-details');

// FUNCTION

// selector is a function that recieve an argument of class name or id name and it will select that element based on the html selector
function selector(selectorName) {
  return document.querySelector(selectorName);
}

// Getting IP Address from an API
function getIpAdressFromApi() {
  // endpoint
  // const endpoint = 'http://ip-api.com/json/';
  // https://ipinfo.io/json?token=$TOKEN
  const apiKey = '1c2187e9a553ff';
  const endpoint = `https://ipinfo.io/json?token=${apiKey}`;

  fetch(endpoint)
    .then(res => {
      return res.json();
    })
    .then(user => {
      const { city, country, region } = user;

      // updating markup

      selector('.location-info').textContent = `in ${city}, ${country}`;
    });
}

// Getting TimeZone and related stuff from an API
function requestTimeZone() {
  // const apiKey = 'a68b955b16cb4a63b606ff86530e5482';
  // const endpoint = `https://api.ipgeolocation.io/timezone?apiKey=API_KEY`;
  const endpoint = 'https://worldtimeapi.org/api/ip';

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      // getting relevant data from object
      const {
        abbreviation,
        day_of_week: weekDay,
        day_of_year: yearDay,
        week_number: weekYear,
        timezone,
      } = data;

      // updating makrup
      selector('.time-standard').textContent = abbreviation;
      selector('.timezone').textContent = timezone;
      selector('.week-day').textContent = weekDay;
      selector('.year-day').textContent = yearDay;
      selector('.week-year').textContent = weekYear;
    });
}

// Getting qoutes
let apiQoutes = [];

function getRandomQuote() {
  // selecting random qoute
  const { author, text } =
    apiQoutes[Math.floor(Math.random() * apiQoutes.length)];

  // check if author is null
  if (author === null) {
    selector('.author').textContent = 'Unknow';
  } else {
    selector('.author').textContent = author;
  }
  selector('.qoute').textContent = `"${text}"`;
}

// getting random qoutes from an API
function getQoutesFromApi() {
  // https://api.quotable.io/random
  const endpoint = 'https://type.fit/api/quotes';
  fetch(endpoint)
    .then(res => {
      return res.json();
    })
    .then(qoute => {
      apiQoutes = qoute;
      getRandomQuote();
    });
}

function clock() {
  const option = {
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  };
  // const locale = navigator.language;
  const now = new Date();

  // getting time on user local
  const time = new Intl.DateTimeFormat('en-us', option).format(now);
  selector('.time').childNodes[0].nodeValue = time;

  // check time for different greetings
  let greeting;
  const hr = now.getHours();
  const min = now.getMinutes();
  if (hr >= 5 && hr <= 11) {
    greeting = 'morning';
  } else if (hr >= 12 && hr <= 17) {
    greeting = 'afternoon';
  } else {
    greeting = 'evening';
  }

  // setting the greeting msg
  selector('.greeting').textContent = `good ${greeting}, it's currently`;

  // setting background images according to time
  if (hr >= 5 && hr <= 17) {
    overlayContainer.classList.add('day');
    selector('.day-and-night').src = './assets/desktop/icon-sun.svg';
    selector('.day-and-night').alt = 'icon-sun';
  } else {
    overlayContainer.classList.add('night');
    selector('.day-and-night').src = './assets/desktop/icon-moon.svg';
    selector('.day-and-night').alt = 'icon-moon';
    selector('.details').style.color = '#fff';
    selector('.details').style.background = 'rgba(0, 0, 0, 0.75)';
  }

  setTimeout(clock, 1000);
}

getQoutesFromApi();
getIpAdressFromApi();
requestTimeZone();
clock();

// EVENT HANDLERS FUNCTIONS
function displayDetails() {
  // rotate Arrow to up and down
  this.classList.toggle('rotate');

  // toggle transform class to show more info
  selector('.main').classList.toggle('transform');
  selector('.details').classList.toggle('transform');
}

// EventHandler
btnMore.addEventListener('click', displayDetails);
btnRefresh.addEventListener('click', getQoutesFromApi);
