const express = require('express')
const WeatherApi = require('./services')
const weatherApi = new WeatherApi
const router = express.Router()
const moment = require('moment')
const City = require('../models/city')

const updateDbHourly = async function () {
    const result = await City.find({}, { _id: 0, openWeatherId: 1 })
    const citiesIds = []
    result.forEach(id => citiesIds.push(id.openWeatherId))
    const updatingResponse = await weatherApi.getCitiesById(citiesIds)
    const updatedCities = updatingResponse.data.list.map(city => {
        return {
            name: city.name,
            openWeatherId: city.id,
            temprature: Math.floor(city.main.temp) + '°',
            condition: city.weather[0].description,
            conditionPic: `animated/${city.weather[0].icon}.svg`,
            date: new Date()
        }
    })
    updatedCities.forEach(city => {
        City.findOneAndUpdate({ openWeatherId: city.openWeatherId },
            {
                temprature: city.temprature,
                condition: city.condition,
                conditionPic: city.conditionPic,
                date: city.date
            },
            { new: true }, function (err, result) {
                console.log("just updated the database");
            })
    })
}
const hour = 1000 * 60 * 60
setInterval(updateDbHourly, hour)

router.get('/weather/:city', async function (req, res) {
    let { city } = req.params
    city = city.split('')[0].toUpperCase() + city.split('').slice(1, city.length).join('').toLowerCase()
    const ifExist = await City.findOne({ name: city })
    if (ifExist) {
        res.send(ifExist)
    } else {
        const result = await weatherApi.getWetherBycity(city)
        let photoUrl
        try {
            photoUrl = await weatherApi.getCityPhoto(city)
           
       } catch (error) {
           console.log(error);
           photoUrl = "/default.jpg"
           
       }
        
        const weather = {
            name: result.data.name,
            coord: result.data.coord,
            openWeatherId: result.data.id,
            temprature: Math.floor(result.data.main.temp) + '°',
            condition: result.data.weather[0].description,
            conditionPic: `animated/${result.data.weather[0].icon}.svg`,
            photoUrl,
            date: new Date()
        }
        const newWeather = new City(weather)
        res.send(newWeather)
    }
})

router.post('/geoWeather/', async function (req, res) {
    let coord = req.body
    const ifExist = await City.findOne({
        $and: [
            { "coord.lat": coord.lat },
            { "coord.lon": coord.lon }
        ]
    })
    if (ifExist) {
        res.send(ifExist)
    } else {
        console.log(coord);
        const result = await weatherApi.getGeoWeather(coord.lat, coord.lon)
        const city = result.data.name
        let photoUrl
        try {
             photoUrl = await weatherApi.getCityPhoto(city)
            
        } catch (error) {
            console.log(error);
            photoUrl = "/default.jpg"
            
        }
        const weather = {
            name: result.data.name,
            coord: result.data.coord,
            openWeatherId: result.data.id,
            temprature: Math.floor(result.data.main.temp) + '°',
            condition: result.data.weather[0].description,
            conditionPic: `animated/${result.data.weather[0].icon}.svg`,
            photoUrl,
            date: new Date()
        }
        const newWeather = new City(weather)
        res.send(newWeather)
    }

})

router.get('/cities', async function (req, res) {
    updateDbHourly()
    const result = await City.find({})
    res.send(result)
})

router.post('/city', async function (req, res) {
    const requestCity = JSON.parse(req.body.city)
    const city = new City(requestCity)
    const isExist = await City.findOne({ name: city.name })
    if (isExist) {
        res.send("already saved")
    } else {
        city.save().then(function (err, result) {
            res.send(result)
        })
    }
})

router.delete('/city/:name', async function (req, res) {
    const cityName = req.params
    const result = await City.findOneAndDelete(cityName)
    res.send(result)
})
module.exports = router