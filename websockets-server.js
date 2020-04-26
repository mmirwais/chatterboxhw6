var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];
var topic = "";

console.log('websockets server started');

ws.on('connection', function (socket){
    console.log('client connection established');
    if (topic != ""){
        var topicMsg = "*** Topic is '" + topic + "' ***";
        socket.send(topicMsg)
    }
    else {
        var topicMsg = "*** There is no topic ***";
        socket.send(topicMsg);
    }
    messages.forEach(function(msg) {
        socket.send(msg);
    })

    socket.on('message', function(data){
        console.log('message recieved: ' + data);
        var command = data.substring(0, 6);
        if (command === "/topic"){
            topic = data.substring(7);
            var topicMsg = "*** Topic is '" + topic + "' ***";
            ws.clients.forEach(function (clientSocket) {
                clientSocket.send(topicMsg);
            });    
        }
        else {
            messages.push(data);
            ws.clients.forEach(function (clientSocket) {
                clientSocket.send(data);
            });    
        }
    });
});