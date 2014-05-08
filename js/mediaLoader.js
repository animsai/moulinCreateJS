/* 
 * Manages the load of the assets (sounds and images) needed in the game
 * Author : J. Travnjak
 * Date : may 2014
 */

(function() {
    function MediaLoader(manifestArray, stage) {
        this.initialize(manifestArray, stage);
    }
   MediaLoader.prototype = new createjs.EventDispatcher();
        MediaLoader.prototype.mediaQueue =  null;
        MediaLoader.prototype.stage =  null;
        MediaLoader.prototype.bar =  null;
        MediaLoader.prototype.loadingBarText =  null;
        MediaLoader.prototype.mediaProxy = null;
        MediaLoader.prototype.allManifestConcat = null;
        MediaLoader.prototype.EventDispatcher_initialize = MediaLoader.prototype.initialize;
        MediaLoader.prototype.initialize  =  function(manifestArray, stage) {
            MediaLoader.prototype.EventDispatcher_initialize();
            this.stage = stage;
            
            this.allManifestConcat = [];
            //concat all manifests to load all media at once
            for(var i=0; i<manifestArray.length; i++) {
                this.allManifestConcat = this.allManifestConcat.concat(manifestArray[i]);
            }

//            this.loadingBarText = new Moulin.LoadingBarText("Loading...", "1.2em Verdana", "black", 300, "center", 50);
//            this.stage.addChild(this.loadingBarText);
            var background = new createjs.Bitmap(introImg.src);
            this.stage.addChild(background);

            //creating a loading bar from our class and passing some arguments
            this.bar = new Moulin.LoadingBar(500, 90, 5, "#72AF2C", "#8CCF3F");
            this.stage.addChild(this.bar);

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
            this.bar.loadingBar.scaleX = this.mediaQueue.progress * this.bar.width;
            progresPrecentage = Math.round(this.mediaQueue.progress * 100);
//            this.loadingBarText.setText(progresPrecentage + "% Loaded");
        };
        MediaLoader.prototype.handleComplete =  function() {
            this.addNextButton();
            this.dispatchEvent("assetsComplete");
        };
        MediaLoader.prototype.addNextButton  =  function() {
            var nextBtn = Utils.generateBitmapItem(interLevel_fileManifest[2].src, 430, 350, 1, true);
            this.stage.removeChild(this.bar);
            
            this.mediaProxy = createjs.proxy(this.handleClick, this);
            nextBtn.addEventListener("click", this.mediaProxy);
            this.stage.addChild(nextBtn);
        };
        MediaLoader.prototype.handleClick = function() {
            this.stage.removeAllEventListeners("click");
            nav = new Moulin.Navigation(nav_fileManifest, this.stage);
        }
//    };
   
    Moulin.MediaLoader = MediaLoader;
}());


