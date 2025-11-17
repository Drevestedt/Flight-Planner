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

// Räkna ut ungefärlig flygtid och visa för användaren
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

// Räkna ut avståndet mellan städerna
const coordinates = await getCoordinates()

console.log(coordinates.fromLat)

// await function ()