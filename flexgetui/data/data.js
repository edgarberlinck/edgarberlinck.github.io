/*
	This file is only for offline testing porpuses. I created because I do not have the 
	REST Api yet.
*/

var __data;

function filterByTaskType (data, taskType) {
	var __filtered = new Array();

	for (i = 0; i<data.length; i++) {
		if (data[i].taskType == taskType)
			__filtered.push(data[i]);
	}

	return __filtered;
}

function buildData() {
	__data = new Array();
	
	/* Some of my series goes here, just for better organized code. */
	var twoAndAHalfMen = new Serie("Two and a Half Men");
	var theBigBangTheory = new Serie("The Big Bang Theory");
	var supernatural = new Serie("supernatural");
	var revenge = new Serie("Revenge");
	var theWalkingDead = new Serie("The Walking Dead");
	var gameOfThrones = new Serie("Game of Thrones");

	/* Tasks goes here */
	var warnerChannelTask = new Task("My Warner Channel Series", TaskTypeSERIE);
	warnerChannelTask.addSerie(twoAndAHalfMen);
	warnerChannelTask.addSerie(theBigBangTheory);
	warnerChannelTask.addSerie(supernatural);
	warnerChannelTask.addSerie(revenge);

	var sonyTask = new Task("My Sony Series", TaskTypeSERIE);
	sonyTask.addSerie(theWalkingDead);

	var hboTask = new Task("My HBO Series", TaskTypeSERIE);
	hboTask.addSerie(gameOfThrones);

	var imdbMovies = new Task("My IMDB watchlist Task", TaskTypeMOVIE);

	__data.push(warnerChannelTask);
	__data.push(sonyTask);
	__data.push(hboTask);
	__data.push(imdbMovies);
}

function _getAllTasks(){
	if (!__data)
	buildData();

	return __data;
}

function _getSeriesTasks() {
	if (!__data)
	buildData();
	
	return filterByTaskType(__data, TaskTypeSERIE);
}

function _getMoviesTasks() {
	if (!__data)
	buildData();
	
	return filterByTaskType(__data, TaskTypeMOVIE);
}

function _getEbooksTasks() {
	if (!__data)
	buildData();
	
	return filterByTaskType(__data, TaskTypeEBOOK);
}