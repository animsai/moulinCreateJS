(function() {
    function Navigation(fileManifest, stage) {
        this.initialize(fileManifest, stage);
    }
    Navigation.prototype = {
        fileManifest: null,
        stage: null,
        levelProxy: null,
        initialize: function(fileManifest, stage) {
            //init internal variables
            this.fileManifest = fileManifest;
           //this.bar = loadingBar;
            this.stage = stage;
   
            this.manageNavigation();
            return this;
        },

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
                var themeId = entry.id;
                item.x = entry.x;
                item.y = entry.y;
                this.levelProxy = createjs.proxy(this.handleItemlick, this, themeId);
                item.addEventListener("click", this.levelProxy);
                this.stage.addChild(item);
                i++;
                entry = this.fileManifest[i];
            };
        },
        handleItemlick: function(event, themeId) {
            this.stage.removeAllChildren();
            var level = getNextLevelForUser("test", themeId);
            level = new Moulin.Level(level, this.stage);
        }
    };
    Moulin.Navigation = Navigation;
}());