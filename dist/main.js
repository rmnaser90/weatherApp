const weatherApp = new WeatherAPP
const renderer = new Renderer


weatherApp.loadFavCities().then(function (cities) {
renderer.renderFavCities(cities)
})

$('#searchBtn').on('click', async function () {
    const cityName = $('#searchInput').val()
    $('#searchInput').val('')
    const city = await weatherApp.searchForCity(cityName)
    console.log(city);
    renderer.renderSearchData(city)
})

$('#searchResult').on('click','.addToFavBtn',function () {
    weatherApp.addToFavCities(weatherApp.searchCity).then(function (res) {
        renderer.renderFavCities(res)
    })
})

$('#favCitiesContainer').on('click','.removeFromFavBtn',function () {
    const cityName = $(this).closest('.favCity').find('.favCityName').text()
    weatherApp.removeFromFavCity(cityName).then(function (res) {
        renderer.renderFavCities(res)
    })
})