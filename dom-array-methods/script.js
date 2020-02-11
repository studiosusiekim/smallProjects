const main = document.getElementById('main');
const addGuestBtn = document.getElementById('add-guest');
const doubleBtn = document.getElementById('double');
const showMOrethanTenGuestsBtn = document.getElementById('show-ten-guest');
const sortBtn = document.getElementById('sort');
const calculateGoGbtn = document.getElementById('calculate-gOg');

let data = [];

getRandomGuest();
getRandomGuest();
getRandomGuest();
getRandomGuest();

// Fetch random guest and add gOg - guest of guest
async function getRandomGuest() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const guest = data.results[0];
  
  const newGuest = {
    name: `${guest.name.first} ${guest.name.last}`,
    gOg: Math.floor(Math.random() * 18)
  }; 
  addData(newGuest); 
}


// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  
  updateDOM();
}

// Double eveyones guest
function doubleGoG() {
  data = data.map(guest => {
    return { ...guest, gOg: guest.gOg * 2 };
  });
  updateDOM();
}


function mostGuests() {
  data.sort((a, b) => b.gOg - a.gOg);
  updateDOM();
}


function showMOrethanTenGuests() {
  data = data.filter(guest => guest.gOg > 10);
  updateDOM();
}


function calculateGoG() {
  const gOg = data.reduce((acc, guest) => (acc += guest.gOg), 0);

  const gOgEl = document.createElement('div');
  gOgEl.innerHTML = `<h3>Total guest of guests: <strong>${gOg}</strong></h3>`;
  main.appendChild(gOgEl);
}


// Update DOM

// Set an default value in a function (providedData = data) means if nothing is passed in we are going to use data
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Guest</strong> + List </h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${item.gOg}`;
    main.appendChild(element);
    });
  }
    
 


// Event listeners
addGuestBtn.addEventListener('click', getRandomGuest);
doubleBtn.addEventListener('click', doubleGoG);
showMOrethanTenGuestsBtn.addEventListener('click', showMOrethanTenGuests);

sortBtn.addEventListener('click', mostGuests);
calculateGoGbtn.addEventListener('click', calculateGoG);
