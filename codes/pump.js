const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const pump = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
const pumpStartInterval = setInterval(() => {
  if (pump.readSync() === 0) {
    //check the pin state, if the state is 0 (or off)
    pump.writeSync(1); // Turn Pump on
  } else {
    pump.writeSync(0); // Turn Pump off
  }
}, 60 * 60 * 24 * 1000); // here we will pass the time which chose by the user in user_product sittings schema

const stopPump = () => {
  clearInterval(pumpStartInterval); // Stop pump intervals
  pump.writeSync(0); // Turn Pump off
  pump.unexport();
};
