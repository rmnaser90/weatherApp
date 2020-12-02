
class WeatherAPP{
    constructor(
    ){
        this.apiManger = new ApiManager
        this.data = []
        this.searchCity={}
    }

    async loadFavCities(){
        const result = await this.apiManger.getFavCities()
        this.data = result
        return this.data
    }
    async addToFavCities(city){
             await this.apiManger.addToFavCities(city)
             return await this.loadFavCities()
    }

    async searchForCity(cityName){
        const city = await this.apiManger.getCityByName(cityName)
        this.searchCity= city
        return this.searchCity
    }
    async removeFromFavCity(cityName){
         await this.apiManger.deleteCity(cityName)
         return await this.loadFavCities()
    }

}


