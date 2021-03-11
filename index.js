const installers = [
  {
    name: 'Audio Images',
    address: '1011 California Dr.',
    city: 'Burlingame',
    state: 'CA',
    zip: 94010,
    phone: 6503438388,
    email: 'audioimagesmail@gmail.com',
    hours: '',
    coordinates: { lat: 37.58616, lng: -122.36021 }
  },
  {
    name: 'Car Audio Pros',
    address: '3901 Wible Rd',
    city: 'Bakersfield',
    state: 'CA',
    zip: 93309,
    phone: 6613960523,
    email: 'caraudioprosusa@gmail.com',
    hours: '',
    coordinates: { lat: 35.319221, lng: -119.039726 }
  },
  {
    name: 'Evolution Motorsports',
    address: '5517 San Vicente Blvd.',
    city: 'Los Angeles',
    state: 'CA',
    zip: 90019,
    phone: 3234458187,
    email: 'evolutionmotorsports@yahoo.com',
    hours: '',
    coordinates: { lat: 34.053611, lng: -118.354152 }
  },
  {
    name: 'Precision Body Shop & Detail, Inc.',
    address: '245 Collins Ave.',
    city: 'Colma',
    state: 'CA',
    zip: 94014,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 37.673214, lng: -122.460587 }
  },
  {
    name: 'Precision Body Shop & Detail, Inc.',
    address: '623 Irwin Street',
    city: 'San Rafael',
    state: 'CA',
    zip: 94901,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 37.966637, lng: -122.521828 }
  },
  {
    name: 'San Diego Car Stereo',
    address: '4220 Convoy St.',
    city: ' San Diego',
    state: 'CA',
    zip: 92111,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 32.822258, lng: -117.155106 }
  },
  {
    name: "Simon's Stereo",
    address: '4701 Lankershim Blvd.',
    city: 'North Hollywood',
    state: 'CA',
    zip: 91602,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 34.152859, lng: -118.367355 }
  },
  {
    name: 'Stereo Depot',
    address: '1149 Broadway',
    city: 'El Cajon',
    state: 'CA',
    zip: 92021,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 32.807659, lng: -116.942398 }
  },
  {
    name: 'Stereo Depot',
    address: '6445 El Cajon Blvd.',
    city: 'San Diego',
    state: 'CA',
    zip: 92115,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 32.765407, lng: -117.060203 }
  },
  {
    name: 'Sun Valley Stereo Inc.',
    address: '2809 E. Thomas Rd.',
    city: 'Phoenix',
    state: 'AZ',
    zip: 85016,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 33.480426, lng: -112.018783 }
  },
  {
    name: 'The Specialists',
    address: '5302 E. Broadway Blvd.',
    city: 'Tucson',
    state: 'AZ',
    zip: 85711,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 32.221549, lng: -110.877639 }
  },
  {
    name: 'The Specialists',
    address: '600 E. Frye Blvd.',
    city: ' Sierra Vista',
    state: 'AZ',
    zip: 85635,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 31.554639, lng: -110.29264 }
  },
  {
    name: 'The Specialists',
    address: '4414 E. Speedway Blvd.',
    city: 'Tucson',
    state: 'AZ',
    zip: 85712,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 32.236122, lng: -110.899032 }
  },
  {
    name: 'The Specialists',
    address: '4351 N. Fairview Ave.',
    city: 'Tucson',
    state: 'AZ',
    zip: 85705,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 32.283203, lng: -110.986694 }
  },
  {
    name: 'AutoTech Dealer Services',
    address: '13743 Bear Valley Rd.',
    city: 'Moorkpark',
    state: 'CA',
    zip: 93021,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 34.269439, lng: -118.871505 }
  },
  {
    name: 'Calibred Customs',
    address: '6417 Montgomery Ave #5',
    city: 'Van Nuys',
    state: 'CA',
    zip: 91406,
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 34.186844, lng: -118.482563 }
  }
];

let map;
let userCoordinates;

const zipInput = document.getElementById('zip-input');
const zipForm = document.getElementById('zip-form');

const installerCoordinates = installers.map(
  (installer) => installer.coordinates
);

// asking demo user to enter API key and storing in localStorage for security purposes.
// don't want the key saved in the repo
let API_KEY = localStorage.getItem('API_KEY');

if (!API_KEY || API_KEY === 'null') {
  API_KEY = prompt('Please enter your Google Maps API key', '');
  localStorage.setItem('API_KEY', API_KEY);
}

// append Google Maps script to body
const mapScript = document.createElement('script');
mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
mapScript.async = true;
mapScript.defer = true;
mapScript.type = 'text/javascript';
document.body.appendChild(mapScript);

function initMap() {
  // display the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 38.5816, lng: -121.4944 },
    zoom: 7
  });

  // listen for form submission and set users coordinates based on their input
  zipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipInput.value}&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.results[0]) {
          userCoordinates = json.results[0].geometry.location;

          // set user location on the map - commented out incase needed later
          // const marker = new google.maps.Marker({
          //   position: userCoordinates,
          // });

          // marker.setMap(map);

          findNearest(userCoordinates);
        } else {
          alert('Cannot find location');
        }
      });
  });

  function findNearest() {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [userCoordinates],
        destinations: installerCoordinates.map(
          (coordinates) =>
            new google.maps.LatLng(coordinates.lat, coordinates.lng)
        ),
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },
      (response, status) => {
        if (status !== 'OK') {
          console.log('Error:' + status);
        } else {
          // find smallest distance duration
          const durationValues = response.rows[0].elements.map(
            (num) => num.duration.value
          );

          const smallestDuration = Math.min(...durationValues);
          const indexOfNearestInstaller = durationValues.indexOf(
            smallestDuration
          );

          // set a marker for nearest installer
          const marker = new google.maps.Marker({
            position: installerCoordinates[indexOfNearestInstaller],
            title: installers[indexOfNearestInstaller].name,
            map // ?
          });

          // create and open info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
            <a href="https://maps.google.com/?ll=${installerCoordinates[indexOfNearestInstaller].lat},${installerCoordinates[indexOfNearestInstaller].lng}
            "><h3><b>${installers[indexOfNearestInstaller].name}</b></h3>
            <p>${installers[indexOfNearestInstaller].address}, ${installers[indexOfNearestInstaller].city}, ${installers[indexOfNearestInstaller].state} ${installers[indexOfNearestInstaller].zip}</p></a>
            `
          });
          map.panTo(installerCoordinates[indexOfNearestInstaller]);
          infoWindow.open(map, marker);
        }
      }
    );
  }
}

function gm_authFailure() {
  alert('Invalid API key');
  API_KEY = prompt(
    'Please enter your Google Maps API key, click OK and then refresh the page',
    ''
  );
  localStorage.setItem('API_KEY', API_KEY);
}
