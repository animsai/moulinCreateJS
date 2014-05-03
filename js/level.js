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
        speaker: null,
        initialize: function(level, stage) {
            //init internal variables
            this.fileManifest = eval(level.media);
            this.level = level;
            this.stage = stage;
            this.playedSoundIds = new Array();
            this.levelSoundIds = new Array();
            this.levelImages = new Array();
            this.levelOutlines = new Array();
            this.soundPlaying = false;
            this.speaker = Utils.generateBitmapItem(speakerIconFile.src, speakerIconFile.x, speakerIconFile.y, 0, false);
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
            this.setSoundPlaying(null, true);
            if (this.level.interaction === InteractionTypeEnum.GUIDEE) {
                this.levelProxy = createjs.proxy(this.playRandomSound, this);
                consignesSound.addEventListener("complete", this.levelProxy);
            } else {
                this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
                consignesSound.addEventListener("complete", this.levelProxy);
            }

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
        handleOrderedInteraction: function(event, itemId) {
            if (this.soundPlaying === false) {
                this.stage.removeChild(this.speaker);
                //if item is dropped in the dropping zone (on lili), then tell feedback and continue game
                event.target.removeEventListener("pressup", this.levelProxy);
                //make the item dissapear gently with tween effect
                var clickedItem = event.target;
                var localThis = this;
                createjs.Tween.get(clickedItem).to({alpha: 0}, 1000).call(function() {
                    localThis.stage.removeChild(clickedItem);
                });

                ////add outline image to stage
                var indexOutline = this.getItemIndexById(itemId + OUTLINE_SUFFIX);
                var outlineItem = this.fileManifest[indexOutline];
                var outline = Utils.generateBitmapItem(outlineItem.src, outlineItem.x, outlineItem.y, 1400, false);
                this.stage.addChild(outline);
                //add score
                this.score++;
                //Play item related feedback
                this.playItemRelatedFeedback(itemId);

            } else {
                //TODO inform user that there is a sound playing and that he needs to wait!
                this.stage.addChild(this.speaker);
                this.speaker.alpha = 0.2;
                createjs.Tween.get(this.speaker).to({alpha: 0.8}, 300).to({alpha: 0}, 300);
            }
        },
        handleGuidedInteraction: function(event, itemId) {
            if (this.soundPlaying === false) {
                this.stage.removeChild(this.speaker);
                var lastPlayedSound = this.playedSoundIds[this.playedSoundIds.length - 1]
                if (itemId + SOUND_SUFFIX === lastPlayedSound) {
                    //correct : remove clicked item, display outline on stage, update score and play positive feedback
                    event.target.removeEventListener("pressup", this.levelProxy);
                    //make the item dissapear gently with tween effect
                    var clickedItem = event.target;
                    var localThis = this;
                    createjs.Tween.get(clickedItem).to({alpha: 0}, 1000).call(function() {
                        localThis.stage.removeChild(clickedItem);
                    });

                    ////add outline image to stage
                    var indexOutline = this.getItemIndexById(itemId + OUTLINE_SUFFIX);
                    var outlineItem = this.fileManifest[indexOutline];
                    var outline = Utils.generateBitmapItem(outlineItem.src, outlineItem.x, outlineItem.y, 1400, false);
                    this.stage.addChild(outline);
                    //add score
                    this.score++;
                    //Play positive feedback
                    this.playFeedbackAndContinue(true);
                } else {
                    //wrong: reduce score, play negative feedback and continue game
                    this.score--;
                    this.playFeedbackAndContinue(false);
                }
            } else {
                //TODO inform user that there is a sound playing and that he needs to wait!
                this.stage.addChild(this.speaker);
                this.speaker.alpha = 0.2;
                createjs.Tween.get(this.speaker).to({alpha: 0.8}, 300).to({alpha: 0}, 300);
            }
        },
        playFeedbackAndContinue: function(isPositiveFB) {
            this.setSoundPlaying(null, true);
            var randomFBNum = Math.round(Math.random() * 2);
            var feedbackSound;
            var prefix;
            if (isPositiveFB) {
                prefix = "pos";
                this.levelProxy = createjs.proxy(this.playRandomSound, this);
            } else {
                prefix = "neg";
                this.levelProxy = createjs.proxy(this.replayLastSound, this);
            }
            feedbackSound = createjs.Sound.play(prefix + randomFBNum + FEEDBACK_SUFFIX);
            feedbackSound.addEventListener("complete", this.levelProxy);
        },
        playItemRelatedFeedback: function(itemId) {
            this.setSoundPlaying(null, true);
            this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
            var feedbackSound = createjs.Sound.play("conf_" + itemId + "_snd");
            feedbackSound.addEventListener("complete", this.levelProxy);
        },
        playRandomSound: function() {
            if (this.levelSoundIds.length > 0) {
                var randomIndex = Math.floor(Math.random() * this.levelSoundIds.length);
                var randomSoundId = this.levelSoundIds[randomIndex];
                this.playedSoundIds.push(randomSoundId);
                //remove played sound to prevent from being selected again -> TODO remove it on sound play completion to be sure it DID play once
                this.levelSoundIds.splice(randomIndex, 1);
                var newSound = createjs.Sound.play(randomSoundId);

                this.setSoundPlaying(null, false); // do not wait for sound to complete, allow the child to click quickly on the item...if it is clear directly which item it is..
                //LEAVE THIS COMMENTED IN CASE OF NEEDING IT BACK AFTER USABLITIY TEST; I STILL DOUBT if this behaviour is good or not
//                this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
//                newSound.addEventListener("complete", this.levelProxy);
            } else {
                //game finished, play conclusion and launch next level 
                this.manageLevelEnd();
            }
        },
        replayLastSound: function() {
            var lastSound = createjs.Sound.play(this.playedSoundIds[this.playedSoundIds.length - 1]);
            this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
            lastSound.addEventListener("complete", this.levelProxy);
        },
        setSoundPlaying: function(event, val) { //event param needed because of proxy but not used
            this.soundPlaying = val;
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
                var container = new createjs.Container();
                container.addChild(item);
                if (this.level.interaction === InteractionTypeEnum.GUIDEE) {
                    this.levelProxy = createjs.proxy(this.handleGuidedInteraction, this, entry.id);
                    item.addEventListener("pressup", this.levelProxy)
                } else {
                    this.levelProxy = createjs.proxy(this.handleStartDrag, this);
                    item.addEventListener("mousedown", this.levelProxy);
                    this.levelProxy = createjs.proxy(this.handleDrag, this, entry.id);
                    container.addEventListener("pressmove", this.levelProxy);
                    this.levelProxy = createjs.proxy(this.handleOrderedInteraction, this, entry.id);
                    item.addEventListener("pressup", this.levelProxy);
                }

                this.stage.addChild(container);
                i++;
                entry = this.fileManifest[i];
            }
            ;
        },
        handleStartDrag: function(evt) {
            var ct = evt.currentTarget;
            local = ct.globalToLocal(evt.stageX, evt.stageY);
            nx = ct.regX - local.x;
            ny = ct.regY - local.y;
            //set the new regX/Y
            ct.regX = local.x;
            ct.regY = local.y;
            //adjust the real-position, otherwise the new regX/Y would cause a jump
            ct.x -= nx;
            ct.y -= ny;
        },
        handleDrag: function(event) {
            event.target.x = (event.stageX - this.stage.x) / this.stage.scaleX;  
            event.target.y = event.stageY / this.stage.scaleY; 
        },
        manageLevelEnd: function() {
            //set the score for this level
            this.stage.removeAllEventListeners();
            this.updateLevelScore(this.level, this.score);
            var nextLevel = Utils.getNextDirectLevel(this.level.id);

            var score = new Moulin.Score(this.level, nextLevel, this.stage, this.score);
            var conclusion = createjs.Sound.play(this.level.theme + "_conclusion_fb");

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

            if (Utils.supportsLocalStorage()) {
                localStorage["moulin.scores"] = JSON.stringify(userScore);
            }

        }
    };
    Moulin.Level = Level;
}());



