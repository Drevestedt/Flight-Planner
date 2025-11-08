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

// Fånga upp formulärvalen och skicka dessa till infosidan
let formSubmit = document.querySelector('form')

formSubmit.addEventListener('submit',)