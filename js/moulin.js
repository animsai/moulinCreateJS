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
        init: function() {
            var canvas = document.getElementById("gameCanvas");
            this.stage = new createjs.Stage(canvas);
            createjs.Touch.enable(this.stage);
            var proxy = new createjs.proxy(this.handleTick, this);
            createjs.Ticker.addEventListener("tick", proxy);
            this.onResize();

            //Load scores from local storage
            if (Utils.supportsLocalStorage() && localStorage["moulin.scores"] !== undefined) {
                userScore = JSON.parse(localStorage["moulin.scores"]);
            }

            var assets = new Moulin.MediaLoader(allFiles, this.stage);
            assets.addEventListener("assetsComplete", function() {console.log("fini terminé");});
//            assets.on("assetsComplete", function() {console.log("fini terminé");});
//           var assets = new Moulin.AssetManager();
//           assets.manageInitialLoad(allFiles, this.stage);
//           assets.on(assets.ASSETS_COMPLETE, this.addStartButton);
        },
         addStartButton : function() {
            var nextBtn = Utils.generateBitmapItem(interLevel_fileManifest[2].src, 430, 350, 1, true);
//            this.stage.removeChild(this.bar);
            
//            this.mediaProxy = createjs.proxy(this.handleClick, this);
//            nextBtn.addEventListener("click", this.mediaProxy);
            this.stage.addChild(nextBtn);
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