const https = require('https');
const Venue = require('../models/venue');
const axios = require('axios');
const fs = require('fs')


const tryPredictWeather = async (event) => {

    event.weather = null;

    // First check that the event is within three days (can use API forcast for three days)
    const eventDate = new Date(event.date);
    const today = new Date();
    const threeDaysFromNow =  new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    if (today.getTime() > eventDate.getTime() || eventDate.getTime() > threeDaysFromNow.getTime()) {
        return null;
    }

    let daysUntilShow = Math.round((eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    // Get venue of this event for forcast
    const match = await Venue.find({name: event.venueName}).exec();
    if (match.length < 1) {
        return null;
    }
    const venue = match[0];


    const API_KEY = fs.readFileSync('keys/weather').toString();
    // API returns a JSON with 3 hour forcasts... So 8 objects for each day
    const forcastId = daysUntilShow * 8;
    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${venue.location.city},${venue.location.country}&cnt=${forcastId + 1}&limit=1&appid=${API_KEY}`)
    .then(response => {
        const sample = response.data.list[forcastId];
        const weatherCode = sample.weather[0].icon;
        const temperature = Math.round(sample.main.temp / 10);
        predictedWeather = { "temp" : temperature, "code" : weatherCode};
        event.weather = predictedWeather;
    })
    .catch(error => {
        return null;
    });

};

module.exports = tryPredictWeather;
