var sleep = require('sleep');
var i2c_bus = require('i2c-bus');
var i2c = i2c_bus.openSync(1);

BUS_WAIT = 100000; // Microseconds buffer between each ADC call

ADC_I2C_ADDR = 0x48;
ADC_REG_CONV = 0x00;
ADC_REG_CONF = 0x01;

ADC_PGA_6144 = 0x0000;
ADC_PGA_4096 = 0x0200;
ADC_PGA_2048 = 0x0400;
ADC_PGA_1024 = 0x0600;
ADC_PGA_0512 = 0x0800;
ADC_PGA_0256 = 0x0A00;

ADC_SPS_008 = 0x0000;
ADC_SPS_016 = 0x0020;
ADC_SPS_032 = 0x0040;
ADC_SPS_064 = 0x0060;
ADC_SPS_128 = 0x0080;
ADC_SPS_250 = 0x00A0;
ADC_SPS_475 = 0x00C0;
ADC_SPS_860 = 0x00E0;

ADC_PORT_0 = 0x4000;
ADC_PORT_1 = 0x5000;
ADC_PORT_2 = 0x6000;
ADC_PORT_3 = 0x7000;


setPGA (ADC_PGA_2048);
setSPS (ADC_SPS_250);
setPort(ADC_PORT_0);

var cfg = config();
console.log("config: 0x" + cfg.toString(16).toUpperCase() + "   0b" + cfg.toString(2).toUpperCase());

// Read values forever...
var sensorRead = value();
while (true) {
	console.log ("Sensor Value: " + sensorRead);
	sensorRead = value();
}
	



function config() {
	var cfg = i2c.readWordSync(ADC_I2C_ADDR, ADC_REG_CONF);
	sleep.usleep(BUS_WAIT);
	return invertBytes(cfg);
}

function setConfig(config) {
	config = config & 0x7FFF; // Prevents from setting bit 15 ON by mistake and trigger a read when not needed
	i2c.writeWordSync(ADC_I2C_ADDR, ADC_REG_CONF, invertBytes(config));
	sleep.usleep(BUS_WAIT);
}

function setPGA (myPGA) {
	var cfg = config();
	cfg = (cfg - (cfg & 0x0E00)) | myPGA;
	setConfig(cfg);
}

function setSPS (mySPS) {
	var cfg = config();
	cfg = (cfg - (cfg & 0x00E0)) | mySPS;
	setConfig(cfg);
}

function setPort (myPort) {
	var cfg = config();
	cfg = (cfg - (cfg & 0x7000)) | myPort;
	setConfig(cfg);
}

function value() {
	var cfg = config();
	cfg = cfg | 0x8000;
	i2c.writeWordSync(ADC_I2C_ADDR, ADC_REG_CONF, invertBytes(cfg));
	sleep.usleep(BUS_WAIT);
	var val = i2c.readWordSync(ADC_I2C_ADDR, ADC_REG_CONV);
	sleep.usleep(BUS_WAIT);
	return invertBytes(val);
	// return val;
}

function invertBytes(myWord) {
	return (myWord >> 8) | ((myWord & 0x00FF) << 8);
}

