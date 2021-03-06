"use strict";

function flightProvider(){


	var db = new dataBase();

	this.indexValidator = function(index){
		if((index >= db.flightList.length || index < 0) || !isFinite(index) || index ===""){
			return false;
		}
		return true;
	}

	this.getByIndex = function(index){
		if(!this.indexValidator(index)){
			throw("Неверное значение индекса!");
		}

		return db.flightList[index];
	}

	this.getAll = function(){
		return db.flightList;
	}

	this.getAllJSON = function(){
		var returnValue = [];
		db.flightList.forEach(function callback(currentValue, index, array){
			returnValue.push({"destination1": currentValue.getDestination1(), "destination2":currentValue.getDestination2(),"pilot": currentValue.getPilotFullName(), "plane": currentValue.getPlaneName()});
		}) ;
		return returnValue;
	}

	this.push = function(flight){
		if(!(flight instanceof flightModel)){
			throw("Неверный тип объекта!")
		}
		db.flightList.push(flight);
	}

	this.replace = function(flight, index){
		if(!(flight instanceof flightModel)){
			throw("Неверный тип объекта!")
		}
		db.flightList[index] = flight;
	}
	this.remove =  function(indexToDelete){
		db.flightList.splice(indexToDelete, 1);
	}
}