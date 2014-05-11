/* 
 * Manages a level of type Guided Drag n drop, meaning that the voice tells which item to
 * drag on the scene
 * Inherits of the main Level class to reuse the main common functionnalities
 * Author : J. Travnjak
 * Date : may 2014
 */
(function() {
    function LevelDragGuided(level, stage) {
        this.initialize(level, stage);
    }

    LevelDragGuided.prototype = new Moulin.Level();

    LevelDragGuided.prototype.level_initialize = LevelDragGuided.prototype.initialize;
    LevelDragGuided.prototype.initialize = function(level, stage) {
        return LevelDragGuided.prototype.level_initialize(level, stage);
    };
    LevelDragGuided.prototype.level_splitFiles = LevelDragGuided.prototype.splitFiles;
    LevelDragGuided.prototype.splitFiles = function() {
        LevelDragGuided.prototype.level_splitFiles();
    };
    LevelDragGuided.prototype.level_createLevel = LevelDragGuided.prototype.createLevel;
    LevelDragGuided.prototype.createLevel = function() {
        LevelDragGuided.prototype.level_createLevel();
    };
    LevelDragGuided.prototype.level_addRepeatButton = LevelDragGuided.prototype.addRepeatButton;
    LevelDragGuided.prototype.addRepeatButton = function() {
        LevelDragGuided.prototype.level_addRepeatButton();
    };
    /***
     * adds the game items to the scene
     * the function adds the clickable (interactive) items and their outlines (if any)
     * the outlines are hidden in the first place and are shown once the user clicks on the right interactive item
     */
    LevelDragGuided.prototype.addGameItems = function() {
        var i = 1; // background is already added
        var entry = this.fileManifest[i];
        //add images and manage click event, starting at index 1 cause first index is the background already added
        var outlineMatch = new RegExp(OUTLINE_SUFFIX, "g");
        while (i < this.fileManifest.length && entry.type === "image") {
            if (entry.id.match(outlineMatch) === null) { //add interactive items
                var shadow = this.levelOutlines.length > 0 ? true : false;
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1400, shadow);
            } else { //add outlines to stage and hide them to make them appear later during the game
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1, false);
                item.visible = false;
            }
            //set an item name to be able to retrieve it later directly within the stage.getChildByName function
            item.name = entry.id;

            this.levelProxy = createjs.proxy(this.handleStartDrag, this, entry.id);
            item.addEventListener("mousedown", this.levelProxy);
            this.levelProxy = createjs.proxy(this.handleDrag, this, entry.id);
            item.addEventListener("pressmove", this.levelProxy);
            this.levelProxy = createjs.proxy(this.handleGuidedInteraction, this, entry.id);
            item.addEventListener("pressup", this.levelProxy);

            this.stage.addChild(item);
            i++;
            entry = this.fileManifest[i];
        }
        ;
    };
    //manage playing of instruction sound and its completion callback
    LevelDragGuided.prototype.playInstructions = function() {
        //play instruction sentence
        var consigneSound = createjs.Sound.play("consignes_" + this.level.id);
        this.setSoundPlaying(null, true);
        this.levelProxy = createjs.proxy(this.playRandomSound, this, false);
        consigneSound.addEventListener("complete", this.levelProxy);
    };
    LevelDragGuided.prototype.level_getItemFromManifest = LevelDragGuided.prototype.getItemFromManifest;
    //get a given item from the current file manifest
    LevelDragGuided.prototype.getItemFromManifest = function(itemId) {
        return LevelDragGuided.prototype.level_getItemFromManifest(itemId);
    };
    LevelDragGuided.prototype.handlePressup = function(event, itemId) {
        if (this.isDragged === true) {
            if (this.isCorrectAnswer(event, itemId)) {
                this.manageCorrectAnswer(event, itemId);
            } else {
                this.manageWrongAnswer(event, itemId);
            }
            this.isDragged = false;
        }
    };
    LevelDragGuided.prototype.handleStartDrag = function(evt, itemId) {
        this.isDragged = false;
        if (this.soundPlaying === false) {
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
    };
    LevelDragGuided.prototype.handleDrag = function(event) {
        if (this.soundPlaying === false) {
            event.target.x = (event.stageX - this.stage.x) / this.stage.scaleX;
            event.target.y = event.stageY / this.stage.scaleY;
            this.isDragged = true;
        }
    };
    LevelDragGuided.prototype.level_handleGuidedInteraction = LevelDragGuided.prototype.handleGuidedInteraction;
    LevelDragGuided.prototype.handleGuidedInteraction = function(event, itemId) {
        LevelDragGuided.prototype.level_handleGuidedInteraction(event, itemId);
    };
    LevelDragGuided.prototype.manageWrongAnswer = function(event, itemId) {
        if (this.isDragged) {
            this.score--;
            // play negative feedback and continue game
            this.playFeedbackAndContinue(itemId, false);
            //move back the dragged item to its initial position 
            var originItem = this.getItemFromManifest(itemId);
            event.target.regX = 0;
            event.target.regY = 0;
            createjs.Tween.get(event.target).to({x: originItem.x, y: originItem.y}, 400, createjs.Ease.linear);
        }
    };
    LevelDragGuided.prototype.level_manageCorrectAnswer = LevelDragGuided.prototype.manageCorrectAnswer;
    LevelDragGuided.prototype.manageCorrectAnswer = function(event, itemId) {
        LevelDragGuided.prototype.level_manageCorrectAnswer(event, itemId);
    };
    LevelDragGuided.prototype.isCorrectAnswer = function(event, itemId) {
        var lastPlayedSound = this.playedSoundIds[this.playedSoundIds.length - 1]
        var outlineItem = this.getItemFromManifest(itemId + OUTLINE_SUFFIX);
        console.log("isCorrectANswer " + itemId + " " + outlineItem.id + " " + lastPlayedSound);
        return itemId + SOUND_SUFFIX === lastPlayedSound && this.isRightDropPosition(event.target, outlineItem);
    };
    LevelDragGuided.prototype.level_isRightDropPosition = LevelDragGuided.prototype.isRightDropPosition;
    LevelDragGuided.prototype.isRightDropPosition = function(draggedItem, dropOutline) {
        return LevelDragGuided.prototype.level_isRightDropPosition(draggedItem, dropOutline);
    };
    LevelDragGuided.prototype.level_playFeedbackAndContinue = LevelDragGuided.prototype.playFeedbackAndContinue ;
    LevelDragGuided.prototype.playFeedbackAndContinue = function(itemId, isPositiveFB) {
        LevelDragGuided.prototype.level_playFeedbackAndContinue(itemId, isPositiveFB);
//        this.setSoundPlaying(null, true);
//        var soundId = "";
//        var feedbackSound;
//        var randomFBNum = Math.round(Math.random() * 2);
//        soundId = randomFBNum + FEEDBACK_SUFFIX;
//        if (isPositiveFB) {
//            soundId = "pos" + soundId;
//            this.levelProxy = createjs.proxy(this.playRandomSound, this);
//        } else {
//            soundId = "neg" + soundId;
//            this.levelProxy = createjs.proxy(this.replayLastSound, this);
//        }
//
//        //in any type of interaction, if the level is finished then we manage the level end after last feedback sentence
//        if (this.levelImages.length === 0) { //level finished
//            this.levelProxy = createjs.proxy(this.manageLevelEnd, this);
//        }
//
//        feedbackSound = createjs.Sound.play(soundId);
//        feedbackSound.addEventListener("complete", this.levelProxy);
    };
    LevelDragGuided.prototype.level_playRandomSound = LevelDragGuided.prototype.playRandomSound;
    LevelDragGuided.prototype.playRandomSound = function() {
        LevelDragGuided.prototype.level_playRandomSound();
    };
    LevelDragGuided.prototype.level_replayLastSound = LevelDragGuided.prototype.replayLastSound;
    LevelDragGuided.prototype.replayLastSound = function() {
        LevelDragGuided.prototype.level_replayLastSound();
    };
    LevelDragGuided.prototype.level_setSoundPlaying = LevelDragGuided.prototype.setSoundPlaying;
    LevelDragGuided.prototype.setSoundPlaying = function(event, val) { //event param needed because of proxy but not used
        LevelDragGuided.prototype.level_setSoundPlaying(event, val);
    };
    LevelDragGuided.prototype.level_manageLevelEnd = LevelDragGuided.prototype.manageLevelEnd;
    LevelDragGuided.prototype.manageLevelEnd = function() {
        LevelDragGuided.prototype.level_manageLevelEnd();
    };
    LevelDragGuided.prototype.level_updateLevelScore = LevelDragGuided.prototype.updateLevelScore;
    LevelDragGuided.prototype.updateLevelScore = function(level, score) {
        LevelDragGuided.prototype.level_updateLevelScore(level, score);
    };
    LevelDragGuided.prototype.level_loadNextLevelSilently = LevelDragGuided.prototype.loadNextLevelSilently;
    LevelDragGuided.prototype.loadNextLevelSilently = function() {
        LevelDragGuided.prototype.level_loadNextLevelSilently();
    };
    LevelDragGuided.prototype.level_handleNextLevelLoadCompletion = LevelDragGuided.prototype.handleNextLevelLoadCompletion;
    LevelDragGuided.prototype.handleNextLevelLoadCompletion = function(event, nextLevel) {
        LevelDragGuided.prototype.level_handleNextLevelLoadCompletion(event, nextLevel);
        //game.loadedLevels.push(nextLevel.id);
    };
    LevelDragGuided.prototype.level_manageLevelLoadifNeeded = LevelDragGuided.prototype.manageLevelLoadifNeeded;
    LevelDragGuided.prototype.manageLevelLoadifNeeded = function() {
        LevelDragGuided.prototype.level_manageLevelLoadifNeeded();
    };
    LevelDragGuided.prototype.level_handleLevelLoadCompletion = LevelDragGuided.prototype.handleLevelLoadCompletion;
    LevelDragGuided.prototype.handleLevelLoadCompletion = function(event, level) {
        LevelDragGuided.prototype.level_handleLevelLoadCompletion(event, level);
    };
    LevelDragGuided.prototype.level_handleLevelLoadProgress = LevelDragGuided.prototype.handleLevelLoadProgress;
    LevelDragGuided.prototype.handleLevelLoadProgress = function(event, loadingBar, assets) {
        LevelDragGuided.prototype.level_handleLevelLoadProgress(event, loadingBar, assets);
    };
    Moulin.LevelDragGuided = LevelDragGuided;
}());



