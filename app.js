// var fetch = require('node-fetch');

var aurora = {
    // Variables that will be used
    userKp: 3,
    kpScores: [],
    auroraDates: [],
    forcastHTML: [],

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
        this.buildHTML();
    },

    buildHTML: function() {
        for (i = 0; i < this.auroraDates.length; i++) {
            // let forcastItem;
            let forcastItem = "<span><h3>";
            forcastItem += this.auroraDates[i].date;
            forcastItem += "</h3><h4>Kp: ";
            forcastItem += this.auroraDates[i].kp;
            forcastItem += "</h4></span>";
            
            this.forcastHTML.push(forcastItem);
        }
        console.log(this.forcastHTML);
        this.printForcast();
    },
    
    // Return scores that are equal to or greater than user's Kp
    printForcast: function(){
        let testVar = "test"
        document.getElementById("forcast").innerHTML = this.forcastHTML;
        
    }

};

// Call the function to collect Kp data
aurora.forcast();