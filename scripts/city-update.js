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
let cityNameField = document.querySelector('#city-name')
let populationField = document.querySelector('#city-population')

async function citySearch() {
  let response = await fetch('https://avancera.app/cities/')
  let data = await response.json()

  let searchInput = document.querySelector('#city-search input')
  let searchButton = document.querySelector('#city-search button')

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

// Stadsredigering
let addCityBtn = document.querySelector('#city-add-button')
let updateCityBtn = document.querySelector('#update-button')
let deleteCityBtn = document.querySelector('#remove-button')

function createCity() {
  let name = cityNameField.value.trim()
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  let population = Number(populationField.value.replace(/\s+/g, '').trim())

  let addCity = {
    'name': name,
    'population': population
  }

  fetch('https://avancera.app/cities/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addCity)
  })
    .then(showCustomAlert(`Du har lagt till: ${name}`))
}

addCityBtn.addEventListener('click', createCity)

function updateCity() {
  let name = cityNameField.value.trim()
  let population = Number(populationField.value.replace(/\s+/g, '').trim())

  fetch('https://avancera.app/cities/')
    .then(response => response.json())
    .then(data => {
      let matchingCity = data.find(city => city.name === name)
      let cityId = matchingCity.id

      if (matchingCity) {
        let updateCity = {
          'name': matchingCity.name,
          'population': population,
          'id': cityId
        }

        fetch(`https://avancera.app/cities/${cityId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateCity)
        })

        showCustomAlert(`Du har uppdaterat: ${matchingCity.name}`)
      } else {
        showCustomAlert('Staden hittades inte.')
      }
    })
}

updateCityBtn.addEventListener('click', updateCity)

function deleteCity() {
  let name = cityNameField.value.trim()
  // let confirmation = false
  // Lägg till dubbelkoll för delete

  fetch('https://avancera.app/cities/')
    .then(response => response.json())
    .then(data => {
      let matchingCity = data.find(city => city.name === name)
      let city = matchingCity.name
      let cityId = matchingCity.id

      fetch(`https://avancera.app/cities/${cityId}`, {
        method: 'DELETE'
      })
      showCustomAlert(`Du har tagit bort: ${city}`)
    })
}

deleteCityBtn.addEventListener('click', deleteCity)