(function() {
    function Level(level, stage) {
        this.initialize(level, stage);
    }

    Level.prototype = {
        fileManifest: null,
        stage: null,
        level: null,
        score: 0,
        levelProxy: null,
        playedSoundIds: null,
        levelSoundIds: null,
        levelImages: null,
        levelOutlines: null, //TODO check if needed, for now not used
        soundPlaying: false,
        initialize: function(level, stage) {
            //init internal variables
            this.fileManifest = eval(level.media);
            this.level = level;
            this.stage = stage;
            this.playedSoundIds = new Array();
            this.levelSoundIds = new Array();
            this.levelImages = new Array();
            this.levelOutlines = new Array();
            this.soundPlaying == false
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
            for (i = 0; i < this.fileManifest.length; i++) {
                var file = this.fileManifest[i];
                if (file.id.match(sndMatch) !== null) {
                    this.levelSoundIds.push(file.id);
                } else if (file.id.match(outlineMatch) === null && file.id.match(sceneMatch) === null && file.id.match(fbMatch) === null) {
                    this.levelImages.push(file.id);
                } else if (file.id.match(outlineMatch) !== null && file.id.match(sceneMatch) === null && file.id.match(fbMatch) === null) {
                    this.levelOutlines.push(file.id);
                }
            }
        },
        createLevel: function() {
            //adding the background image
            background = new createjs.Bitmap(this.fileManifest[0].src);
            this.stage.addChild(background);

            //playing instruction sentance
            var consignesSound = createjs.Sound.play("consignes_" + this.level.id);
            this.levelProxy = createjs.proxy(this.playRandomSound, this);
            consignesSound.addEventListener("complete", this.levelProxy);

            //add interaction items
            this.addGameItems();
        },
        getItemIndexById: function(itemId) {
            var i = 0;
            var itemIndex = -1;
            while (i < this.fileManifest.length && itemIndex === -1) {
                if (this.fileManifest[i].id === itemId) {
                    itemIndex = i;
                }
                i++;
            }
            return itemIndex;
        },
        handleItemInteraction: function(event, itemId) {
            //console.log(this.soundPlaying);
            if(this.soundPlaying == false){
            var lastPlayedSound = this.playedSoundIds[this.playedSoundIds.length - 1];
            if (itemId + SOUND_SUFFIX === lastPlayedSound) {//correct, play positive feedback
                //console.log("posfeed");
                event.target.removeEventListener("pressup", this.levelProxy);
                //make the item dissapear gently
                var clickedItem = event.target;
                var localThis = this;
                createjs.Tween.get(clickedItem).to({alpha: 0}, 1000).call(function() {
                    localThis.stage.removeChild(clickedItem);
                });
                this.score++;
                ////add outline image to stage
                var indexOutline = this.getItemIndexById(itemId + OUTLINE_SUFFIX);
                var outlineItem = this.fileManifest[indexOutline];
                var outline = Utils.generateBitmapItem(outlineItem.src, outlineItem.x, outlineItem.y, 1400, false);
                this.stage.addChild(outline);

                //Play positive feedback
                var randomFBNum = Math.round(Math.random() * 3);
                var posFeedBack = createjs.Sound.play("pos" + randomFBNum + "_fb");
                //play another random sound    
                this.levelProxy = createjs.proxy(this.playRandomSound, this);
                posFeedBack.addEventListener("complete", this.levelProxy);

            } else if(lastPlayedSound !== undefined){
                //wrong, play negative feedback
                var randomFBNegNum = Math.round(Math.random() * 2);
                var negFeedBack = createjs.Sound.play("neg" + randomFBNegNum + "_fb");
                this.soundPlaying = true;
                //console.log("negfeed");
                this.score--;
                var localthis = this;
                //replay last sound
                negFeedBack.addEventListener("complete", function() {
                    //console.log("replay");
                    createjs.Sound.play(lastPlayedSound);
                    localthis.soundPlaying = false;
                    
                });
               //console.log("after replay " + this.soundPlaying);
            }}
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
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1400, true);
                this.levelProxy = createjs.proxy(this.handleItemInteraction, this, entry.id);
                item.addEventListener("pressup", this.levelProxy)
                this.stage.addChild(item);
                i++;
                entry = this.fileManifest[i];
            }
            ;
        },
        playRandomSound: function() {
            if (this.levelSoundIds.length > 0) {
                this.soundPlaying = false;
                var randomIndex = Math.floor(Math.random() * this.levelSoundIds.length);
                var randomSoundId = this.levelSoundIds[randomIndex];
                this.playedSoundIds.push(randomSoundId);
                createjs.Sound.play(randomSoundId);
                //remove played sound to prevent from being selected again
                this.levelSoundIds.splice(randomIndex, 1);
            } else {    //game finished, play conclusion and launch next level 
                this.manageLevelEnd();
            }
        },
        manageLevelEnd: function() {
            //set the score for this level
            this.stage.removeAllEventListeners();
            this.updateLevelScore(this.level, this.score);
            var nextLevel = Utils.getNextDirectLevel(this.level.id);

            var score = new Moulin.Score(this.level, nextLevel, this.stage, this.score);
            var conclusion = createjs.Sound.play("conclusion_fb");

            this.levelProxy = createjs.proxy(this.manageLevelEnd, this);
            //once the conclusion is over, add the navigation buttons
            conclusion.addEventListener("complete", function() {
                score.addScoreScreenItems();
            });
        },
        updateLevelScore: function(level, score) {
            var scoreIndex = userScore.length;
            var finalScore = (score < 0) ? 0 : score;
            var update = 0;
            //set the score for this level
            //first check if already played and update it
            for (var i = 0; i < scoreIndex; i++) {
                if (userScore[i].user === "test" && userScore[i].levelId === level.id) {
                    userScore[i].score = finalScore;
                    update = 1;
                }
            }
            if (update === 0) { //add a new score instad of updating existing
                userScore[scoreIndex] = {user: "test", levelId: level.id, theme: level.theme, score: finalScore};
            }
            
            if(Utils.supportsLocalStorage()) {
                localStorage["moulin.scores"] = JSON.stringify(userScore);
            }
            
        }
    };
    Moulin.Level = Level;
}());



