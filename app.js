var fetch = require('node-fetch');

var aurora = {
    // Variables that will be used
    userKp: 4,
    kpScores: [],
    auroraDates: [],

    // Request to gather data from NOAA
    forcast: function() {
        fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json')
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => this.kpScores = json)
        .then(() => this.findAurora());
    },

    // Store the user's Kp
    // (This function will be completed after app is functional)
    

    // Check the estimated Kp scores compared to the user's Kp score
    findAurora: function() {

    }

    
    // Return scores that are equal to or greater than user's Kp

};

// Call the function to collect Kp data
aurora.forcast();