(function() {
    function Navigation(fileManifest, stage) {
        this.initialize(fileManifest, stage);
    }
    Navigation.prototype = {
        fileManifest: null,
        stage: null,
        levelProxy: null,
        soundPlaying: false,
        subFileManifest:null,
        initialize: function(fileManifest, stage) {
            //init internal variables
            this.fileManifest = fileManifest;
            this.stage = stage;
            this.initMainNavigation();
            return this;
        },
        initMainNavigation: function() {
            //adding the background image
            background = new createjs.Bitmap(this.fileManifest[0].src);
            this.stage.addChild(background);     
            this.handleSoundPlay(null, "nav_consignes_fb", null);
            this.addMainItems();    
        },
        initSubNavigation:function(theme) {
            //adding the background image
            this.subFileManifest = eval(theme + "_nav_fileManifest");
            background = new createjs.Bitmap(this.subFileManifest[0].src);
            this.stage.addChild(background);     
            this.handleSoundPlay(null, "subNav_consignes_fb", null);
            this.addSubNavigationItems(); 
        },
        addMainItems: function() {
           this.addItems(this.fileManifest, 1, true);
        },
        addSubNavigationItems : function(){
            this.addItems(this.subFileManifest, 1, false);
        },
        addItems :function(fileManifest, startingIndex, isMainNav) {
            var i = startingIndex; // background is already added so we start at index 1
            var entry = fileManifest[i];
            //add images and manage click event, starting at index 1 cause first index is the background already added
            while (i < fileManifest.length && entry.type === "image") {
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1400, false);
                this.stage.addChild(item);
                if(isMainNav){
                    this.levelProxy = createjs.proxy(this.handleItemlick, this, entry.id, isMainNav);
                } else {
                    this.levelProxy = createjs.proxy(this.handleItemlick, this, entry.levelId, isMainNav);
                }
                item.addEventListener("pressup", this.levelProxy);
                i++;
                entry = fileManifest[i];
            };
        },
        handleItemlick: function(event, itemId, isMainNav) {
            if(!this.soundPlaying){
                this.stage.removeAllChildren();
                if(isMainNav){
                    this.initSubNavigation(itemId);
                } else {
                    var level = Utils.getLevelById(itemId);
                    level = new Moulin.Level(level, this.stage);   
                }
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