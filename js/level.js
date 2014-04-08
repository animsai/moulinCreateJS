(function() {
    function Level(fileManifest, stage, loadingBar, loadingBarText) {
        this.initialize(fileManifest, stage, loadingBar, loadingBarText);
    }

    Level.prototype = {
        fileManifest: null,
        levelQueue: null,
        stage: null,
        bar: null,
        loadingBarText: null,
        levelProxy: null,
        playedSoundIds: null,
        levelSoundIds: null,
        levelImages: null,
        levelOutlines: null, //TODO check if needed, for now not used
        initialize: function(fileManifest, stage, loadingBar, loadingBarText) {
            //init internal variables
            this.fileManifest = fileManifest;
            //this.bar = loadingBar;
            this.stage = stage;
            //this.loadingBarText = loadingBarText;
            this.playedSoundIds = new Array();
            this.levelSoundIds = new Array();
            this.levelImages = new Array();
            this.levelOutlines = new Array();

            this.loadingBarText = new Moulin.LoadingBarText("Loading...", "1.2em Verdana", "black", 300, "center", 50);
            this.stage.addChild(this.loadProgressText);

            //creating a loading bar from our class and passing some arguments
            this.bar = new Moulin.LoadingBar(400, 40, 5, "green", "black");
            this.stage.addChild(this.bar);

            //split file manifest after it's loaded in order to have an array for each type of objects
            this.splitFiles();

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
        splitFiles: function() {
            var sndMatch = new RegExp(SOUND_SUFFIX, "g");
            var outlineMatch = new RegExp(OUTLINE_SUFFIX, "g");
            var sceneMatch = new RegExp(SCENE_ID, "g");
            var fbMatch = new RegExp(FEEDBACK_SUFFIX, "g");
            //starting at 1 cause first element is the background
            for (i = 0; i < this.fileManifest.length; i++) {
                var file = this.fileManifest[i];
                if (file.id.match(sndMatch) !== null) {
                    this.levelSoundIds.push(file.id);
                } else if (file.id.match(outlineMatch) === null && file.id.match(sceneMatch) === null && file.id.match(fbMatch) === null) {
                    this.levelImages.push(file.id);
                }
            }
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
            this.createLevel();
            this.stage.removeChild(this.loadingBarText, this.bar);
            this.stage.removeAllEventListeners("click");
            //no more need to click here, because it's done in the navigation
            /* this.levelProxy = createjs.proxy(this.handleClick, this);
             this.stage.addEventListener("click", this.levelProxy);*/
        },
        handleClick: function() {
            this.createLevel();
            this.stage.removeChild(this.loadingBarText, this.bar);
            this.stage.removeAllEventListeners("click");
        },
        createLevel: function() {
            //adding the background image
            background = new createjs.Bitmap(this.levelQueue.getResult("scene"));
            this.stage.addChild(background);

            this.addGameItems();

            var consignesSound = createjs.Sound.play("consignes_fb");
            this.levelProxy = createjs.proxy(this.playRandomSound, this);
            consignesSound.addEventListener("complete", this.levelProxy);
        },
        handleItemlick: function(event, itemId) {
            var lastPlayedSound = this.playedSoundIds[this.playedSoundIds.length - 1];

            if (itemId + SOUND_SUFFIX === lastPlayedSound) {
                //correct, play positive feedback
                var posFeedBack = createjs.Sound.play("pos0_fb");
                event.target.removeEventListener("click", this.levelProxy);
                this.stage.removeChild(event.target);
                //add outline image
                var outlineItem = this.levelQueue.getItem(itemId + OUTLINE_SUFFIX);
                var outline = new createjs.Bitmap(this.levelQueue.getResult(outlineItem.id));
                outline.x = outlineItem.x;
                outline.y = outlineItem.y;

                this.stage.addChild(outline);
                this.stage.update();
                //play another random sound
                this.levelProxy = createjs.proxy(this.playRandomSound, this);
                posFeedBack.addEventListener("complete", this.levelProxy);
            } else {
                //wrong, play negative feedback
                var negFeedBack = createjs.Sound.play("neg0_fb");
                //replay last sound
                negFeedBack.addEventListener("complete", function() {
                    createjs.Sound.play(lastPlayedSound);
                });
            }
        },
        /***
         * adds the game items that are clickable to the scene
         */
        addGameItems: function() {
            var i = 1; // background is already added
            var entry = this.fileManifest[i];
            //add images and manage click event, starting at index 1 cause first index is the background already added
            var outlineMatch = new RegExp(OUTLINE_SUFFIX, "g");
            while (i < this.fileManifest.length && entry.type === "image" && entry.id.match(outlineMatch) === null) {
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
        playRandomSound: function() {
            if (this.levelSoundIds.length > 0) {
                var randomIndex = Math.floor(Math.random() * this.levelSoundIds.length);
                var randomSoundId = this.levelSoundIds[randomIndex];
                this.playedSoundIds.push(randomSoundId);
                createjs.Sound.play(randomSoundId);
                //remove played sound to prevent from being selected again
                this.levelSoundIds.splice(randomIndex, 1);
            } else {
                //game finished, play conclusion
                var conclusion = createjs.Sound.play("conclusion_fb");
                var locStage = this.stage;
                conclusion.addEventListener("complete", function() {
                    //clear stage TODO animate 
                    locStage.removeAllChildren();
                    //go back to navigation
                    nav.initialize();
                });

            }
        }
    };
    Moulin.Level = Level;
}());


