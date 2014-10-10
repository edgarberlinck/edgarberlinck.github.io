/* http://flexget.com/wiki/Cookbook
	Tipos de Task:
		- download series: 
		 	series -> Series[] | objeto que representa a serie a ser baixada
		 	rss -> String | url par ao feed
		 	downloadTo -> String | path para arquivos

		 -download de filmes

		 -download de ebooks

		 -URL Rewriting
*/

function Task(name, taskType) {
	this.name = name;
	this.taskType = taskType;
}

Task.prototype = {
	addSerie: function(serie){
		if (!this.serie) this.serie = new Array();
		this.serie.push(serie);
	}
}