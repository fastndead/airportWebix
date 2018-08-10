function view(){

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
					{ view:"text", label:'Город отправления', name:"destination1"},
					{ view:"text", label:'Город прибытия', name:"destination2"},
					{ view:"richselect",id : "pilotAddSelect", label:"Пилот", options:{
						body:{template: "#firstName# #lastName#"},
						on:{
						    onChange:function(newId){
						      var item = this.getList().getItem(newId);
						      webix.message(item.title)
						    }
						}
					}
					},
					{ view:"select", label:"Самолёт", options:["Ил-4", "Ми-45", "Ан-15"] },
					{ view:"button", value: "Добавить", click:function(){
						if (this.getParentView().validate()){
		                    webix.message("Рейс успешно добавлен");
		                    this.getTopParentView().hide();
		                }
						else
							webix.message({ type:"error", text:"Form data is invalid" });
					}},
					{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addFlightWin").hide();
							}
						},
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
						{view:"button", value:"Удалить",  fillspace: 1}
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
						{view:"button", value:"Добавить", fillspace: 1},
						{view:"button", value:"Изменить", fillspace: 1},
						{view:"button", value:"Удалить",  fillspace: 1}
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

	var tempIndex;

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
		webix.message("Пилот успешно добавлен");
		$$("addPilotWin").hide();
		Run.view.refreshPilotsTable();
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
			$$("lastNameEdit").setValue(Run.pilotProvider.getByIndex(tempIndex-1).getLastName());
			$$("firstNameEdit").setValue(Run.pilotProvider.getByIndex(tempIndex-1).getFirstName());
			$$("editBtn").detachEvent("onItemClick", Run.view.editPilot);
			return;
		}	
		Run.editPilot($$("firstNameEdit").getValue(), $$("lastNameEdit").getValue(), tempIndex -1);
		$$("editPilotWin").hide();
		$$("firstNameEdit").setValue("");
		$$("lastNameEdit").hide();
		Run.view.refreshPilotsTable();
	}

	this.refreshPilotsTable = function(){
		$$('pilotsGrid').clearAll();
		$$('pilotsGrid').parse(Run.view.getAllPilots());
	}

	this.refreshPlanesTable = function(){
		$$('planesGrid').clearAll();
		$$('planesGrid').parse(Run.view.getAllPlanes());
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
				{view:"button", value:"Добавить рейс", click: function(){Run.view.showWindows("addFlightWin");},  height: 50},
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
				{view:"button",css: "menu", value:"Редактировать", height: 50, fillspace: 1},
				{view:"button",css: "menu", value:"Удалить", height: 50, fillspace: 1}
			]},
		]
	});

	$$('grid').parse(Run.view.getAllFlights());
});