function view(){


	var tempIndex;

	 webix.ui({//форма добавления рейса
            view:"window",
            id:"addFlightWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Введите данные о рейсе:",
            body: {
				view:"form",
				borderless:true,
				elements: [
					{ view:"text", label:'Город отправления', id:"destination1"},
					{ view:"text", label:'Город прибытия', id:"destination2"},
					{ view:"richselect",id : "pilotSelect", label:"Пилот"},
					{ view:"richselect",id:"planeSelect", label:"Самолёт"},
					{cols:[
						{ view:"button", id:"flightAddBtn", value: "Добавить", click:"Run.view.addFlight"},
						{view: "button", id:"flightEditBtn", value: "Изменить", click:"Run.view.EditFlight", hidden:true},
						{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addFlightWin").hide();
								$$("destination1").setValue("");
								$$("destination2").setValue("");
								$$("pilotSelect").setValue("");
								$$("planeSelect").setValue("");

							}
						},
					]}
					
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма добавления пилота
            view:"window",
            id:"addPilotWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Введите данные пилота:",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Имя', id:"firstName"},
						{view:"text", label:'Фамилия', id:"lastName"},
						{view:"button", click:"Run.view.addPilot", value:"Добавить", fillspace: 1}
						]
				},
				{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addPilotWin").hide();
							}
						},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма справочника пилотов
            view:"window",
            id:"pilotsInfoWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Пилоты",
            body:{
				view:"form",
				borderless:true,
				elements: [
					{cols:[
						{view:"button", value:"Добавить",click:function(){
							Run.view.showWindows("addPilotWin");
						}, fillspace: 1},
						{view:"button", value:"Изменить",click:function(){
							Run.view.showWindows("editPilotWin");
							$$("lastNameEdit").hide();
						}, fillspace: 1},
						{view:"button", value:"Удалить",click:function(){
							Run.view.showWindows("removePilotWin")
						},  fillspace: 1}
					]},
					{view:"datatable",
					id: "pilotsGrid",
					columns:[
						{id: "index", header: "№", fillspace: 1},
						{id: "firstName", header:"Имя", fillspace: 2, height: 30},
						{id: "lastName", header:"Фамилия", fillspace: 2, height: 30}
					],
					scheme:{
			    		$init:function(obj){ obj.index = this.count(); }
					},
					height: 300
					},
					{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("pilotsInfoWin").hide();
							}
						},
					],
					elementsConfig:{
						labelPosition:"top",
					}
				}
        });


	webix.ui({//форма изменения пилота
		view: "window",
		id: "editPilotWin",
		width: 300,
		position: "center",
		modal: true,
		head:"Редактирование",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер пилота:", id:"firstNameEdit"},
				{view:"text", label:"Введите номер пилота:", id:"lastNameEdit"},
				{cols:[
					{view:"button", id : "editBtn", label:"Изменить", click:"Run.view.editPilot"},
					{view:"button", value:"Закрыть", click:function(){
									$$("editPilotWin").hide();
									$$("firstNameEdit").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});

	webix.ui({//форма удаления пилота
		view: "window",
		id: "removePilotWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Удаление",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер пилота:", id:"removePilotIndex"},
				{cols:[
					{view:"button", id : "removePilotBtn", label:"удалить", click:"Run.view.removePilot"},
					{view:"button", value:"Закрыть", click:function(){
									$$("deletePilotWin").hide();
									$$("removePilotIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});

	webix.ui({//форма справочника самолётов
            view:"window",
            id:"planesInfoWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Самолёты",
            body:{
				view:"form",
				borderless:true,
				elements: [
					{cols:[
						{view:"button", value:"Добавить", fillspace: 1, click:function(){Run.view.showWindows("addPlaneWin");}},
						{view:"button", value:"Изменить", fillspace: 1, click:function(){Run.view.showWindows("editPlaneWin");}},
						{view:"button", value:"Удалить",  fillspace: 1,  click:function(){Run.view.showWindows("removePlaneWin");}},
					]},
					{view:"datatable",
					id: "planesGrid",
					columns:[
						{id: "index", header: "№", fillspace: 1},
						{id: "name", header:"Имя", fillspace: 2}
					],
					scheme:{
			    		$init:function(obj){ obj.index = this.count(); }
					},
					height: 300
					},
					{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("planesInfoWin").hide();
							}
						}
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма добавления пилота
            view:"window",
            id:"addPlaneWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Введите данные самолёта:",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Название', id:"planeNameAdd"},
						{view:"button", click:"Run.view.addPlane", value:"Добавить", fillspace: 1}
						]
				},
				{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addPlaneWin").hide();
							}
						},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

    webix.ui({//форма изменения самолёта
            view:"window",
            id:"editPlaneWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Редактирование",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Введите номер самолёта', id:"planeIndexToEdit"},
						{view:"text", label:'Измените название', id:"planeName", hidden: true},
						{cols:[
						{view:"button", click:"Run.view.editPlane", value:"Изменить", fillspace: 1},
						{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
										$$("editPlaneWin").hide();
										$$("planeName").setValue("");
										$$("planeName").hide();
										$$("planeIndexToEdit").show();
									}
								},]}
						]
				},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });


    webix.ui({//форма удаления самолёта
		view: "window",
		id: "removePlaneWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Удаление",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер самолёта:", id:"removePlaneIndex"},
				{cols:[
					{view:"button", id : "removePlaneBtn", label:"Удалить", click:"Run.view.removePlane"},
					{view:"button", value:"Закрыть", click:function(){
									$$("deletePilotWin").hide();
									$$("removePilotIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});	
	webix.ui({//форма удаления рейса
		view: "window",
		id: "removeFlightWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Удаление",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер рейса:", id:"removeFlightIndex"},
				{cols:[
					{view:"button", id : "removeFlightBtn", label:"Удалить", click:"Run.view.removeFlight"},
					{view:"button", value:"Закрыть", click:function(){
									$$("removeFlightWin").hide();
									$$("removeFlightIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});

	webix.ui({//форма редактирования рейса 
		view: "window",
		id: "editFlightWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Редактирование",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер рейса:", id:"editFlightIndex"},
				{cols:[
					{view:"button", id : "removeFlightBtn", label:"изменить", click:"Run.view.editFlight"},
					{view:"button", value:"Закрыть", click:function(){
									$$("editFlightWin").hide();
									$$("editFlightIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});


	this.editFlight = function(){
		tempIndex = $$("editFlightIndex").getValue()-1;
		if(!Run.flightProvider.indexValidator(tempIndex)){
			webix.message({ type:"error", text:"Неправильно введены данные, попробуйте ещё.\n" });
			$$("editFlightWin").hide();
			$$("editFlightIndex").setValue("");
			return;
		}
		Run.view.showWindows("addFlightWin");
		$$("destination1").setValue(Run.flightProvider.getByIndex(tempIndex).getDestination1());
		$$("destination2").setValue(Run.flightProvider.getByIndex(tempIndex).getDestination2());
		Run.view.refreshSelects();
		$$("flightAddBtn").hide();
		$$("flightEditBtn").show();
	}

	this.EditFlight = function(){
			Run.editFlights($$("destination1").getValue(),$$("destination2").getValue(),
			$$("pilotSelect").getValue(),$$("planeSelect").getValue(), tempIndex);
			Run.view.refreshFlightTable();
			$$("addFlightWin").hide();
			$$("destination1").setValue("");
			$$("destination2").setValue("");
			$$("pilotSelect").setValue("");
			$$("planeSelect").setValue("");
			$$("editFlightWin").hide();
			$$("editFlightIndex").setValue("");
		}


	this.getAllFlights = function(){
		return Run.flightProvider.getAllJSON();
	}

	this.getAllPilots = function(){
		return Run.pilotProvider.getAllJSON();
	}

	this.getAllPlanes = function(){
		return Run.planeProvider.getAllJSON();
	}

	this.showWindows= function(targetWindow){
		$$(targetWindow).show();
	}

	this.addPilot = function(){
		Run.addPilot($$('firstName').getValue(), $$('lastName').getValue());
		$$('firstName').setValue('');
		$$('lastName').setValue('');
		$$("addPilotWin").hide();
		Run.view.refreshPilotsTable();
	}

	this.addFlight = function(){
		Run.addFlight($$("destination1").getValue(),$$("destination2").getValue(),
			$$("pilotSelect").getValue(),$$("planeSelect").getValue());
		Run.view.refreshFlightTable();
		$$("addFlightWin").hide();
		$$("destination1").setValue("");
		$$("destination2").setValue("");
		$$("pilotSelect").setValue("");
		$$("planeSelect").setValue("");
	}

	this.editPilot = function(){
		if(!$$("lastNameEdit").isVisible()){
			tempIndex = $$("firstNameEdit").getValue();
			if(!Run.pilotProvider.indexValidator(tempIndex)){
				var message = "Неправильный номер пилота!"
				webix.message({ type:"error", text:message });
				return;
			}
			$$("lastNameEdit").show();
			$$("lastNameEdit").setValue(Run.planeProvider.getByIndex(tempIndex-1));
			$$("lastNameEdit").setValue(Run.pilotProvider.getByIndex(tempIndex-1).getLastName());
			$$("firstNameEdit").setValue(Run.pilotProvider.getByIndex(tempIndex-1).getFirstName());
			return;
		}	
		Run.editPilot($$("firstNameEdit").getValue(), $$("lastNameEdit").getValue(), tempIndex -1);
		$$("editPilotWin").hide();
		$$("firstNameEdit").setValue("");
		$$("lastNameEdit").hide();
		Run.view.refreshPilotsTable();
	}

	this.addPlane = function(){
		Run.addPlane($$("planeNameAdd").getValue());
		$$("addPlaneWin").hide();
		$$("planeNameAdd").setValue("");
		Run.view.refreshPlanesTable();
	}

	this.editPlane = function(){
		if(!$$("planeName").isVisible()){
			tempIndex = $$("planeIndexToEdit").getValue();
			if(!Run.planeProvider.indexValidator(tempIndex)){
				var message = "Неправильный номер самолёта!"
				webix.message({ type:"error", text:message });
				return;
			}
			$$("planeName").show();
			$$("planeName").setValue(Run.planeProvider.getByIndex(tempIndex-1).getName());
			$$("planeIndexToEdit").setValue("");
			$$("planeIndexToEdit").hide();
			return;
		}
		Run.editPlane($$("planeName").getValue(), tempIndex-1);
		$$("planeName").setValue("");
		$$("planeName").hide();
		$$("planeIndexToEdit").show();
		$$("editPlaneWin").hide();
		Run.view.refreshPlanesTable();
	}

	this.removePilot = function(){
		Run.removePilot($$("removePilotIndex").getValue()-1);
		Run.view.refreshPilotsTable();
		$$("removePilotWin").hide();
		$$("removePilotIndex").setValue("");
	}

	this.removeFlight = function(){
		Run.removeFlight($$("removeFlightIndex").getValue()-1);
		Run.view.refreshFlightTable();
		$$("removeFlightWin").hide();
		$$("removeFlightIndex").setValue("");
	}

	this.removePlane = function(){
		Run.removePlane($$("removePlaneIndex").getValue()-1);
		Run.view.refreshPlanesTable();
		$$("removePlaneWin").hide();
		$$("removePlaneIndex").setValue("");
	}

	this.refreshPilotsTable = function(){
		$$('pilotsGrid').clearAll();
		$$('pilotsGrid').parse(Run.view.getAllPilots());
	}

	this.refreshFlightTable = function(){
		$$('grid').clearAll();
		$$('grid').parse(Run.view.getAllFlights());
	}

	this.refreshPlanesTable = function(){
		$$('planesGrid').clearAll();
		$$('planesGrid').parse(Run.view.getAllPlanes());
	}

	this.refreshSelects = function(){
		$$("pilotSelect").define("options", Run.pilotProvider.getAllString());
		$$("pilotSelect").refresh();

		$$("planeSelect").define("options", Run.planeProvider.getAllString());
		$$("planeSelect").refresh();
		

	}

}

webix.ready(function(){

	webix.debug = true;
		webix.ui({
		rows: [
			{type: "header", template: "Аэропорт", css: {
              											"font-family"	:"'Comfortaa', cursive;",
              											"font-size"		: "20px;",
              											"text-align"	:"center;",
            											"margin-top"	: "15px;"}
            },
          
			{ view:"toolbar", elements:[
				{view:"button", value:"Добавить рейс", click: function(){Run.view.showWindows("addFlightWin"); Run.view.refreshSelects();},  height: 50},
				{view:"button", value:"Справочник пилотов", click: function(){Run.view.showWindows("pilotsInfoWin"); Run.view.refreshPilotsTable();}, height: 50},
				{view:"button", value:"Справочник самолётов", click: function(){Run.view.showWindows("planesInfoWin"); Run.view.refreshPlanesTable();}, height: 50},
			]},

			{view:"datatable",
			id: "grid",
			columns:[
				{id: "index", header:"№", fillspace: 1},
				{id: "pilot", header:"Пилот", fillspace: 2},
				{id: "plane", header:"Самолёт", fillspace: 2},
				{id:"destination1", header:"Из", fillspace: 2},
				{id: "destination2", header:"В", fillspace: 2}
			],
			scheme:{
        	$init:function(obj){ obj.index = this.count(); }
    		}
			},
			{cols:[ 
				{view:"button",css: "menu", value:"Редактировать",click:function(){Run.view.showWindows("editFlightWin")}, height: 50, fillspace: 1},
				{view:"button",css: "menu", value:"Удалить",click: function(){Run.view.showWindows("removeFlightWin")} ,height: 50, fillspace: 1}
			]},
		]
	});

	$$('grid').parse(Run.view.getAllFlights());
});