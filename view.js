	var addFlightWin = {
			view:"form",
			borderless:true,
			elements: [
				{ view:"text", label:'Город отправления', name:"destination1"},
				{ view:"text", label:'Город прибытия', name:"destination2"},
				{ view:"select", label:"Пилот", options:["Алексей Иванов", "Андрей Петров", "Василий Уткин"] },
				{ view:"select", label:"Самолёт", options:["Ил-4", "Ми-45", "Ан-15"] },
				{ view:"button", value: "Submit", click:function(){
					if (this.getParentView().validate()){
                        webix.message("Рейс успешно добавлен");
                        this.getTopParentView().hide();
                    }
					else
						webix.message({ type:"error", text:"Form data is invalid" });
				}}
			],
			elementsConfig:{
				labelPosition:"top",
			}
		};

	var pilotsInfoWin = {
			view:"form",
			borderless:true,
			elements: [
				{view:"button", value: "Submit", click:function(){
					if (this.getParentView().validate()){
                        webix.message("Рейс успешно добавлен");
                        this.getTopParentView().hide();
                    }
					else
						webix.message({ type:"error", text:"Form data is invalid" });
				}},
				{view:"button", value:"Добавить", fillspace: 1},
				{view:"button", value:"Изменить", fillspace: 1},
				{view:"button", value:"Удалить",  fillspace: 1},
				
			],
			elementsConfig:{
				labelPosition:"top",
			}
		};

function view(){
	 webix.ui({
            view:"window",
            id:"addFlightWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Введите данные о рейсе:",
            body:webix.copy(addFlightWin)
        });

	 webix.ui({
            view:"window",
            id:"addFlightWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Пилоты:",
            body:webix.copy(pilotsInfoWin)
        });

	this.flightProvider = new flightProvider();
	this.pilotProvider = new pilotProvider();

	this.getAll = function(){
		return view.flightProvider.getAllJSON();
	}

	this.getAllPilots = function(){
		return view.pilotProvider.getAllJSON();
	}

	this.showWindows= function(targetWindow){
		$$(targetWindow).show();
	}
}

webix.ready(function(){

	this.view= new view();
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
				{view:"button", value:"Добавить рейс", click: function(){view.showWindows("addFlightWin");},  height: 50},
				{view:"button", value:"Справочник пилотов", click: function(){view.showWindows("addFlightWin");}, height: 50},
				{view:"button", value:"Справочник самолётов", height: 50},
			]},

			{view:"datatable",
			id: "grid",
			columns:[
				{id: "pilot", header:"Пилот", fillspace: 2},
				{id: "plane", header:"Самолёт", fillspace: 2},
				{id:"destination1", header:"Из", fillspace: 1},
				{id: "destination2", header:"В", fillspace: 1}
			],
			},

			{cols:[ 
				{view:"button",css: "menu", value:"Редактировать", height: 50, fillspace: 1},
				{view:"button",css: "menu", value:"Удалить", height: 50, fillspace: 1}
			]}
		]
	});
	$$('grid').parse(view.getAll());
});