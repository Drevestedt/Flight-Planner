// Hämta städerna från API:et och lägg till dem i drop-down menyerna
fetch('https://avancera.app/cities/')
  .then(response => response.json())
  .then(cities => {
    let fromDestination = document.querySelector('#dest-from')
    let toDestination = document.querySelector('#dest-to')

    for (let i = 0; i < cities.length; i++) {
      let city = cities[i]
      let cityName = city.name

      let fromOption = document.createElement('option')
      fromOption.textContent = `${cityName}`
      fromDestination.appendChild(fromOption)

      let toOption = document.createElement('option')
      toOption.textContent = `${cityName}`
      toDestination.appendChild(toOption)
    }
  })

// Fånga upp formulärvalen och spara dessa i local storage,
// samt skicka användaren till trip-sidan
let formSubmit = document.querySelector('form')

function valueCheck(fromOption, toOption, dateOption) {
  if (fromOption === "" || toOption === "" || dateOption === "") {
    alert('Fyll i alla fält!')
  } else {
    let flightPlan = {
      'from': fromOption,
      'to': toOption,
      'date': dateOption
    }
    localStorage.setItem('flightPlan', JSON.stringify(flightPlan))

    window.location.href = 'trip.html'
  }
}

formSubmit.addEventListener('submit', (e) => {
  e.preventDefault()

  fromOption = formSubmit.querySelector('#dest-from').value
  toOption = formSubmit.querySelector('#dest-to').value
  dateOption = formSubmit.querySelector('#flight-date').value


  valueCheck(fromOption, toOption, dateOption)
})