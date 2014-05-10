 /* 
 * Manages the navigation part of the game, main and sub navigation. instanciates the backgrounds and the menus and submenus with respective scores
 * Author : J. Travnjak
 * Date : may 2014
 */
 (function() {
    function Navigation(fileManifest, stage, isMainNavigation, theme) {
        this.initialize(fileManifest, stage, isMainNavigation, theme);
    }
    Navigation.prototype = {
        fileManifest: null,
        stage: null,
        levelProxy: null,
        soundPlaying: false,
        subFileManifest: null,
        levelLoader: null,
        initialize: function(fileManifest, stage, isMainNavigation, theme) {
            //init internal variables
            if(isMainNavigation === undefined){ isMainNavigation = true };
            this.fileManifest = fileManifest;
            this.stage = stage;
            if(isMainNavigation) {
                this.initMainNavigation();
            } else {
                this.initSubNavigation(theme);
            }
            
            return this;
        },
        initMainNavigation: function() {
            //adding the background image
            background = new createjs.Bitmap(this.fileManifest[0].src);
            this.stage.addChild(background);
            this.handleSoundPlay(null, "nav_consignes_fb");
            this.addMainItems();
        },
        initSubNavigation: function(theme) {
            //adding the background image
            this.subFileManifest = eval(theme + "_nav_fileManifest");
            background = new createjs.Bitmap(this.subFileManifest[0].src);
            this.stage.addChild(background);
            //add back button
            Utils.addBackButton(this.stage, theme, true);
            this.handleSoundPlay(null, "subNav_consignes_fb");
            this.addSubNavigationItems();
        },
        addMainItems: function() {
            this.addItems(this.fileManifest, 1, true);
        },
        addSubNavigationItems: function() {
            this.addItems(this.subFileManifest, 1, false);
        },
        addItems: function(fileManifest, startingIndex, isMainNav) {
            var i = startingIndex; // background is already added so we start at index 1
            var entry = fileManifest[i];
            var itemIdForClickEvent;

            //add images and manage click event, starting at index 1 cause first index is the background already added
            while (i < fileManifest.length && entry.type === "image") {
                if (isMainNav) {
                    itemIdForClickEvent = entry.id;
                } else {
                    itemIdForClickEvent = entry.levelId;
                }
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1400, false);
                var container = new createjs.Container();
                container.addChild(item);

                var levelScore = Utils.getScoreByUserAndLevel("test", itemIdForClickEvent);
                if (levelScore !== null) {
                    var starX = item.x + 40;
                    var starY = item.y;

                    for (var j = 0; j < 3; j++) {
                        if (levelScore > 0) {
                            starFillColor = "#FDD017";
                            levelScore--;
                        } else {
                            starFillColor = "#5C5858";
                        }
                        var str = Utils.createStar(starFillColor, starX, starY, 0, 18, 1);
                        container.addChild(str);
                        starX += 40;
                    }
                }

                this.levelProxy = createjs.proxy(this.handleItemlick, this, itemIdForClickEvent, isMainNav);
                item.addEventListener("pressup", this.levelProxy);

                this.stage.addChild(container);
                i++;
                entry = fileManifest[i];
            };
        },
        handleItemlick: function(event, itemId, isMainNav) {
            if (!this.soundPlaying) {
                if (isMainNav) {
                    this.stage.removeAllChildren();
                    this.initSubNavigation(itemId);
                } else {
                    var level = Utils.getLevelById(itemId);
                    this.manageLevelLoadifNeeded(level);
                }
            } else {
                 Utils.manageSpeaker(this.stage);
            }
        },
        manageLevelLoadifNeeded: function(level) {
            var levelIndex = game.loadedLevels.indexOf(level.id);
            if (levelIndex === -1) {
                Utils.createBlurredRectangle(this.stage);
                var bar = new Moulin.LoadingBar(500, 90, 5, "#72AF2C", "#8CCF3F");
                this.stage.addChild(bar);
                this.levelLoader = new Moulin.MediaLoader() ;
                
                this.levelLoader.addOneFileManifest(eval(level.media))
                this.levelProxy = new createjs.proxy(this.handleLevelLoadProgress, this, bar, this.levelLoader);
                this.levelLoader.addEventListener("assetsLoadingProgress", this.levelProxy);

                this.levelProxy = new createjs.proxy(this.handleLevelLoadCompletion, this, level);
                this.levelLoader.addEventListener("assetsComplete", this.levelProxy);
            } else {
                 new Moulin.Level(level, this.stage);
            }
        },
        handleLevelLoadCompletion: function(event, level){
            game.loadedLevels.push(level.id);
            new Moulin.Level(level, this.stage);
        },
        handleLevelLoadProgress : function(event, loadingBar, assets){
             loadingBar.loadingBar.scaleX = assets.mediaQueue.progress * loadingBar.width;
        },
        handleSoundPlay: function(event, soundToPlay) {
            var playingSound = createjs.Sound.play(soundToPlay);
            this.soundPlaying = true; //set playing flag to true to be able de deactivate click events during playback
            this.levelProxy = createjs.proxy(this.handleSoundCallBack, this);
            playingSound.addEventListener("complete", this.levelProxy);
        },
        handleSoundCallBack: function() {
            this.soundPlaying = false; // set the playing variable to false to be able to enable click events
        }
    };
    Moulin.Navigation = Navigation;
}());