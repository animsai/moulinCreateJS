/* 
 * Manages the load of the assets (sounds and images) needed in the game
 * Author : J. Travnjak
 * Date : may 2014
 */

(function() {
    function MediaLoader(manifestArray) {
        this.initialize(manifestArray);
    }
   MediaLoader.prototype = new createjs.EventDispatcher();
        MediaLoader.prototype.mediaQueue =  null;
        MediaLoader.prototype.mediaProxy = null;
        MediaLoader.prototype.allManifestConcat = null;
        MediaLoader.prototype.EventDispatcher_initialize = MediaLoader.prototype.initialize;
        MediaLoader.prototype.initialize  =  function(manifestArray) {
            MediaLoader.prototype.EventDispatcher_initialize();
            
            this.allManifestConcat = [];
            //concat all manifests to load all media at once
            for(var i=0; i<manifestArray.length; i++) {
                this.allManifestConcat = this.allManifestConcat.concat(manifestArray[i]);
            }

             //manage loading queue
            this.mediaQueue = new createjs.LoadQueue(false);
            this.mediaQueue.installPlugin(createjs.Sound);
            //proxy to manage the scope of 'this' 
            this.mediaProxy = createjs.proxy(this.handleProgress, this);
            this.mediaQueue.addEventListener("progress", this.mediaProxy);
            //proxy to manage the scope of 'this' 
            this.mediaProxy = createjs.proxy(this.handleComplete, this);
            this.mediaQueue.addEventListener("complete", this.mediaProxy);
            this.mediaQueue.loadManifest(this.allManifestConcat);
            return this;
        };
        MediaLoader.prototype.handleProgress =  function() {
            this.dispatchEvent("assetsLoadingProgress");
        };
        MediaLoader.prototype.handleComplete =  function() {
            this.dispatchEvent("assetsComplete");
        };
   
    Moulin.MediaLoader = MediaLoader;
}());


