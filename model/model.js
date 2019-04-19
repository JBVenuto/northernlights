var aurora = {

// Variables from the API
    userKp: 4,
    kpScores: [],
    auroraDates: [],
    visible: false,
    mostRecent: [],
    forcastHTML: "",

// Get the information from from the API
    forcast: function() {
        fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json')
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => this.kpScores = json)
        .then(() => this.findAurora());
    },

// Check estimated Kp scores compared to the user's Kp
    findAurora: function() {
        for (i = 0; i < this.kpScores.length; i++) {
            if (this.kpScores[i][2] != 'observed' && parseInt(this.kpScores[i][1]) >= this.userKp) {
                console.log(`Kp score of ${this.kpScores[i][1]} at ${this.kpScores[i][0]}`);
                this.visible = true;
                this.auroraDates.push({
                    "date": this.kpScores[i][0],
                    "kp": this.kpScores[i][1]
                });
            }  
            if (this.kpScores[i][2] === 'observed') {
                this.mostRecent = this.kpScores[i];
            }        
        }
        console.log(`Most recent reading: ${this.mostRecent}`);
        console.log(this.mostRecent[0]);
        console.log(this.mostRecent[1]);
        console.log(this.auroraDates);

        this.lastKpRecorded();
        this.buildHTML();
    },

// Send relevent information to the controller
}

export default aurora;