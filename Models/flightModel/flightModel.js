"use strict";

function flightModel(destination1, destination2, pilot, plane){	
	if (destination1 == "" || destination2 == 0 || pilot == null || plane == null) {
		throw "Неверно введены данныe рейса.";
	}

	this.destination1 = destination1;
	this.destination2 = destination2;
	this.pilot = pilot;
	this.plane = plane;

	this.getPilotFullName = function(){
		return pilot.getFullName();
	}

	this.getPlaneName = function(){
		return plane.getName();
	}

	this.getDestination1 = function(){
		return destination1;
	}

	this.getDestination2= function(){
		return destination2;
	}
};
