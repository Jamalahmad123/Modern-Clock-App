'use strict';

// UI ELements

// CONTAINERS
const overlayContainer = document.querySelector('.overlay');
const mainContainer = document.querySelector('.main');
const detailsInfo = document.querySelector('.details');

// QOUTE ELEMENTS
const qouteEL = document.querySelector('.qoute');
const authorEL = document.querySelector('.author');

// TIME ELEMENT
const timeEl = document.querySelector('.time');
const greetingEL = document.querySelector('.greeting');
const iconEL = document.querySelector('.day-and-night');

// COUNTRY AND CITY ELEMENTS
const countryInfoEL = document.querySelector('.location-info');
const timeStandard = document.querySelector('.time-standard');
const timeZoneEL = document.querySelector('.timezone');

// DAY, WEEK AND YEAR ELEMENTS
const weekDayEl = document.querySelector('.week-day');
const yearDayEl = document.querySelector('.year-day');
const yearWeekEl = document.querySelector('.week-year');

// BUTTONS ELEMENT
const btnRefresh = document.querySelector('.refresh');
const btnMore = document.querySelector('.btn-details');

// FUNCTION

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
      countryInfoEL.textContent = `in ${city}, ${country}`;
    });
}

// Getting TimeZone and related stuff from an API
function requestTimeZone() {
  // const apiKey = 'a68b955b16cb4a63b606ff86530e5482';
  const endpoint = 'https://worldtimeapi.org/api/ip';
  // const endpoint = `https://api.ipgeolocation.io/timezone?apiKey=API_KEY`;

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
      timeStandard.textContent = abbreviation;
      timeZoneEL.textContent = timezone;
      weekDayEl.textContent = weekDay;
      yearDayEl.textContent = yearDay;
      yearWeekEl.textContent = weekYear;
      console.log(data);
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
    authorEL.textContent = 'Unknow';
  } else {
    authorEL.textContent = author;
  }
  qouteEL.textContent = `"${text}"`;
}

// getting random qoutes from an API
function getQoutesFromApi() {
  // https://api.quotable.io/random
  const endpoint = 'https://type.fit/api/quotes';
  fetch(endpoint)
    .then(res => res.json())
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
  timeEl.childNodes[0].nodeValue = time;

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
  greetingEL.textContent = `good ${greeting}, it's currently`;

  // setting background images according to time
  if (hr >= 5 && hr <= 17) {
    overlayContainer.classList.add('day');
    iconEL.src = './assets/desktop/icon-sun.svg';
    iconEL.alt = 'icon-sun';
  } else {
    overlayContainer.classList.add('night');
    iconEL.src = './assets/desktop/icon-moon.svg';
    iconEL.alt = 'icon-moon';
    details.style.color = '#fff';
    details.style.background = 'rgba(0, 0, 0, 0.75)';
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
  mainContainer.classList.toggle('transform');
  detailsInfo.classList.toggle('transform');

  // check if transform class is there
  // if (detailsInfo.classList.contains('transform')) {
  //   // make it visible
  //   detailsInfo.hidden = false;
  // } else {
  //   // make it hide
  //   detailsInfo.hidden = true;
  // }
}

// EventHandler
btnMore.addEventListener('click', displayDetails);
btnRefresh.addEventListener('click', getQoutesFromApi);
