"use strict";

function planeModel(name){

	if(name.trim() == ""){
		throw "Неверно введено название самолёта."
	}
	this.name = name;

	this.getName = function(){return name;}

};



