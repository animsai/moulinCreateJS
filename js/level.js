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
        levelOutlines: null,
        soundPlaying: false,
        initialize: function(level, stage) {
            //init internal variables
            this.fileManifest = eval(level.media);
            this.level = level;
            this.stage = stage;
            this.playedSoundIds = new Array();
            this.levelSoundIds = new Array();
            this.levelOutlines = new Array();
            this.soundPlaying = false;
            //split file manifest after it's loaded in order to have an array for each type of objects
            this.splitFiles();
            this.createLevel();
            return this;
        },
        //utility function to separate filemanifest for easier access to files
        splitFiles: function() {
            var sndMatch = new RegExp(SOUND_SUFFIX, "g");
            var outlineMatch = new RegExp(OUTLINE_SUFFIX, "g");
            var sceneMatch = new RegExp(SCENE_ID, "g");
            var fbMatch = new RegExp(FEEDBACK_SUFFIX, "g");
            for (i = 0; i < this.fileManifest.length; i++) {
                var file = this.fileManifest[i];
                if (file.id.match(sndMatch) !== null) {
                    this.levelSoundIds.push(file.id);
                } else if (file.id.match(outlineMatch) !== null && file.id.match(sceneMatch) === null && file.id.match(fbMatch) === null) {
                    this.levelOutlines.push(file.id);
                }
            }
        },
        createLevel: function() {
            //adding the background image
            background = new createjs.Bitmap(this.fileManifest[0].src);
            this.stage.addChild(background);

            //add back button
            Utils.addBackButton(this.stage, this.level.theme, false);

            //play instruction sentence
            this.playInstructions();

            //add interaction items
            this.addGameItems();
        },
                /***
         * adds the game items to the scene
         * the function adds the clickable (interactive) items and their outlines (if any)
         * the outlines are hidden in the first place and are shown once the user clicks on the right interactive item
         */
        addGameItems: function() {
            var i = 1; // background is already added
            var entry = this.fileManifest[i];
            //add images and manage click event, starting at index 1 cause first index is the background already added
            var outlineMatch = new RegExp(OUTLINE_SUFFIX, "g");
            while (i < this.fileManifest.length && entry.type === "image") {
                if (entry.id.match(outlineMatch) === null) { //add interactive items
                    var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1400, true);
                } else { //add outlines to stage and hide them to make them appear later during the game
                    var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1, false);
                    item.visible = false;
                }
                //set an item name to be able to retrieve it later directly within the stage.getChildByName function
                item.name = entry.id;

                if (this.level.interaction === InteractionTypeEnum.GUIDED) {
                    this.levelProxy = createjs.proxy(this.handleGuidedInteraction, this, entry.id);
                    item.addEventListener("pressup", this.levelProxy)
                } else if (this.level.interaction === InteractionTypeEnum.FREEDRAG) {
                    this.levelProxy = createjs.proxy(this.handleStartDrag, this, entry.id);
                    item.addEventListener("mousedown", this.levelProxy);
                    this.levelProxy = createjs.proxy(this.handleDrag, this, entry.id);
                    item.addEventListener("pressmove", this.levelProxy);
                    this.levelProxy = createjs.proxy(this.handlePressup, this, entry.id);
                    item.addEventListener("pressup", this.levelProxy);
                }

                this.stage.addChild(item);
                i++;
                entry = this.fileManifest[i];
            }
            ;
        },
        //manage playing of instruction sound and its completion callback
        playInstructions: function() {
            //play instruction sentence
            var consigneSound = createjs.Sound.play("consignes_" + this.level.id);
            this.setSoundPlaying(null, true);
            this.levelProxy = createjs.proxy(this.playFirstSound, this, false);
            consigneSound.addEventListener("complete", this.levelProxy);
        },
        //play the first sound of the level once the instruction sound is finished palying
        playFirstSound: function() {
            if (this.level.interaction === InteractionTypeEnum.GUIDED) {
                //in case of guided levels, the first sound played is already a random sound for a clickable item
                this.playRandomSound();
            } else if (this.level.interaction === InteractionTypeEnum.FREEDRAG) {
                //in the FREEDRAG levels, the first instruction is followed by another precise instruction since there is no guidance
                var consignesSubSound = createjs.Sound.play("consignes_sub_" + this.level.id);
                this.setSoundPlaying(null, true);
                this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
                consignesSubSound.addEventListener("complete", this.levelProxy);
            }
        },
        //get a given item from the current file manifest
        getItemFromManifest: function(itemId) {
            var i = 0;
            var itemIndex = -1;
            while (i < this.fileManifest.length && itemIndex === -1) {
                if (this.fileManifest[i].id === itemId) {
                    itemIndex = i;
                }
                i++;
            }
            return this.fileManifest[itemIndex];
        },
        handlePressup: function(event, itemId) {
            if (this.isCorrectAnswer(event, itemId)) {
                this.manageCorrectAnswer(event, itemId);
            } else {
                this.manageWrongAnswer(event, itemId);
            }
        },
        handleStartDrag: function(evt, itemId) {
            if (this.soundPlaying === false) {
                this.playItemSound(itemId, false);
                /**************************/
                //this code was found here : http://stackoverflow.com/questions/22829143/easeljs-glitchy-drag-drop
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
                /*************************************/
            } else {
                Utils.manageSpeaker(this.stage);
            }
        },
        handleDrag: function(event) {
            event.target.x = (event.stageX - this.stage.x) / this.stage.scaleX;
            event.target.y = event.stageY / this.stage.scaleY;
        },
        handleGuidedInteraction: function(event, itemId) {
            if (this.soundPlaying === false) {
                this.handlePressup(event, itemId);
            } else {
                Utils.manageSpeaker(this.stage);
            }
        },
        manageWrongAnswer: function(event, itemId) {
            //reduce score
            this.score--;
            if (this.level.interaction === InteractionTypeEnum.GUIDED) {
                // play negative feedback and continue game
                this.playFeedbackAndContinue(itemId, false);
            }
            else if (this.level.interaction === InteractionTypeEnum.FREEDRAG) {
                //move back the dragged item to its initial position 
                var originItem = this.getItemFromManifest(itemId);
                event.target.regX = 0;
                event.target.regY = 0;
                createjs.Tween.get(event.target).to({x: originItem.x, y: originItem.y}, 400, createjs.Ease.linear);
            }
        },
        manageCorrectAnswer: function(event, itemId) {
            var clickedItem = event.target;
            var outlineItem = this.getItemFromManifest(itemId + OUTLINE_SUFFIX);
            //remove clicked item, display outline on stage, update score and play positive feedback
            clickedItem.removeEventListener("pressup", this.levelProxy);

            //make the item dissapear gently with tween effect
            var localThis = this;
            createjs.Tween.get(clickedItem).to({alpha: 0}, 1000).call(function() {
                localThis.stage.removeChild(clickedItem);
            });

            //var outline = Utils.generateBitmapItem(outlineItem.src, outlineItem.x, outlineItem.y, 1400, false);
            var outline = this.stage.getChildByName(outlineItem.id);
            outline.alpha = 0;
            outline.visible = true;
            createjs.Tween.get(outline).to({alpha: 1}, 1000);

            this.levelOutlines.splice(this.levelOutlines.indexOf(outlineItem.id), 1);

            //add score
            this.score++;

            //Play positive feedback
            this.playFeedbackAndContinue(itemId, true);
        },
        isCorrectAnswer: function(event, itemId) {
            if (this.level.interaction === InteractionTypeEnum.GUIDED) {
                var lastPlayedSound = this.playedSoundIds[this.playedSoundIds.length - 1]
                return (itemId + SOUND_SUFFIX === lastPlayedSound);
            } else if (this.level.interaction === InteractionTypeEnum.FREEDRAG) {
                var outlineItem = this.getItemFromManifest(itemId + OUTLINE_SUFFIX);
                return this.isRightDropPosition(event.target, outlineItem);
            }
            return false;
        },
        isRightDropPosition: function(draggedItem, dropOutline) {
            if (dropOutline.x - draggedItem.x > draggedItem.image.width) {
                return false;
            }
            if (dropOutline.y - draggedItem.y > draggedItem.image.height) {
                return false;
            }
            return true;

        },
        playFeedbackAndContinue: function(itemId, isPositiveFB) {
            this.setSoundPlaying(null, true);
            var soundId = "";
            var feedbackSound;
            if (this.level.interaction === InteractionTypeEnum.GUIDED) {
                var randomFBNum = Math.round(Math.random() * 2);
                soundId = randomFBNum + FEEDBACK_SUFFIX;
                if (isPositiveFB) {
                    soundId = "pos" + soundId;
                    this.levelProxy = createjs.proxy(this.playRandomSound, this);
                } else {
                    soundId = "neg" + soundId;
                    this.levelProxy = createjs.proxy(this.replayLastSound, this);
                }
            } else if (this.level.interaction === InteractionTypeEnum.FREEDRAG) {
                soundId = "conf_" + itemId + "_snd";
                this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
            }

            //in any type of interaction, if the level is finished then we manage the level end after last feedback sentence
            if (this.levelOutlines.length === 0) { //level finished
                this.levelProxy = createjs.proxy(this.manageLevelEnd, this);
            }

            feedbackSound = createjs.Sound.play(soundId);
            feedbackSound.addEventListener("complete", this.levelProxy);
        },
        playItemSound: function(itemId) {
            this.setSoundPlaying(null, true);
            this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
            var itemSound = createjs.Sound.play(itemId + "_snd");
            itemSound.addEventListener("complete", this.levelProxy);
        },
        playRandomSound: function() {
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
        },
        replayLastSound: function() {
            var lastSound = createjs.Sound.play(this.playedSoundIds[this.playedSoundIds.length - 1]);
            this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
            lastSound.addEventListener("complete", this.levelProxy);
        },
        setSoundPlaying: function(event, val) { //event param needed because of proxy but not used
            this.soundPlaying = val;
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



