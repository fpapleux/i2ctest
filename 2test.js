var i2c = require('i2c-bus');
var bus = i2c.openSync(1);


// Check out peripherals
var devices = bus.peripheralSync(i2c, 0x48);
console.log ("devices " + devices);


ADC_ADDR = 0x48;

ADC_CNV_ADDR = 0x00;
ADC_CFG_ADDR = 0x01;

ADC_DEF_CONFHI = 0x44; // b01000100
ADC_DEF_CONFLO = 0xA3; // b10000011

ADC_ACT_READ = 0x80;
ADC_ACT_A0 = 0x40;



// Tell ADC we are going to write to config register
// bus.writeByteSync(ADC_ADDR, 0x00
