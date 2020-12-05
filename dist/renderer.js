class Renderer {

    renderSearchData(city) {
        const searchResult = $('#searchResult')
        searchResult.empty()
        $('#background').remove()
        $('body').append($(`
        <img class="body" id="background" src="${city.photoUrl}" alt="">
        `))
        // background moving animation
        setTimeout(function () {
            let distance = Math.floor($('#background').width() -  $('#mainContainer').width());
            const time = distance/8
            distance=`left: -${distance}px;`
            const styleSheet = document.styleSheets
            styleSheet[1].cssRules[1][1].style.cssText= distance
            $('#background').css('animation-duration',`${time}s`)
            $('#background').css('animation-name','moveRight')
            
        },500)

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