class Renderer {

    renderSearchData(city) {
        const searchResult = $('#searchResult')
        searchResult.empty()
        $('.body').attr('src' ,`${city.photoUrl}`)
        const source = $('#search-template').html()
        const template = Handlebars.compile(source)
        const html = template(city)
        searchResult.append(html)
    }
    renderFavCities(cities){
        $('#favCitiesContainer').empty()
        const source = $('#fav-template').html()
        const template = Handlebars.compile(source)
        const html = template({cities})
        $('#favCitiesContainer').append(html)
    }
}