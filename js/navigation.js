(function() {
    function Navigation(fileManifest, stage, loadingBar, loadingBarText) {
        this.initialize(fileManifest, stage, loadingBar, loadingBarText);
    }
    Navigation.prototype = {
        fileManifest: null,
        levelQueue: null,
        stage: null,
        bar: null,
        loadingBarText: null,
        levelProxy: null,
        initialize: function(fileManifest, stage, loadingBar, loadingBarText) {
            //init internal variables
            this.fileManifest = fileManifest;
            this.bar = loadingBar;
            this.stage = stage;
            this.loadingBarText = loadingBarText;

            //manage loading queue
            this.levelQueue = new createjs.LoadQueue(false);
            this.levelQueue.installPlugin(createjs.Sound);
            //proxy to manage the scope of 'this' 
            this.levelProxy = createjs.proxy(this.handleProgress, this);
            this.levelQueue.addEventListener("progress", this.levelProxy);
            //proxy to manage the scope of 'this' 
            this.levelProxy = createjs.proxy(this.handleComplete, this);
            this.levelQueue.addEventListener("complete", this.levelProxy);
            this.levelQueue.loadManifest(fileManifest);

            return this;
        },
        handleProgress: function() {
            this.bar.loadingBar.scaleX = this.levelQueue.progress * this.bar.width;
            progresPrecentage = Math.round(this.levelQueue.progress * 100);
            this.loadingBarText.setText(progresPrecentage + "% Loaded");
            this.stage.update();
        },
        handleComplete: function() {
            this.loadingBarText.setText("Loading complete click to start");
            this.stage.update();
            //proxy to manage the scope of 'this' 
            this.levelProxy = createjs.proxy(this.handleClick, this);
            this.stage.addEventListener("click", this.levelProxy);
        },
        handleClick: function() {
            this.manageNavigation();
            this.stage.removeChild(this.loadingBarText, this.bar);
            this.stage.removeAllEventListeners("click");
        },
        manageNavigation: function() {
            //adding the background image
            background = new createjs.Bitmap(this.levelQueue.getResult("scene"));
            this.stage.addChild(background);

            this.addItems();

            //just play the 2 sounds one after the other
            var consignesSound = createjs.Sound.play("intro_fb");
            consignesSound.addEventListener("complete", function() {
                createjs.Sound.play("consignes_fb");
            });
        },
        addItems: function() {
            var i = 1; // background is already added
            var entry = this.fileManifest[i];
            //add images and manage click event, starting at index 1 cause first index is the background already added
            while (i < this.fileManifest.length && entry.type === "image") {
                var item = new createjs.Bitmap(entry.src);
                var itemId = entry.id;
                item.x = entry.x;
                item.y = entry.y;
                this.levelProxy = createjs.proxy(this.handleItemlick, this, itemId);
                item.addEventListener("click", this.levelProxy);
                this.stage.addChild(item);
                i++;
                entry = this.fileManifest[i];
            }
            ;

            //updating the stage
            this.stage.update();
        },
        handleItemlick: function(event, itemId) {
            this.stage.removeAllChildren();
            this.stage.update();
            level = new Moulin.Level(level1_AnimauxFileManifest, this.stage, null, null);
        }
    };

    Moulin.Navigation = Navigation;
}());