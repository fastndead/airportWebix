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
			alert(e);
			return;
		}
		try{
			Run.pilotProvider.push(inputPilot);
		}
		catch(e){
			alert(e);
		}
	}

	this.addPlane = function(){
		try{
			var inputPlane = new planeModel(document.getElementById("planeName").value);	
		}
		catch(e){
			alert(e);
			return;
		}
		Run.planeProvider.push(inputPlane);
		Run.view.refreshPlaneTable(Run.planeProvider.getAll());
		Run.view.refreshPlaneSelect(Run.planeProvider.getAll());
		Run.popup.popupStopAllExceptPlaneInfo();
	}

	this.addFlight = function(){
		var planeSelect = document.getElementById("planeSelect");
		var pilotSelect = document.getElementById("pilotSelect");
		var pilot = Run.pilotProvider.getByIndex(pilotSelect.selectedIndex);
		var plane = Run.planeProvider.getByIndex(planeSelect.selectedIndex);
		try{
			var newFlight = new flightModel(document.getElementById("destination1").value, document.getElementById("destination2").value, 
				pilot, plane);
		}
		catch(e){
			alert(e);
			return;
		}
		Run.flightProvider.push(newFlight);
		Run.view.refreshFlightTable(Run.flightProvider.getAll());
		Run.view.clearFlightTxtFields();
		Run.popup.popupStop();
	}

	this.removeFlight = function(){
		var indexToDelete = document.getElementById("DeleteFlightField").value - 1;
		if(!Run.flightProvider.indexValidator(indexToDelete)){
			alert("Неправильно введены данные, попробуйте ещё.\n" );
			return;
		}
		Run.flightProvider.remove(indexToDelete);
		Run.view.refreshFlightTable(Run.flightProvider.getAll());
		Run.popup.popupStop();
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

	this.removePlane = function(){
		var indexToDelete = document.getElementById("DeletePlaneField").value;
		try{
			Run.planeProvider.remove(indexToDelete - 1);
		}
		catch(e){
			alert("Неправильно введены данные, попробуйте ещё.\n" + e);
		}
		Run.view.refreshPlaneTable(Run.planeProvider.getAll());
		Run.popup.popupStopAllExceptPlaneInfo();
	}

	this.removePilot = function(){

		var indexToDelete = +document.getElementById("RemovePilotsField").value;
		if(!isFinite(indexToDelete)){
			alert("Неправильно введены данные, попробуйте ещё.\n" );
			return;
		}
		Run.pilotProvider.remove(indexToDelete - 1);
		Run.view.refreshPilotTable(Run.pilotProvider.getAll());
		Run.popup.popupStopAllExceptPilotInfo();
	}

	this.EditPlane = function(){
		var indexToEdit = document.getElementById("EditPlanesField").value - 1;
		var newName;

		if(!isFinite(indexToEdit)){
			alert("Неправильно введены данные, попробуйте ещё." );
			return;
		}

		try{
			document.getElementById("EditPlanesField").value = Run.planeProvider.getByIndex(indexToEdit).getName();
		}
		catch(e){	
			alert("Неправильно введены данные, попробуйте ещё.");
			return;
		}

		function nameEdit(){
				newName = document.getElementById("EditPlanesField").value;
				try{
					 Run.planeProvider.replace(new planeModel(newName), indexToEdit);
				}
				catch(e){
					alert("Были введены неверные значения. " + e);
					return;
				}
				Run.view.refreshPlaneTable(Run.planeProvider.getAll());
				Run.popup.popupStopAllExceptPlaneInfo();			
				document.getElementById("popupTextEdit").innerHTML = "Введите номер самолёта:";
				document.getElementById("editBtnPlanes").removeEventListener("click", nameEdit);
				document.getElementById("editBtnPlanes").addEventListener("click", Run.EditPlane);
				Run.view.refreshPlaneSelect(Run.planeProvider.getAll());
			}

		document.getElementById("popupTextEdit").innerHTML = "Измените название самолёта:"
		document.getElementById("editBtnPlanes").removeEventListener("click", Run.EditPlane);
		document.getElementById("editBtnPlanes").addEventListener("click", nameEdit) 
	}
	
	this.editFlights = function(){
		function editFlight(){
			Run.flightProvider.replace(new flightModel(destination1Input.value, destination2Input.value,
			 	Run.pilotProvider.getByIndex(pilotSelect.selectedIndex), Run.planeProvider.getByIndex(planeSelect.selectedIndex)), indexToEdit);
			Run.popup.popupStop();
			Run.view.refreshFlightTable(Run.flightProvider.getAll());
			editBtn.removeEventListener("click", editFlight);
		}


		var editBtn 	= document.getElementById("editBtnFlights2");
		var planeSelect = document.getElementById("popupPlaneSelect");
		var pilotSelect = document.getElementById("popupPilotSelect");
		var destination1Input = document.getElementById("editFlightDestination1");
		var destination2Input = document.getElementById("editFlightDestination2");
		
		var indexToEdit = document.getElementById("EditFlightField").value - 1;
		if(!Run.flightProvider.indexValidator(indexToEdit)){
			alert("Неправильно введены данные, попробуйте ещё." );
			return;
		}

		Run.popup.popupBtnFlightsEdit2();
		Run.popup.popupRefreshPlaneSelect(Run.planeProvider.getAll());
		Run.popup.popupRefreshPilotSelect(Run.pilotProvider.getAll());

		destination1Input.value = Run.flightProvider.getByIndex(indexToEdit).getDestination1();
		destination2Input.value = Run.flightProvider.getByIndex(indexToEdit).getDestination2();


		editBtn.addEventListener("click", editFlight);	
	}
}