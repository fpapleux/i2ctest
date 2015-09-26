var i2c = require('i2c');
var w1 = new i2c(0x48, { device: '/dev/i2c-1' });
// var w2 = new i2c(0x40, { device: '/dev/i2c-1' });

w1.scan (function(err, data) {
	console.log('wire1 scan results');
	console.log(data);
});
/*
w2.scan (function(err, data) {
	console.log('wire2 scan results');
	console.log(data);
});
*/
w1.on ('data', function(data) {
	console.log('data on wire 1');
	console.log(data);
});
/*
w2.on ('data', function(data) {
	console.log('data on wire 2');
	console.log(data);
});
*/


