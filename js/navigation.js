(function() {
    function Navigation(fileManifest, stage) {
        this.initialize(fileManifest, stage);
    }
    Navigation.prototype = {
        fileManifest: null,
        levelQueue: null,
        stage: null,
        bar: null,
        loadingBarText: null,
        levelProxy: null,
        initialize: function(fileManifest, stage) {
            //init internal variables
            this.fileManifest = fileManifest;
           //this.bar = loadingBar;
            this.stage = stage;
          /*  this.appState = appState;
            
            this.loadingBarText = new Moulin.LoadingBarText("Loading...", "1.2em Verdana", "black", 300, "center", 50);
            this.stage.addChild(this.loadingBarText);
            this.bar = new Moulin.LoadingBar(400, 40, 5, "green", "black");
            this.stage.addChild(this.bar);

            //manage loading queue
            this.levelQueue = new createjs.LoadQueue(false);
            this.levelQueue.installPlugin(createjs.Sound);
            //proxy to manage the scope of 'this' 
            this.levelProxy = createjs.proxy(this.handleProgress, this);
            this.levelQueue.addEventListener("progress", this.levelProxy);
            //proxy to manage the scope of 'this' 
            this.levelProxy = createjs.proxy(this.handleComplete, this);
            this.levelQueue.addEventListener("complete", this.levelProxy);
            this.levelQueue.loadManifest(fileManifest);*/
             //proxy to manage the scope of 'this' 
           /* this.levelProxy = createjs.proxy(this.handleClick, this);
            this.stage.addEventListener("click", this.levelProxy);*/
            this.manageNavigation();
            return this;
        },
       /* handleProgress: function() {
            this.bar.loadingBar.scaleX = this.levelQueue.progress * this.bar.width;
            progresPrecentage = Math.round(this.levelQueue.progress * 100);
            this.loadingBarText.setText(progresPrecentage + "% Loaded");
            //this.stage.update();
        },
        handleComplete: function() {
            this.loadingBarText.setText("Loading complete click to start");
            this.stage.update();
            //proxy to manage the scope of 'this' 
            this.levelProxy = createjs.proxy(this.handleClick, this);
            this.stage.addEventListener("click", this.levelProxy);
        },*/
       /* handleClick: function() {
            this.manageNavigation();
            this.stage.removeChild(this.loadingBarText, this.bar);
            this.stage.removeAllEventListeners("click");
        },*/
        manageNavigation: function() {
            //adding the background image
            background = new createjs.Bitmap(this.fileManifest[0].src);
            this.stage.addChild(background);
            this.addItems();

            //just play the 2 sounds one after the other
            //var consignesSound = createjs.Sound.play("intro_fb"); // TODO move this to the splash screen or elsewhere
            //consignesSound.addEventListener("complete", function() {
                createjs.Sound.play("nav_consignes_fb");
           // });
        },
        addItems: function() {
            var i = 1; // background is already added so we start at index 1
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
            };
        },
        handleItemlick: function(event, itemId) {
            this.stage.removeAllChildren();
            var levelName = itemId + "Level1_fileManifest";
            level = new Moulin.Level(eval(levelName), this.stage);
        }
    };
    Moulin.Navigation = Navigation;
}());