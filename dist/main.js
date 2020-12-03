const weatherApp = new WeatherAPP
const renderer = new Renderer


weatherApp.loadFavCities().then(function (cities) {
    renderer.renderSearchData(cities[0])
    renderer.renderFavCities(cities)
})

$('#searchBtn').on('click', async function () {
    const cityName = $('#searchInput').val()
    $('#searchInput').val('')
    const city = await weatherApp.searchForCity(cityName)
    console.log(city);
    renderer.renderSearchData(city)
})

$('#searchResult').on('click', '.addToFavBtn', function () {
    if (weatherApp.tempAddToFav(weatherApp.searchCity)) {
        renderer.renderFavCities(weatherApp.data)
        weatherApp.addToFavCities(weatherApp.searchCity)
    }
})

$('#favCitiesContainer').on('click', '.removeFromFavBtn', function () {
    $(this).closest('.favCity').css('display', 'none')
    const cityName = $(this).closest('.favCity').find('.favCityName').text()
    weatherApp.removeFromFavCity(cityName).then(function (res) {
        renderer.renderFavCities(res)
    })
})