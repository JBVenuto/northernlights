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
        for (i = 0; i < this.kpScores.length; i++) {
            if (this.kpScores[i][2] != 'observed' && parseInt(this.kpScores[i][1]) >= this.userKp) {
                console.log(`Kp score of ${this.kpScores[i][1]} at ${this.kpScores[i][0]}`);
                this.auroraDates.push({
                    "date": this.kpScores[i][0],
                    "kp": this.kpScores[i][1]
                });
            }           
        }
        console.log(this.auroraDates);
    },
    
    // Return scores that are equal to or greater than user's Kp
    printForcast: function(){
        
    }

};

// Call the function to collect Kp data
aurora.forcast();