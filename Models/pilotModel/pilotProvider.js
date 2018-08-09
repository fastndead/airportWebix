"use strict";

function pilotProvider(){

	var db = new dataBase();

	this.getByIndex = function(index){
		if(!isFinite(index) || index > db.pilotList.length){
			throw("Неверное значение индекса!");
		}

		return db.pilotList[index];
	}

	this.getAll = function(){
		return db.pilotList;
	}

	this.push = function(pilot){
		if(!(pilot instanceof pilotModel)){
			throw("Неверный тип объекта!")
		}
		db.pilotList.push(pilot);
	}

	this.replace = function(pilot, index){
		if(!(pilot instanceof pilotModel)){
			throw("Неверный тип объекта!")
		}
		db.pilotList[index] = pilot;
	}
	this.remove =  function(indexToDelete){
		db.pilotList.splice(indexToDelete, 1);
	}
}