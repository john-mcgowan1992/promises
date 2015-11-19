/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise () {
	this.state = 'pending';
	this.handlerGroups = [];
}


function Deferral () {
	this.$promise = new $Promise();

}

function defer (){
	return new Deferral();
}

Deferral.prototype.resolve = function(data) {
	if (this.$promise.state === 'pending') {
		this.$promise.state = 'resolved';
		this.$promise.value = data;
		var handlerIndex = this.$promise.handlerGroups.length-1;
		var self = this.$promise
		if ( handlerIndex >=0){
  			this.$promise.handlerGroups.forEach(function(item){
  				self.callHandlers(item.successCb);
  			})
		}
	}
}

Deferral.prototype.reject = function(data) {
	if (this.$promise.state !== 'rejected' && this.$promise.state !== 'resolved') {
		this.$promise.state = 'rejected';
		this.$promise.value = data;
		var handlerIndex = this.$promise.handlerGroups.length-1;
		var self = this.$promise
		if ( handlerIndex >=0){
  			this.$promise.handlerGroups.forEach(function(item){
  				self.callHandlers(null, item.errorCb);
  			})
		}
	}
}


$Promise.prototype.then = function(success, err) {
   var handlerObj = {};
   handlerObj['successCb'] = typeof success === 'function' ? success : false;
   handlerObj['errorCb'] = typeof err === 'function' ? err : false;
   this.handlerGroups.push(handlerObj)
   this.callHandlers(success, err)
}


$Promise.prototype.callHandlers = function(success, err) {
 	if (this.state === "resolved"){
 		success(this.value);
 		this.handlerGroups = this.handlerGroups.slice(1);

 	} else if (this.state === 'rejected' && typeof err === 'function') {
 		err(this.value);
 		this.handlerGroups = this.handlerGroups.slice(1);

 	}

}

$Promise.prototype.catch = function(func){
	this.then(null, func);
}




/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/

