
var aurora = {
    // Variables that will be used
    userKp: 4,
    kpScores: [],
    auroraDates: [],
    visible: false,
    mostRecent: [],
    forcastHTML: "",
    lastRecordHTML: "<h2>The last recorded Kp was ",

    // Request to gather data from NOAA
    forcast: function() {
        fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json')
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => this.kpScores = json)
        .then(() => this.findAurora());
    },

    // Check the estimated Kp scores compared to the user's Kp score
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

    // Store the user's Kp
    // (This function will be completed after app is functional)
    // CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER
    setKp: function() {
        aurora.userKp = document.getElementById("userKpSelector").value;
        console.log(`User kp: ${aurora.userKp}`);
        aurora.auroraDates = [];
        aurora.mostRecent = [];
        aurora.forcastHTML = "";
        aurora.lastRecordHTML = "<h2>The last recorded Kp was ";


        aurora.findAurora();
    },

    // Set the last recorded Kp value 
    // CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER
    lastKpRecorded: function() {
        let recentKp = this.mostRecent[1];
        let lastTime = this.mostRecent[0];

        this.lastRecordHTML += recentKp;
        this.lastRecordHTML += " at ";
        this.lastRecordHTML += lastTime;
        this.lastRecordHTML += "</h2>";

        console.log(this.lastRecordHTML);
    },

    // Function to build the HTML code to populate the website
    // CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER CONTROLLER
    buildHTML: function() {
        for (i = 0; i < this.auroraDates.length; i++) {
            // let forcastItem;
            let forcastItem = "<div class='ephemeris'><h3>";
            forcastItem += this.auroraDates[i].date;
            forcastItem += "</h3><hr><h4>Kp: ";
            forcastItem += this.auroraDates[i].kp;
            forcastItem += "</h4></div>";
            
            this.forcastHTML += forcastItem;
        }
        // console.log(this.forcastHTML);
        this.printForcast();
        // j = document.getElementById("userKpSelector").value
        console.log(`set Kp: ${this.userKp}`);
    },
    
    // Return scores that are equal to or greater than user's Kp
    printForcast: function(){
        document.getElementById("header").innerHTML = this.lastRecordHTML;
        if (this.visible) {
            document.getElementById("forcast").innerHTML = this.forcastHTML;
        }
    },

    testFun: function() {
        alert("Hello World");
    }

};

// Call the function to collect Kp data
aurora.forcast();