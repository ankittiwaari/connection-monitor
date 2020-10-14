"use strict"
const https = require('https');
const notifier = require('node-notifier');
const path = require('path');
let statusFlag = "disconnected";
const monitorNetwork = (param) => {
    let url = param.pingUrl;
    let date = new Date();
    let localDate = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    https.get(url, (res) => {
        process.stdout.write(".");
        if (statusFlag === "disconnected"){
            notifyUser("Connected", "success");    
        }
        statusFlag = "connected";
    }).on('error', (d) => {
        console.log('Disconnected :: ' + localDate);
        if (statusFlag === "connected"){
            notifyUser("Link down!", "failed")
          statusFlag = "disconnected";        
        }
    });
};
const notifyUser = (message, type) => {
    notifier.notify({
        title: 'Connection monitor',
        message: message,
        icon: path.join(__dirname, type + '.png'),
        sound: true
      });
}

const monitor = (param) => {
    console.clear();
    console.log("Initiating network monitor with following parameters:")
    console.log("Ping url: " + param.pingUrl);
    console.log("Ping interval: " + param.pingInterval + "ms");
    monitorNetwork(param);
    setInterval(monitorNetwork, param.pingInterval, param);
}

module.exports.monitorNetwork = monitor;