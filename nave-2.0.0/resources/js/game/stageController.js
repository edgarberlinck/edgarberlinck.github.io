

function StageController() {
  
};

StageController.prototype = {
  startStage: function (stageN) {
  	utils.clearScreen();
  	this.loadStage(stageN || 1);		  
  },

  loadStage: function(stageNumber) {
  	var js = 'resources/js/game/stages/stage'+stageNumber+'.js';
    var sc = this;
    ensure( { js: js }, function()
    {
       var stageConstructor = eval('Stage'+stageNumber);
       var stage = new stageConstructor();
       stage.stageController = sc;
       stage.gameController = sc.gameController;
       sc.stageLoaded(stage);
    });
  },

  stageLoaded: function (stage) {
    stage.start();
  }
}