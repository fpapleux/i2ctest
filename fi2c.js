// Implements I2C communications to an ADS1115 ADC

var i2c = require ('i2c');

I2C_PATH = '/dev/i2c-1';
ADC_ADDR = 0x48;

PTR_CONVERSION_REG = 0x00;
PTR_CONFIG_REG = 0x01;
PTR_LO_REG = 0x02;
PTR_HI_REG = 0x03;

CONFIG_HI = 0x45; // 0b01000101;
CONFIG_LO = 0xA3; // 0b10000011;

CONFIG_HI_READ = 0x80;
CONFIG_HI_A0 = 0x40;
CONFIG_HI_A1 = 0x41;
CONFIG_HI_A2 = 0x42;
CONFIG_HI_A3 = 0x43;

// var adc = new i2c(ADC_ADDR, I2C_PATH);
var adc = new i2c(0x48);

// Sending standard configuration
adc.writeByte(PTR_CONFIG_REG, function(err){});
adc.write([CONFIG_HI, CONFIG_LO], function(err){});

// Read configuration back
adc.writeByte(PTR_CONFIG_REG, function(err){});
adc.read(2, function(err, res) {
	if (! err) {
		// console.log(res);
		config = (0 | res[0]) << 8;
		config = config | res[1];

		str = config.toString(16);
		console.log ("0x"+str);
		str = config.toString(2);
		console.log("0b"+str);
	}
});

// Read the conversion register
readConversionRegister();

// Tell ADC to read value on pin A0
adc.writeByte(PTR_CONFIG_REG, function(err){});
adc.write([CONFIG_HI | CONFIG_HI_READ | CONFIG_HI_A0, CONFIG_LO], function(err){});

while (true) {
	adc.writeByte(PTR_CONVERSION_REG, function(err){});
	adc.read(2, function(err, res) {
		if (! err) {
			result = (0 | res[0]) << 8;
			result = (result | res[1]);
			console.log ("value: " + result);
		}
	});
}



function readConversionRegister() {
	adc.writeByte(PTR_CONVERSION_REG, function(err){});
	adc.read(2, function(err, res) {
		if (! err) {
			result = (0 | res[0]) << 8;
			result = (result | res[1]);
			console.log ("value: " + result);
		}
	});
}




