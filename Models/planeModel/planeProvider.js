"use strict";

function planeProvider(){

	var db = new dataBase();

	this.getByIndex = function(index){
		if(!isFinite(index) || index > db.planeList.length){
			throw("Неверное значение индекса!");
		}

		return db.planeList[index];
	}

	this.getAll = function(){
		return db.planeList;
	}

	this.push = function(plane){
		if(!(plane instanceof planeModel)){
			throw("Неверный тип объекта!")
		}
		db.planeList.push(plane);
	}

	this.replace = function(plane, index){
		if(!(plane instanceof planeModel)){
			throw("Неверный тип объекта!")
		}
		db.planeList[index] = plane;
	}
	this.remove =  function(indexToDelete){
		db.planeList.splice(indexToDelete, 1);
	}

		this.getAllJSON = function(){
		var temp = []
		pilotList.forEach(function callback(currentValue, index, array){
			temp.push(currentValue.getFullName());
		})
	}
}