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
			var updateLoading = this.game.updateLoading;
			
			if (!updateLoading)
				return;
			
			img.src = './resources/images/'+images[i];
			img.onload = function(){ 
				updateLoading(); 
			}
				
			images[i] = img;
		}
	}
}