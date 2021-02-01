const installerCoordinates = {};
let zip;
let userLocation = null;

const zipInput = document.getElementById("zip-input");
const zipForm = document.getElementById("zip-form");

// Asking demo user to enter API key and storing in localStorage for security purposes.
// Don't want the key saved in the repo
let API_KEY = localStorage.getItem("API_KEY");

if (!API_KEY || API_KEY === "null") {
  API_KEY = prompt("Please enter your Google Geolocation API key", "");
  localStorage.setItem("API_KEY", API_KEY);
}

// TODO - activate Map API in Google dashboard to enable this feature
// Initializing the Google Map
//
// let map
// const initMap = () => {
//  map = new google.maps.Map(document.getElementById("map"), {
//      center: { lat: -34.397, lng: 150.644 },
//      zoom: 8,
//  })
// }

// Ask for user location via browser geolocation API.
// User can block access and still enter their ZIP
zipInput.addEventListener("focus", () => {
  zipInput.value = "";

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  console.log("running");

  const success = (pos) => {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
});

zipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  zip = zipInput.value;
  console.log(zip);
});

// TODO - waiting for Google API dashboard access
const URL = `http://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=H8MW%2BWP%20Kolkata%20India&destinations=GCG2%2B3M%20Kolkata%20India&key=${API_KEY}`;

if (API_KEY && API_KEY !== "null") {
  fetch(URL)
    .then((response) => response.json())
    .then((json) => console.log(json));
}
