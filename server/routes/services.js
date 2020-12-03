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
}

module.exports = WeatherApi








