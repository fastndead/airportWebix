"use strict";

function flightProvider(){


	var db = new dataBase();

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
		return db.flightList;
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

	this.indexValidator = function(index){
		if(!isFinite(index) || index < 0 || index > db.flightList.length - 1){
			return false;
		}
		return true;
	}
}