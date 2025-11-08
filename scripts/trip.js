fetch('https://airportsapi.com/api/countries/SE/airports')
  .then(response => response.json())
  .then(data => console.log(data))

// Filtrera ut på att endast visa de städer som finns i Cities API:et