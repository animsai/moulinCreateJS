(function() {
    function MediaLoader(manifestArray, stage) {
        this.initialize(manifestArray, stage);
    }
    MediaLoader.prototype = {
        //manifestArray: null, 
        mediaQueue: null,
        stage: null,
        bar: null,
        loadingBarText: null,
        mediaProxy:null,
        allManifestConcat:null,
        initialize : function(manifestArray, stage) {
           //this.manifestArray = manifestArray;
            this.stage = stage;
            this.allManifestConcat = [];
            //concat all manifests to load all media at once
            for(var i=0; i<manifestArray.length; i++) {
                this.allManifestConcat = this.allManifestConcat.concat(manifestArray[i]);
            }
            
            this.loadingBarText = new Moulin.LoadingBarText("Loading...", "1.2em Verdana", "black", 300, "center", 50);
            this.stage.addChild(this.loadingBarText);

            //creating a loading bar from our class and passing some arguments
            this.bar = new Moulin.LoadingBar(400, 40, 5, "green", "black");
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
        },
        handleProgress: function() {
            this.bar.loadingBar.scaleX = this.mediaQueue.progress * this.bar.width;
            progresPrecentage = Math.round(this.mediaQueue.progress * 100);
            this.loadingBarText.setText(progresPrecentage + "% Loaded");
        },
        handleComplete: function() {
            this.loadingBarText.setText("Loading complete click to start");
            //proxy to manage the scope of 'this' 
             this.mediaProxy = createjs.proxy(this.handleClick, this);
             this.stage.addEventListener("click", this.mediaProxy);
        },
        handleClick: function() {
            this.stage.removeChild(this.loadingBarText, this.bar);
            this.stage.removeAllEventListeners("click");
            nav = new Moulin.Navigation(nav_fileManifest, this.stage);
        }
    };
        Moulin.MediaLoader = MediaLoader;
}());


