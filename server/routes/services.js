

class WeatherApi {
    constructor() {
        this.apiKey = "c341a945d91ca9e49dad50cea4785c4f"
        this.axios = require('axios')
    }
    async getWetherBycity(cityName) {
        return this.axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`)


    }

}

module.exports = WeatherApi








