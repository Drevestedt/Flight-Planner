// Kolla att det finns en planerad resa sparad innan sidan kan fås tillgång till
let tripPage = document.querySelector('#tripPage')

tripPage.addEventListener('click', (e) => {
  if (localStorage.getItem('flightPlan')) {
    window.location.href = 'trip.html'
  } else {
    e.preventDefault()
    alert('Du har ingen sparad resa')
  }
})

/* Hämta städerna från API:et och lägg till dem i drop-down menyerna, samt
hämta ut population data */
fetch('https://avancera.app/cities/')
  .then(response => response.json())
  .then(cities => {
    // for access in trip.html/js
    localStorage.setItem('cities', JSON.stringify(cities))

    let fromDestination = document.querySelector('#dest-from')
    let toDestination = document.querySelector('#dest-to')

    for (let i = 0; i < cities.length; i++) {
      let cityInfo = cities[i]
      let cityName = cityInfo.name

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