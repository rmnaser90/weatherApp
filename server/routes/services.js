class WeatherApi {
    constructor() {
        this.apiKey =process.env.API_KEY
        this.photoApiKey = process.env.PHOTOS_API_KEY
        this.axios = require('axios')
    }
    async getWetherBycity(cityName) {
        return  this.axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`)
    }
    async getCityPhoto(cityName){
       const result =  await this.axios.get(`https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${this.photoApiKey}`)
        
       const photoUrl = result.data.results[0].urls.regular
       return  photoUrl
    }
    async getCitiesById(citiesIds) {
        citiesIds=citiesIds.toString()
        return  this.axios.get(`https://api.openweathermap.org/data/2.5/group?id=${citiesIds}&appid=${this.apiKey}&units=metric`)
    }
    async getGeoWeather(lat,lon) {
        return await this.axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`)
    }


}

module.exports = WeatherApi

// const axios =require('axios')

// axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=31.816592397140372&lon=35.23318586824766&appid=30156403e79bb0f073dd5cfe98bfd831&units=metric`).then(function (res) {
//     console.log(res.data);
// })








