const express = require('express');
const app = express();

app.set('port', process.env.PORT || 5000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

const server = app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
const io = require('socket.io')(server);
const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const pump = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
io.sockets.on('connection', (socket) => {
  // WebSocket Connection
  console.log('a user connected');
  const pumpValue = 0; //static variable for current status
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('pump', (data) => {
    //get pump switch status from client
    if (data != pump.readSync()) {
      pump.writeSync(data); //turn pump on or off
    }
  });
});

process.on('SIGINT', () => {
  //on ctrl+c
  pump.writeSync(0); // Turn pump off
  pump.unexport(); // Unexport pump GPIO to free resources
  process.exit(); //exit completely
});
