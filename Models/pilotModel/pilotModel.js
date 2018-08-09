"use strict";

function pilotModel(firstName, lastName){
	if(firstName == "" || lastName == ""){
			throw "Неправильное имя пилота.";
		}
	this.firstName = firstName;
	this.lastName  = lastName;

	this.getFirstName = function(){
		return firstName;
	}

	this.getLastName = function(){
		return lastName;
	}

	this.getFullName = function(){
		return firstName + " " + lastName;
	}

	this.getAllJSON = function(){
		var temp = []
		pilotList.forEach(function callback(currentValue, index, array){
			temp.push(currentValue.getFullName());
		})
	}
};

