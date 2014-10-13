function TasksController () {

}

TasksController.prototype = {
	getAllTasks : function() {
		var data = _getAllTasks();

		return {
			list : data,
			length : data.length
		}
	},

	getSeriesTask : function() {
		var data = _getSeriesTasks();

		return {
			list : data,
			length : data.length
		}
	},

	getMoviesTask : function() {
		var data = _getMoviesTasks();

		return {
			list : data,
			length : data.length
		}
	},

	getEbooksTask : function() {
		var data = _getEbooksTasks();

		return {
			list : data,
			length : data.length
		}
	}
}