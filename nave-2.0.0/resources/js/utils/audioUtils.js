function AudioUtils(){

}

AudioUtils.prototype = {
	loadResources: function() {
		for (var i in audioFiles) {
			var audio = new Audio();
			var updateLoading = this.game.updateLoading;
			
			if (!updateLoading)
				return;
			
			audio.src = './resources/sounds/'+audioFiles[i];
			audio.onloadeddata = function(){ 
				updateLoading(); 
			}
			
			audio.load();
			audio.volume = 0.8;

			audioFiles[i] = audio;
		}
	}
}