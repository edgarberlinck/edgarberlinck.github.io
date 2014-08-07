function AudioUtils() {

}

AudioUtils.prototype = {
    loadResources: function () {
        for (var i in audioFiles) {
            var audio = new Audio();
            var updateLoadingCallback = this.game.updateLoading;
            
            if (!updateLoadingCallback)
                return;
            
            audio.src = './resources/sounds/'+audioFiles[i];
            audio.onloadeddata = function(){ 
                updateLoadingCallback(); 
            }
            
            audio.load();
            audio.volume = 0.8;

            audioFiles[i] = audio;
        }
    }
}