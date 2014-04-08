(function() {
    function Level(fileManifest, stage) {
        this.initialize(fileManifest, stage);
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
        navMenu : null,
        initialize: function(fileManifest, stage) {
            //init internal variables
            this.fileManifest = fileManifest;
            this.stage = stage;
            this.playedSoundIds = new Array();
            this.levelSoundIds = new Array();
            this.levelImages = new Array();
            this.levelOutlines = new Array();


            //split file manifest after it's loaded in order to have an array for each type of objects
            this.splitFiles();
       this.createLevel();
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
                } else if(file.id.match(outlineMatch) !== null && file.id.match(sceneMatch) === null && file.id.match(fbMatch) === null) {
                    this.levelOutlines.push(file.id);
                }
            }
        },
        createLevel: function() {
            //adding the background image
            background = new createjs.Bitmap(this.fileManifest[0].src);
            this.stage.addChild(background);

            this.addGameItems();

            var consignesSound = createjs.Sound.play("consignes_fb");
            this.levelProxy = createjs.proxy(this.playRandomSound, this);
            consignesSound.addEventListener("complete", this.levelProxy);
        },
        getItemIndexById: function(itemId){
            var i=0;
            var itemIndex = -1;
            while(i<this.fileManifest.length && itemIndex == -1){
                if(this.fileManifest[i].id == itemId){
                    itemIndex = i;
                }
                i++;
            }
            return itemIndex;
        },
        handleItemlick: function(event, itemId) {
            var lastPlayedSound = this.playedSoundIds[this.playedSoundIds.length - 1];

            if (itemId + SOUND_SUFFIX === lastPlayedSound) {    
                event.target.removeEventListener("click", this.levelProxy);
                this.stage.removeChild(event.target);
           
                ////add outline image
                var indexOutline = this.getItemIndexById(itemId + OUTLINE_SUFFIX);
                var outlineItem = this.fileManifest[indexOutline];
                var outline = new createjs.Bitmap(outlineItem.src);
                outline.x = outlineItem.x;
                outline.y = outlineItem.y;

                this.stage.addChild(outline);
                //correct, play positive feedback
                var posFeedBack = createjs.Sound.play("pos0_fb");

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
                    locStage.update();
                    nav = new Moulin.Navigation(nav_fileManifest, locStage);
                });

            }
        }
    };
    Moulin.Level = Level;
}());



