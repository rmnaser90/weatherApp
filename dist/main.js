const weatherApp = new WeatherAPP

// weatherApp.loadFavCities().then(function (cities) {
    
// })

$('#searchBtn').on('click', function () {
    const cityName = $('#searchInput').val()
    console.log(cityName);
    $('#searchInput').val('')
    weatherApp.searchForCity(cityName).then(function (params) {
        console.log(params);
    })
})