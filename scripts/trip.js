// Hämta objekt-data från local storage och visa dessa för användaren
let flightPlan = JSON.parse(localStorage.getItem('flightPlan'))
let fromCity = flightPlan.from
let toCity = flightPlan.to
let date = flightPlan.date

let fromInfo = document.querySelector('.from')
let firstFromP = fromInfo.querySelector('p')
let newFromPhraseInfo = document.createElement('p')
newFromPhraseInfo.textContent = fromCity
newFromPhraseInfo.style.marginRight = '5em'
newFromPhraseInfo.style.color = 'rgba(255, 255, 0, 0.861)'
firstFromP.insertAdjacentElement('afterend', newFromPhraseInfo)

let toInfo = document.querySelector('.to')
let firstToP = toInfo.querySelector('p')
let newToPhraseInfo = document.createElement('p')
newToPhraseInfo.textContent = toCity
newToPhraseInfo.style.marginRight = '5em'
newToPhraseInfo.style.color = 'rgba(255, 255, 0, 0.861)'
firstToP.insertAdjacentElement('afterend', newToPhraseInfo)

let dateInfo = document.querySelector('.date-time')
let firstDateP = dateInfo.querySelector('p')
let newDateInfo = document.createElement('p')
newDateInfo.textContent = date
newDateInfo.style.marginRight = '5em'
newDateInfo.style.color = 'rgba(255, 255, 0, 0.861)'
firstDateP.insertAdjacentElement('afterend', newDateInfo)

// Flygplatsdata för från stad som ska visas för användaren
fetch('https://airportsapi.com/api/countries/SE/airports')
  .then(response => response.json())
  .then(async data => {
    let cityFound = false

    while (cityFound === false) {
      for (let i = 0; i < data.data.length; i++) {
        let airportInfo = data.data[i].attributes
        let cityName = airportInfo.name
        let airportCode = airportInfo.code

        if (cityName.toLowerCase().includes(fromCity.toLowerCase())) {
          let secondFromP = fromInfo.querySelectorAll('p')[2]
          let airportCodeP = document.createElement('p')
          airportCodeP.textContent = airportCode
          airportCodeP.style.marginRight = '5em'
          airportCodeP.style.color = 'rgba(255, 255, 0, 0.861)'
          secondFromP.insertAdjacentElement('afterend', airportCodeP)
          cityFound = true
        }
      }
      if (!cityFound) {
        let nextPage = data.links.next
        let newResponse = await fetch(nextPage)
        let newData = await newResponse.json()
        data = newData
      }
    }
  })

// Flygplatsdata för till stad som ska visas för användaren
fetch('https://airportsapi.com/api/countries/SE/airports')
  .then(response => response.json())
  .then(async data => {
    let cityFound = false

    while (cityFound === false) {
      for (let i = 0; i < data.data.length; i++) {
        let airportInfo = data.data[i].attributes
        let cityName = airportInfo.name
        let airportCode = airportInfo.code

        if (cityName.toLowerCase().includes(toCity.toLowerCase())) {
          let secondToP = toInfo.querySelectorAll('p')[2]
          let airportCodeP = document.createElement('p')
          airportCodeP.textContent = airportCode
          airportCodeP.style.marginRight = '5em'
          airportCodeP.style.color = 'rgba(255, 255, 0, 0.861)'
          secondToP.insertAdjacentElement('afterend', airportCodeP)
          cityFound = true
        }
      }
      if (!cityFound) {
        let nextPage = data.links.next
        let newResponse = await fetch(nextPage)
        let newData = await newResponse.json()
        data = newData
      }
    }
  })

// Rensa flygrutt från local storage och gå till start-sidan
// Via knappen
let clearButton = document.querySelector('button')

clearButton.addEventListener('click', () => {
  localStorage.clear()
  window.location.href = 'index.html'
})

// Rensa flygrutt från local storage och gå till start-sidan
// Via länkar i Navbaren
let clearLink = document.querySelector('#navLinkOne')
let clearNameLink = document.querySelector('h1')

clearLink.addEventListener('click', () => {
  localStorage.clear()
  window.location.href = 'index.html'
})

clearNameLink.addEventListener('click', () => {
  localStorage.clear()
  window.location.href = 'index.html'
})

// Hämta koordinater
async function getCoordinates() {
  // Från-stad koordinater
  let fromLat = null
  let fromLong = null

  let fromResponse = await fetch('https://airportsapi.com/api/countries/SE/airports')
  let fromData = await fromResponse.json()
  let fromCityMatch = false

  while (fromCityMatch === false) {
    for (let i = 0; i < fromData.data.length; i++) {
      let fromCityName = fromData.data[i].attributes.name

      if (fromCityName.toLowerCase().includes(fromCity.toLowerCase())) {
        fromLat = fromData.data[i].attributes.latitude
        fromLong = fromData.data[i].attributes.longitude
        fromCityMatch = true
        break;
      }
    }

    if (!fromCityMatch) {
      let fromNextPage = fromData.links.next
      let newFromResponse = await fetch(fromNextPage)
      let fromNewData = await newFromResponse.json()
      fromData = fromNewData
    }
  }

  // Till-stads koordinater
  let toLat = null
  let toLong = null

  let toResponse = await fetch('https://airportsapi.com/api/countries/SE/airports')
  let toData = await toResponse.json()
  let toCityMatch = false

  while (toCityMatch === false) {
    for (let i = 0; i < toData.data.length; i++) {
      let toCityName = toData.data[i].attributes.name

      if (toCityName.toLowerCase().includes(toCity.toLowerCase())) {
        toLat = toData.data[i].attributes.latitude
        toLong = toData.data[i].attributes.longitude
        toCityMatch = true
        break;
      }
    }

    if (!toCityMatch) {
      let toNextPage = toData.links.next
      let toNewResponse = await fetch(toNextPage)
      let toNewData = await toNewResponse.json()
      toData = toNewData
    }
  }

  let coordinates = {
    'fromLat': fromLat,
    'fromLong': fromLong,
    'toLat': toLat,
    'toLong': toLong
  }

  return coordinates
}

// Haversine-formel för att räkna ut avstånd mellan koordinater
// Helt skriven av ChatGPT
function haversine(lat1, long1, lat2, long2) {
  const R = 6371; // Jordens radie i km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (long2 - long1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Beräkna ungefärlig flygtid och visa för användaren
async function flightTime() {
  let coordinates = await getCoordinates()
  const { fromLat, fromLong, toLat, toLong } = coordinates

  let kmDistance = haversine(fromLat, fromLong, toLat, toLong)
  let averageSpeed = 450
  let flightTime = kmDistance / averageSpeed
  let flightTimeMinutes = Math.round(flightTime * 60)

  let flightTimeP = document.querySelector('#flightTimeP')
  let newFlightTime = document.createElement('p')
  newFlightTime.textContent = flightTimeMinutes
  newFlightTime.style.marginRight = '2em'
  newFlightTime.style.color = 'rgba(255, 255, 0, 0.861)'
  flightTimeP.insertAdjacentElement('afterend', newFlightTime)
}

flightTime()

// Chart.js
let chartCanvas = document.querySelector('#elevation')

async function elevation() {
  const airports = []

  const response = await fetch('https://airportsapi.com/api/countries/SE/airports')
  const data = await response.json()

  airports.push(...data.data)

  let next = data.links?.next

  let airportMatch = airports.find(i => i.city === fromCity)

  if (airportMatch) return airportMatch

  while (next) {
    let newResponse = await fetch(next)
    let newData = await newResponse.json()

    airports.push(...newData.data)
    next = newData.links?.next

    airportMatch = airports.find(i => i.city === fromCity)

    if (airportMatch) return airportMatch
  }

  return null
}

// let elevation1 = .find
// let elevation2 = .find

let dataToShow = {
  'from': fromCity,
  'to': toCity,
  // 'elevation1': ,
  // 'elevation2': 
}

let chartData = {
  labels: [dataToShow.from, dataToShow.to],
  datasets: [
    {
      data: [dataToShow., dataToShow.],
      backgroundColor: ['rgba(220, 220, 0, 0.86)', 'rgba(220, 220, 0, 0.86)']
    }
  ]
}

new Chart(chartCanvas, {
  type: 'bar',
  data: chartData,
  options: {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#f7fafc',
          font: {
            size: '16'
          }
        },
        grid: {
          color: '#f7fafc'
        }
      },
      y: {
        ticks: {
          color: '#f7fafc',
          font: {
            size: '16'
          }
        },
        grid: {
          color: '#f7fafc'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
})