const Gpio = require('onoff').Gpio;
const HuSensor = new Gpio(10, 'in'); //use GPIO pin 10 as output

HuSensor.watch((err, value) => {
  //Watch for humidity sensor sending value to GPIO, specify callback function
  if (err) {
    console.log(err);
    return;
  }
  console.log(value, Date.now); // send the value and the date to user_product collection
});

function stopReadingHuSensor() {
  HuSensor.unexport();
}
