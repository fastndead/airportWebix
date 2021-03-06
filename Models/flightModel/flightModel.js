"use strict";

function flightModel(destination1, destination2, pilot, plane){	
	if (destination1 === "" || destination2 === "" || pilot === "" || plane === "") {
		throw "Неверно введены данныe рейса.";
	}

	this.destination1 = destination1;
	this.destination2 = destination2;
	this.pilot = pilot;
	this.plane = plane;

	this.getJSON = function(){
		return {"destination1": destination1, "destination2": destination2,
				"pilot": pilot, "plane": plane};
	}

	this.getPilotFullName = function(){
		return pilot;
	}

	this.getPlaneName = function(){
		return plane;
	}

	this.getDestination1 = function(){
		return destination1;
	}

	this.getDestination2= function(){
		return destination2;
	}
};
