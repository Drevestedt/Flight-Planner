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

// Sök efter stad
async function citySearch() {
  let response = await fetch('https://avancera.app/cities/')
  let data = await response.json()

  let searchInput = document.querySelector('#city-search input')
  let searchButton = document.querySelector('#city-search button')
  let cityNameField = document.querySelector('#city-name')
  let populationField = document.querySelector('#city-population')

  searchButton.addEventListener('click', () => {
    let searchValue = searchInput.value
    let cityObject = data.find(cityName => cityName.name.toLowerCase() ===
      searchValue.toLowerCase())
    if (cityObject) {
      cityNameField.value = cityObject.name
      populationField.value = cityObject.population
    } else {
      showCustomAlert('Ingen stad hittades.')
      cityNameField.value = ''
      populationField.value = ''
    }
  })
}

citySearch()