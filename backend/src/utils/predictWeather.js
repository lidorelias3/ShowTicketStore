const https = require('https');
const Venue = require('../models/venue');
const axios = require('axios');


const tryPredictWeather = async (event) => {

    // First check that the event is within three days (can use API forcast for three days)
    const eventDate = event.date;
    const today = new Date();
    const threeDaysFromNow =  new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    if (today.getTime() > eventDate.getTime() || eventDate.getTime() > threeDaysFromNow.getTime()) {
        return null;
    }

    const match = await Venue.find({name: event.venueName}).exec();
    
    if (match.length < 1) {
        return null;
    }

    const venue = match[0];
    console.log("Venue location city is:", venue.location.city);
    console.log("Venue location country is:", venue.location.country);

    // console.log("Venue location country is:", venue.location);
    const API_KEY = "";

};

module.exports = tryPredictWeather;
