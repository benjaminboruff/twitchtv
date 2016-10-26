/*global Vue*/
/*global $*/
// app for fcc twitchtv project

var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];


var getReq = {
    "url": "https://api.twitch.tv/kraken/streams/",
    "headers": {
        "Accept": "application/vnd.twitchtv.v3+json",
        "Client-ID": "p9v1i3v7nkl3s4abraztbc23l03imgx"
    },
    "success": function (data) {
        data.name = data._links.channel.match(/\/\w*$/)[0].slice(1);
        data.url = "https://www.twitch.tv/" + data.name;
        if (data.stream === null) {
            data.stream = "offline";
            vm.offlineData.push(data);
        } else {
            data.img = data.stream.channel.logo;
            vm.onlineData.push(data);
        }
        vm.allData.push(data);// allData is the main data array
    },
     "error": function (){
         console.log("could not connect!");         
    },
    "cache": false
};

var vm = new Vue({
    "el": "#app",
    "data": {
        "viewData": [],
        "allData": [],
        "onlineData": [],
        "offlineData": []
    },
    "created": function () {
        channels.forEach(function (user){
            getReq.url = "https://api.twitch.tv/kraken/streams/" + user;
            //console.log(getReq);
            $.ajax(getReq);
        });
        this.viewData = this.allData;
    },
    "methods": {
        "loadAll": function() {
            this.viewData = this.allData;
        },
        "loadOnline": function() {
            this.viewData = this.onlineData;
        },
        "loadOffline": function() {
            //console.log(this.allData);
            this.viewData = this.offlineData;
        }
    }
    
});
