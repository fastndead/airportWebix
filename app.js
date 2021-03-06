"use strict";

window.onload = function(){
	Run = new Run();

}

function Run(){

	this.view	= new view();
	this.pilotProvider 	= new pilotProvider(); 
	this.planeProvider 	= new planeProvider();
	this.flightProvider = new flightProvider();

	

	this.addPilot = function(firstName, secondName){
		try{
			var inputPilot = new pilotModel(firstName, secondName);
		}
		catch(e){
			webix.message({ type:"error", text:e });
			return;
		}
		try{
			Run.pilotProvider.push(inputPilot);
		}
		catch(e){
			webix.message({ type:"error", text:e });
		}
	}

	this.addPlane = function(planeName){
		try{
			var inputPlane = new planeModel(planeName);	
		}
		catch(e){
			webix.message({ type:"error", text:e });
			return;
		}
		Run.planeProvider.push(inputPlane);
	}

	this.addFlight = function(destination1, destination2, pilot, plane){
		try{
			var newFlight = new flightModel(destination1,destination2, pilot, plane);
		}
		catch(e){
			webix.message({ type:"error", text:e });
			return;
		}
		Run.flightProvider.push(newFlight);
	}

	this.removeFlight = function(indexToDelete){
		if(!Run.flightProvider.indexValidator(indexToDelete)){
			webix.message({ type:"error", text:"Неправильно введены данные, попробуйте ещё.\n" });
			return;
		}
		
		try{
			Run.flightProvider.remove(indexToDelete);
		}
		catch(e){
			webix.message({ type:"error", text:"Неправильно введены данные, попробуйте ещё.\n" + e});
		}
	}
	this.editPilot = function(newFirstName, newLastName, indexToEdit){
			try{
				Run.pilotProvider.replace(new pilotModel(newFirstName, newLastName), indexToEdit);
			}
			catch(e){
				var message = "Были введены неверные значения.\n " + e
				webix.message({ type:"error", text:message });
				return;
			}
		}

	this.removePlane = function(indexToDelete){
		if(!Run.planeProvider.indexValidator(indexToDelete)){
			webix.message({ type:"error", text:"Неправильно введены данные, попробуйте ещё.\n" });
			return;
		}

		try{
			Run.planeProvider.remove(indexToDelete);
		}
		catch(e){
			webix.message({ type:"error", text:"Неправильно введены данные, попробуйте ещё.\n" + e});
		}
	}

	this.removePilot = function(indexToDelete){
		if(!Run.pilotProvider.indexValidator(indexToDelete)){
			webix.message({ type:"error", text:"Неправильно введены данные, попробуйте ещё.\n" });
			return;
		}
		Run.pilotProvider.remove(indexToDelete );
	}

	this.editPlane = function(planeName, indexToEdit){
		try{
				Run.planeProvider.replace(new planeModel(planeName), indexToEdit);
			}
			catch(e){
				var message = "Были введены неверные значения.\n " + e
				webix.message({ type:"error", text:message });
				return;
			}
	} 
	
	this.editFlights = function(destination1, destination2, pilot, plane, indexToEdit){
		
		
		Run.flightProvider.replace(new flightModel(destination1, destination2,
		 	pilot, plane), indexToEdit);	
	}
}