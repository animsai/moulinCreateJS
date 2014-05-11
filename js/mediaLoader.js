/* 
 * Manages the load of the assets (sounds and images) needed in the game
 * Author : J. Travnjak
 * Date : may 2014
 */

(function() {
    function MediaLoader() {
        this.init();
    }
    MediaLoader.prototype = new createjs.EventDispatcher();
    MediaLoader.prototype.mediaQueue = null;
    MediaLoader.prototype.mediaProxy = null;
    MediaLoader.prototype.EventDispatcher_initialize = MediaLoader.prototype.initialize;
    MediaLoader.prototype.addArrayOfManifests = function(manifestArray) {
        for (var i = 0; i < manifestArray.length; i++) {
            this.addOneFileManifest(manifestArray[i]);
        }
    };
    MediaLoader.prototype.addOneFileManifest = function(fileManifest) {
        this.mediaQueue.loadManifest(fileManifest);
    };
    MediaLoader.prototype.init = function() {
        MediaLoader.prototype.EventDispatcher_initialize();
        //manage loading queue
        this.mediaQueue = new createjs.LoadQueue(false);
        this.mediaQueue.installPlugin(createjs.Sound);
        createjs.Sound.alternateExtensions = ["mp3"];
        //proxy to manage the scope of 'this' 
        this.mediaProxy = createjs.proxy(this.handleProgress, this);
        this.mediaQueue.addEventListener("progress", this.mediaProxy);
        //proxy to manage the scope of 'this' 
        this.mediaProxy = createjs.proxy(this.handleComplete, this);
        this.mediaQueue.addEventListener("complete", this.mediaProxy);
        return this;
    };
    MediaLoader.prototype.handleProgress = function() {
        this.dispatchEvent("assetsLoadingProgress");
    };
    MediaLoader.prototype.handleComplete = function() {
        this.dispatchEvent("assetsComplete");
    };

    Moulin.MediaLoader = MediaLoader;
}());


