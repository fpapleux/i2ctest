// Implements I2C communications to an ADS1115 ADC

var i2c = require ('i2c');
var sleep = require('sleep');

I2C_PATH = '/dev/i2c-1';
ADC_ADDR = 0x48;

PTR_CONVERSION_REG = 0x00;
PTR_CONFIG_REG = 0x01;
PTR_LO_REG = 0x02;
PTR_HI_REG = 0x03;

CONFIG_HI = 0x44; // 0b01000100;
CONFIG_LO = 0xA3; // 0b10000011;

CONFIG_HI_READ = 0x80;
CONFIG_HI_A0 = 0x40;
CONFIG_HI_A1 = 0x50;
CONFIG_HI_A2 = 0x60;
CONFIG_HI_A3 = 0x70;

// var adc = new i2c(ADC_ADDR, I2C_PATH);
var adc = new i2c(0x48);

// Sending standard configuration
adc.writeByte(PTR_CONFIG_REG, function(err){});
adc.write([CONFIG_HI, CONFIG_LO], function(err){});

// Read configuration back
readConfig(adc);
readValue(adc, 0);
sleep.sleep(1);
readValue(adc, 1);
sleep.sleep(1);
readValue(adc, 2);
sleep.sleep(1);
readValue(adc, 3);
sleep.sleep(1);

function readConfig(adc) {
	adc.writeByte(PTR_CONFIG_REG, function(err){});
	adc.read(2, function(err, res) {
		if (! err) {
			// console.log(res);
			config = (0 | res[0]) << 8;
			config = config | res[1];

			str = config.toString(16);
			console.log ("Config Alpha: 0x"+str.toUpperCase());
			return config;
		}
	});
}

function readValue(adc, channel) {
	if ((channel < 0) || (channel >3)) {
		throw err;
	}	
	config_hi = CONFIG_HI | CONFIG_HI_READ;
	switch (channel) {
		case 0: config_hi = config_hi | CONFIG_HI_A0;
		case 1: config_hi = config_hi | CONFIG_HI_A1;
		case 2: config_hi = config_hi | CONFIG_HI_A2;
		case 3: config_hi = config_hi | CONFIG_HI_A3;		
	}
	// Tell config register to read value into conversion register
	adc.writeByte(PTR_CONFIG_REG, function(err){});
	adc.write([config_hi, CONFIG_LO], function(err){});
	
	//  Read the conversion register
	sleep.sleep(1);
	adc.writeByte(PTR_CONVERSION_REG, function(err){});
	adc.read(2, function(err, res) {
		if (! err) {
			result = (0 | res[0]) << 8;
			result = (result | res[1]);
			console.log ("value: " + result);
		}
	});
}




