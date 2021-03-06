"use strict";

function pilotProvider(){

	var db = new dataBase();

	this.indexValidator = function(index){
		if((index > db.pilotList.length || index < 0) || !isFinite(index) || index === ""){
			return false;
		}
		return true;
	}

	this.getByIndex = function(index){
		if(!isFinite(index) || index > db.pilotList.length){
			throw("Неверное значение индекса!");
		}

		return db.pilotList[index];
	}

	this.getAll = function(){
		return db.pilotList;
	}

	this.getAllJSON = function(){
		var returnValue = []
		db.pilotList.forEach(function callback(currentValue, index, array){
			returnValue.push({"firstName": currentValue.getFirstName(), "lastName": currentValue.getLastName()});
		})
		return returnValue;
	}

	this.getAllString = function(){
		var returnValue = []
		db.pilotList.forEach(function callback(currentValue, index, array){
			returnValue.push(currentValue.getFullName());
		})
		return returnValue;
	}

	this.push = function(pilot){
		if(!(pilot instanceof pilotModel)){
			throw("Неверный тип объекта!")
		}
		db.pilotList.push(pilot);
	}

	this.replace = function(pilot, index){
		if(!(pilot instanceof pilotModel)){
			throw("Неверный тип объекта!");
		}
		else if(index > db.pilotList.length)
		{
			throw("Выход за границы массива!");
		}
		db.pilotList[index] = pilot;
	}
	this.remove =  function(indexToDelete){
		db.pilotList.splice(indexToDelete, 1);
	}
}