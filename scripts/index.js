// Egen Alert Modal funktion
function showCustomAlert(message) {
  const overlay = document.querySelector('#alert-modal-overlay')
  const alertMessage = document.querySelector('#alert-message')
  const okButton = document.querySelector('#alert-ok-button')

  overlay.style.display = 'flex'
  alertMessage.textContent = message

  okButton.addEventListener('click', () => {
    overlay.style.display = 'none'
  })

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none'
    }
  })
}

// Kolla att det finns en planerad resa sparad innan sidan kan fås tillgång till
let tripPage = document.querySelector('#tripPage')

tripPage.addEventListener('click', (e) => {
  if (localStorage.getItem('flightPlan')) {
    window.location.href = 'trip.html'
  } else {
    e.preventDefault()
    showCustomAlert('Du har ingen planerad resa.')
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
    showCustomAlert('Fyll i alla fält!')
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