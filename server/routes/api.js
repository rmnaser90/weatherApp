const express = require('express')
const WeatherApi = require('./services')
const weatherApi = new WeatherApi
const router = express.Router()
const moment = require('moment')
const City = require('../models/city')

router.get('/weather/:city', async function (req, res) {
    const { city } = req.params
    const result = await weatherApi.getWetherBycity(city)
    const photoUrl = await weatherApi.getCityPhoto(city)
    const weather = {
        name: result.data.name,
        temprature: Math.floor(result.data.main.temp) +'°',
        condition: result.data.weather[0].description,
        conditionPic: `https://openweathermap.org/img/wn/${result.data.weather[0].icon}.png`,
        photoUrl,
        date: new Date()
    }
    const newWeather = new City(weather)
    res.send(newWeather)
})

router.get('/cities', async function (req, res) {
    const result = await City.find({})
    res.send(result)
})

router.post('/city', async function (req, res) {
    const requestCity = req.body
    const city = new City(requestCity)
    const isExist = await City.findOne({name: city.name})
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