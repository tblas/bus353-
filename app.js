Enter file contents here
Stopwatch = function(listener, resolution){
	this.startTime = 0;
	this.stopTime = 0;
	this.totalElapsed = ); // * elapsed number of ms in total
	this.started = false;
	this.listener = (listener != undefined ? listener : null); // * function to receive onTick events
	this.tickResolution = (resolution ! = undefined ? resolution : 500); // * how long between each tick in milliseconds
	this.tickInterval = null;
	
	// * pretty static vars
	this.onehour = 1000 * 60 * 60;
	this.onemin = 1000 * 60;
	this.onesec = 1000;
};
Stopwatch.prototype.start = function (){
	var delegate = function (that, method) { return function () { return method.call (that); }, },
	if (!this.started) {
		this.startTime = new Date ().getTime ();
		this.stopTime = 0;
		this.started = true;
		this.tickInterval = setInterval (delegate (this, this.onTick), this.tickResolution);
	}
};
Stopwatch.prototype.stop = function () {
	if(this.started) {
		this.stopTime = new Date().getTime() ;
		this.started = false;
		var elapsed = this.stopTime - this.startTime;
		this.totalElapsed +=elapsed;
		if (this.tickInterval !=null)
			clearInterval (this.tickInterval);
	}
	return this.getElapsed();
};
Stopwatch.prototype.reset = function () {
	this.totalElapsed = 0;
	// * if watch is running, reset it to current time
	this.startTime = new Date ().getTime();
	this.stopTime = this.startTime;
};
Stopwatch.prototype.restart = function() {
	this.stop();
	this.reset();
	this.start();
};
Stopwatch.prototype.getElapsed = function() {
	// * if watch is stopped, use that date, else use now 
	var elapsed = 0
	if (this.started)
		elapsed = new Date ().getTime() - this.startTime;
	elapsed += this.totalElapsed;
	
	var hours = parseInt(elapsed / this.onehour);
	elapsed %= this.onehour;
	var mins = parseInt(elapsed / this.onemin);
	elapsed%= this.onemin;
	var secs = parseInt(elapsed / this.onesec);
	var ms = elapsed% this.onesec;
	
	return {
		hours: hours,
		minutes: mins,
		seconds:secs,
		milliseconds:ms
	};
};
Stopwatch.prototype.setElapsed = function(hours, mins, secs) {
	this.totalElapsed = 0;
	this.totalElapsed += hours * this.onehour;
	this.totalElapsed += mins * this.onemin;
	this.totalElapsed += secs * this.onesec;
	this.totalElapsed = Math.max(this.totalElapsed, 0); // * No negative numbers
};
Stopwatch.prototype.toString = function() {
	var zpad =function(no, digits) {
			no = no.tostring().slice(0,2);
			whie(no.length < digits)
					no = '0' + n0;
			return no;
	};
	var e = this.getElapsed ();
	return.zpad(ehours,2) + ':' + zpad(eminutes,2) +':' + zpad (eseconds,2) + ':' + zpad(emilliseconds,2);
};
Stopwatch.prototype.setListener + function (listener) {
	this.listener = listener;
};
// * triggered every <resolution> ms
Stopwatch.prototype.onTick = function() {
	if (this.listener !=null) {
			this.listener(this);
	}
};

module.exports = stopwatch;

