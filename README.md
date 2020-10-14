# Connection monitor
A simple tool to monitor your network connectivity. It will show an alert when your network transitions from connected and diconnected state

## Usage
```node 
const cm = require("@ankittiwaari/connection-monitor")

let config = {
    pingUrl: "<a-suitable-network.url>", //url to ping
    pingInterval: 10000 //the interval in which ping must be sent
}

cm.monitorNetwork(config);