"use strict";

function dataBase()
{
	this.pilotList = [new pilotModel("Алексей", "Иванов"),
				 new pilotModel("Валентин", "Песков"),
				 new pilotModel("Дмитрий", "Савчук"),];

	this.planeList = [new planeModel("Л-42"),
					 new planeModel("И-211"),
					 new planeModel("А-15"),
					 new planeModel("Ан-6")];

	this.flightList = [new flightModel("Москва", "Саратов", "Алексей Иванов", "Л-42"),
						new flightModel("Варшава", "Париж", "Валентин Песков", "А-15"),
						new flightModel("Лондон", "Санкт-Петербург", "Дмитрий Савчук", "Ан-6")];
}