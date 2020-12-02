const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema= new Schema({
    name: String,
    temprature: Number,
    conditionPic: String,
    condition: String,
    date: Date
})

const City = mongoose.model('city', citySchema)

module.exports = City