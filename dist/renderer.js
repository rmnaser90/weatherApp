class Renderer {

    renderSearchData(city) {
        $('#searchResult').empty()
        const source = $('#search-template').html()
        const template = Handlebars.compile(source)
        const html = template(city)
        $('#searchResult').append(html)
    }
    renderFavCities(cities){
        $('#favCitiesContainer').empty()
        const source = $('#fav-template').html()
        const template = Handlebars.compile(source)
        const html = template({cities})
        $('#favCitiesContainer').append(html)
    }
}