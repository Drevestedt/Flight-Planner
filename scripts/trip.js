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
let clearButton = document.querySelector('button')

clearButton.addEventListener('click', () => {
  localStorage.clear()
  window.location.href = 'index.html'
})