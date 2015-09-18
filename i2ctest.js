// Implements I2C communications to an ADS1115 ADC


//I2C_PATH = '/dev/i2c-1';
//ADC_ADDR = 0x48;
//var i2c = require ('i2c');
//var myadc = new i2c(ADC_ADDR, I2C_PATH);






var ads1x15 = require('node-ads1x15');
var adc = new ads1x15(1);

var channel = 0;
var sps = '250'; // Samples per Second
var pga = '4096'; // progGainAmp -- need to go learn more about it..

var reading = 0;

while (true) {
	adc.readADCSingleEnded (0, pga, sps, function(err, data) {
		if (err) { 
			console.log ("Error reading from ADC channel 0");
			process.exit(1);
		}
		reading = data;
	});
	console.log("channel 0 value: " + reading);

}
