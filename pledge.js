/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise () {
	this.state = 'pending';
}

function Deferral () {
	this.$promise = new $Promise;

}

function defer (){
	return new Deferral;
}

Deferral.prototype.resolve = function(data) {
	if (this.$promise.state === 'pending') {
	this.$promise.state = 'resolved';
	this.$promise.value = data;
	}
}

Deferral.prototype.reject = function(data) {
	if (this.$promise.state !== 'rejected' && this.$promise.state !== 'resolved') {
	this.$promise.state = 'rejected';
	this.$promise.value = data;
	}
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

