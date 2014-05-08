/***
 * 
 * Main class for the game
 * Author : J. Travnjak
 * Date : may 2014
 */

(function() {
    function Moulin() {
        //do nothing;
    }
    Moulin.prototype = {
        stage: null,
        moulinProxy: null,
        bar:null,
        assets:null,
        init: function() {
            this.initStage();
            
           this.loadScoresFromLocalStorage();

            this.loadCoreAssets();
        },
        initStage:function() {
            var canvas = document.getElementById("gameCanvas");
            this.stage = new createjs.Stage(canvas);
            createjs.Touch.enable(this.stage);
            this.moulinProxy = new createjs.proxy(this.handleTick, this);
            createjs.Ticker.addEventListener("tick", this.moulinProxy);
            this.onResize();
            
            var background = new createjs.Bitmap(introImg.src);
            this.stage.addChild(background);
        },
        loadCoreAssets:function() {
            this.assets = new Moulin.MediaLoader(allFiles, this.stage);
            this.moulinProxy = new createjs.proxy(this.handleLoadProgress, this);
            this.assets.addEventListener("assetsLoadingProgress", this.moulinProxy);
            
            this.moulinProxy = new createjs.proxy(this.addStartButton, this);
            this.assets.addEventListener("assetsComplete", this.moulinProxy);
            
            //creating a loading bar from our class and passing some arguments
            this.bar = new Moulin.LoadingBar(500, 90, 5, "#72AF2C", "#8CCF3F");
            this.stage.addChild(this.bar);
        },
        addStartButton: function() {
            var nextBtn = Utils.generateBitmapItem(interLevel_fileManifest[2].src, 430, 350, 1, true);
            this.stage.removeChild(this.bar);

            this.moulinProxy = createjs.proxy(this.handleStartClick, this);
            nextBtn.addEventListener("click", this.moulinProxy);

            this.stage.addChild(nextBtn);
        },
        handleStartClick: function() {
            this.stage.removeAllEventListeners("click");
            nav = new Moulin.Navigation(nav_fileManifest, this.stage);
        },
        handleLoadProgress:function() {
            this.bar.loadingBar.scaleX = this.assets.mediaQueue.progress * this.bar.width;
        },
        loadScoresFromLocalStorage:function() {
            if (Utils.supportsLocalStorage() && localStorage["moulin.scores"] !== undefined) {
                userScore = JSON.parse(localStorage["moulin.scores"]);
            }
        },
        handleTick: function() {
            this.stage.update();
        },
        //code found here and slightly adapted:
        //http://community.createjs.com/discussions/createjs/547-resizing-canvas-and-its-content-proportionally-cross-platform
        onResize: function()
        {
            // browser viewport size
            var w = window.innerWidth;
            var h = window.innerHeight;

            // stage dimensions
            var ow = 1045;
            var oh = 789;

            // keep aspect ratio
            var scale = Math.min(w / ow, h / oh);
            this.stage.scaleX = scale;
            this.stage.scaleY = scale;

            // adjust canvas size
            this.stage.canvas.width = ow * scale - 10;
            this.stage.canvas.height = oh * scale - 10;

        }
    };

    window.Moulin = Moulin;
}());