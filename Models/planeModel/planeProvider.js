"use strict";

function planeProvider(){

	var db = new dataBase();

	this.indexValidator = function(index){
		if((index > db.planeList.length || index < 0) || !isFinite(index) || index === ""){
			return false;
		}
		return true;
	}

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
		db.planeList.forEach(function callback(currentValue, index, array){
			temp.push({"name": currentValue.getName()});
		});
		return temp;
	}

	this.getAllString = function(){
		var temp = []
		db.planeList.forEach(function callback(currentValue, index, array){
			temp.push(currentValue.getName());
		});
		return temp;
	}
}