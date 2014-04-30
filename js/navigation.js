(function() {
    function Navigation(fileManifest, stage) {
        this.initialize(fileManifest, stage);
    }
    Navigation.prototype = {
        fileManifest: null,
        stage: null,
        levelProxy: null,
        soundPlaying: false,
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
            this.handleSoundPlay(null, "nav_consignes_fb", null);
            this.addItems();    
        },
        manageSubNavigation:function() {
            
        },
        addItems: function() {
            var i = 1; // background is already added so we start at index 1
            var entry = this.fileManifest[i];
            //add images and manage click event, starting at index 1 cause first index is the background already added
            while (i < this.fileManifest.length && entry.type === "image") {
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y,1, 1400, false);
                this.stage.addChild(item);
                this.levelProxy = createjs.proxy(this.handleItemlick, this, entry.id);
                item.addEventListener("pressup", this.levelProxy);
                i++;
                entry = this.fileManifest[i];
            };
        },
        handleItemlick: function(event, themeId) {
            if(!this.soundPlaying){
                this.stage.removeAllChildren();
                var level = Utils.getNextLevelForUser("test", themeId);
                level = new Moulin.Level(level, this.stage);
            }
        },
        handleSoundPlay: function(event, soundToPlay, callback) {
            var playingSound = createjs.Sound.play(soundToPlay);
            this.soundPlaying = true; //set playing flag to true to be able de deactivate click events during playback
             this.levelProxy = createjs.proxy(this.handleSoundCallBack, this, callback);
            playingSound.addEventListener("complete", this.levelProxy);
        },
        handleSoundCallBack: function(event, callback){
            this.soundPlaying = false; // set the playing variable to false to be able to enable click events
            if(callback !==null){
                 eval(this + "."  + callback);
            }
        }
    };
    Moulin.Navigation = Navigation;
}());