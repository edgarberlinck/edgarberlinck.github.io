function ImageUtils(){

}

ImageUtils.prototype = {
	loadResources: function() {
		
		this.carregar(generalImageFiles);
		this.carregar(imageStarshipFiles);
		this.carregar(imageEnemies);
		
	},

	carregar: function(images) {
		for (var i in images) {
			var img = new Image();
			var updateLoadingCallback = this.game.updateLoading;
			
			if (!updateLoadingCallback)
				return;
			
			img.src = './resources/images/'+images[i];
			img.onload = function(){ 
				updateLoadingCallback(); 
			}
				
			images[i] = img;
		}
	}
}