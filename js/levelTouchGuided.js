/* 
 * Manages a level of type Guided Drag n drop, meaning that the voice tells which item to
 * drag on the scene
 * Inherits of the main Level class to reuse the main common functionnalities
 * Author : J. Travnjak
 * Date : may 2014
 */
(function() {
    function LevelTouchGuided(level, stage) {
        this.initialize(level, stage);
    }
    LevelTouchGuided.prototype = new Moulin.Level();

    LevelTouchGuided.prototype.level_initialize = LevelTouchGuided.prototype.initialize;
    LevelTouchGuided.prototype.initialize = function(level, stage) {
        return LevelTouchGuided.prototype.level_initialize(level, stage);
    };
    LevelTouchGuided.prototype.level_splitFiles = LevelTouchGuided.prototype.splitFiles;
    LevelTouchGuided.prototype.splitFiles = function() {
        LevelTouchGuided.prototype.level_splitFiles();
    };
    LevelTouchGuided.prototype.level_createLevel = LevelTouchGuided.prototype.createLevel;
    LevelTouchGuided.prototype.createLevel = function() {
        LevelTouchGuided.prototype.level_createLevel();
    };
    LevelTouchGuided.prototype.level_addRepeatButton = LevelTouchGuided.prototype.addRepeatButton;
    LevelTouchGuided.prototype.addRepeatButton = function() {
        LevelTouchGuided.prototype.level_addRepeatButton();
    };
    /***
     * adds the game items to the scene
     * the function adds the clickable (interactive) items and their outlines (if any)
     * the outlines are hidden in the first place and are shown once the user clicks on the right interactive item
     */
    LevelTouchGuided.prototype.addGameItems = function() {
        var i = 1; // background is already added
        var entry = this.fileManifest[i];
        //add images and manage click event, starting at index 1 cause first index is the background already added
        var outlineMatch = new RegExp(OUTLINE_SUFFIX, "g");
        while (i < this.fileManifest.length && entry.type === "image") {
            if (entry.id.match(outlineMatch) === null) { //add interactive items
                var shadow = this.levelOutlines.length > 0 ? true : false;
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1400, shadow);
                this.levelProxy = createjs.proxy(this.handleGuidedInteraction, this, entry.id);
                item.addEventListener("pressup", this.levelProxy)

                var hit = new createjs.Shape();
                if (entry.width !== undefined) { //manage hitarea for small objects, add 25 % error margin
                    var clickableW = entry.width * 1.5;
                    var clickableH = entry.height * 1.5;
                    hit.graphics.beginFill("#000").drawRect(0 - (clickableW - entry.width) / 2, 0 - (clickableH - entry.height) / 2, clickableW, clickableH);
                    item.hitArea = hit;
                }

            } else { //add outlines to stage and hide them to make them appear later during the game
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 1, false);
                item.visible = false;
            }
            //set an item name to be able to retrieve it later directly within the stage.getChildByName function
            item.name = entry.id;


            this.stage.addChild(item);

            i++;
            entry = this.fileManifest[i];
        }
        ;
    };
    //manage playing of instruction sound and its completion callback
    LevelTouchGuided.prototype.playInstructions = function() {
        //play instruction sentence
        var consigneSound = createjs.Sound.play("consignes_" + this.level.id);
        this.setSoundPlaying(null, true);
        this.levelProxy = createjs.proxy(this.playRandomSound, this, false);
        consigneSound.addEventListener("complete", this.levelProxy);
    };
    LevelTouchGuided.prototype.level_getItemFromManifest = LevelTouchGuided.prototype.getItemFromManifest;
    LevelTouchGuided.prototype.getItemFromManifest = function(itemId) {
        return LevelTouchGuided.prototype.level_getItemFromManifest(itemId);
    };
    LevelTouchGuided.prototype.level_handlePressup = LevelTouchGuided.prototype.handlePressup;
    LevelTouchGuided.prototype.handlePressup = function(event, itemId) {
        LevelTouchGuided.prototype.level_handlePressup(event, itemId);
    };

    LevelTouchGuided.prototype.level_handleGuidedInteraction = LevelTouchGuided.prototype.handleGuidedInteraction;
    LevelTouchGuided.prototype.handleGuidedInteraction = function(event, itemId) {
        LevelTouchGuided.prototype.level_handleGuidedInteraction(event, itemId);
    };
    LevelTouchGuided.prototype.manageWrongAnswer = function(event, itemId) {
        this.score--;
        // play negative feedback and continue game
        this.playFeedbackAndContinue(itemId, false);
    };
    LevelTouchGuided.prototype.level_manageCorrectAnswer = LevelTouchGuided.prototype.manageCorrectAnswer;
    LevelTouchGuided.prototype.manageCorrectAnswer = function(event, itemId) {
        LevelTouchGuided.prototype.level_manageCorrectAnswer(event, itemId);
    };
    LevelTouchGuided.prototype.isCorrectAnswer = function(event, itemId) {
        var lastPlayedSound = this.playedSoundIds[this.playedSoundIds.length - 1]
        return (itemId + SOUND_SUFFIX === lastPlayedSound);
    };
    LevelTouchGuided.prototype.level_playFeedbackAndContinue = LevelTouchGuided.prototype.playFeedbackAndContinue;
    LevelTouchGuided.prototype.playFeedbackAndContinue = function(itemId, isPositiveFB) {
        LevelTouchGuided.prototype.level_playFeedbackAndContinue(itemId, isPositiveFB);
    };
    LevelTouchGuided.prototype.level_playRandomSound = LevelTouchGuided.prototype.playRandomSound;
    LevelTouchGuided.prototype.playRandomSound = function() {
        LevelTouchGuided.prototype.level_playRandomSound();
    };
    LevelTouchGuided.prototype.level_replayLastSound = LevelTouchGuided.prototype.replayLastSound;
    LevelTouchGuided.prototype.replayLastSound = function() {
        LevelTouchGuided.prototype.level_replayLastSound();
    };
    LevelTouchGuided.prototype.level_setSoundPlaying = LevelTouchGuided.prototype.setSoundPlaying;
    LevelTouchGuided.prototype.setSoundPlaying = function(event, val) { //event param needed because of proxy but not used
        LevelTouchGuided.prototype.level_setSoundPlaying(event, val);
    };
    LevelTouchGuided.prototype.level_manageLevelEnd = LevelTouchGuided.prototype.manageLevelEnd;
    LevelTouchGuided.prototype.manageLevelEnd = function() {
        LevelTouchGuided.prototype.level_manageLevelEnd();
    };
    LevelTouchGuided.prototype.level_updateLevelScore = LevelTouchGuided.prototype.updateLevelScore;
    LevelTouchGuided.prototype.updateLevelScore = function(level, score) {
        LevelTouchGuided.prototype.level_updateLevelScore(level, score);
    };
    LevelTouchGuided.prototype.level_loadNextLevelSilently = LevelTouchGuided.prototype.loadNextLevelSilently;
    LevelTouchGuided.prototype.loadNextLevelSilently = function() {
        LevelTouchGuided.prototype.level_loadNextLevelSilently();
    };
    LevelTouchGuided.prototype.level_handleNextLevelLoadCompletion = LevelTouchGuided.prototype.handleNextLevelLoadCompletion;
    LevelTouchGuided.prototype.handleNextLevelLoadCompletion = function(event, nextLevel) {
        LevelTouchGuided.prototype.level_handleNextLevelLoadCompletion(event, nextLevel);
        //game.loadedLevels.push(nextLevel.id);
    };
    LevelTouchGuided.prototype.level_manageLevelLoadifNeeded = LevelTouchGuided.prototype.manageLevelLoadifNeeded;
    LevelTouchGuided.prototype.manageLevelLoadifNeeded = function() {
        LevelTouchGuided.prototype.level_manageLevelLoadifNeeded();
    };
    LevelTouchGuided.prototype.level_handleLevelLoadCompletion = LevelTouchGuided.prototype.handleLevelLoadCompletion;
    LevelTouchGuided.prototype.handleLevelLoadCompletion = function(event, level) {
        LevelTouchGuided.prototype.level_handleLevelLoadCompletion(event, level);
    };
    LevelTouchGuided.prototype.level_handleLevelLoadProgress = LevelTouchGuided.prototype.handleLevelLoadProgress;
    LevelTouchGuided.prototype.handleLevelLoadProgress = function(event, loadingBar, assets) {
        LevelTouchGuided.prototype.level_handleLevelLoadProgress(event, loadingBar, assets);
    };
    Moulin.LevelTouchGuided = LevelTouchGuided;
}());



