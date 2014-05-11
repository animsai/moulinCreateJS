/* 
 * Manages a level of type Free Drag n drop, meaning that the child chooses which item she/he puts on the scene
 * Inherits of the main Level class to reuse the main common functionnalities
 * Author : J. Travnjak
 * Date : may 2014
 */
(function() {
    function LevelDragFree(level, stage) {
        this.initialize(level, stage);
    }

    LevelDragFree.prototype = new Moulin.Level();

    LevelDragFree.prototype.level_initialize = LevelDragFree.prototype.initialize;
    LevelDragFree.prototype.initialize = function(level, stage) {
        return LevelDragFree.prototype.level_initialize(level, stage);
    };
    LevelDragFree.prototype.level_splitFiles = LevelDragFree.prototype.splitFiles;
    LevelDragFree.prototype.splitFiles = function() {
        LevelDragFree.prototype.level_splitFiles();
    };
    LevelDragFree.prototype.level_createLevel = LevelDragFree.prototype.createLevel;
    LevelDragFree.prototype.createLevel = function() {
        LevelDragFree.prototype.level_createLevel();
    };
    LevelDragFree.prototype.level_addRepeatButton = LevelDragFree.prototype.addRepeatButton;
    LevelDragFree.prototype.addRepeatButton = function() {
        LevelDragFree.prototype.level_addRepeatButton();
    };
    /***
     * adds the game items to the scene
     * the function adds the clickable (interactive) items and their outlines (if any)
     * the outlines are hidden in the first place and are shown once the user clicks on the right interactive item
     */
    LevelDragFree.prototype.addGameItems = function() {
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
            this.levelProxy = createjs.proxy(this.handlePressup, this, entry.id);
            item.addEventListener("pressup", this.levelProxy);

            this.stage.addChild(item);
            i++;
            entry = this.fileManifest[i];
        }
        ;
    };
    //manage playing of instruction sound and its completion callback
    LevelDragFree.prototype.playInstructions = function() {
        //play instruction sentence
        var consigneSound = createjs.Sound.play("consignes_" + this.level.id);
        this.setSoundPlaying(null, true);
        this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);
        consigneSound.addEventListener("complete", this.levelProxy);
    };
    LevelDragFree.prototype.level_getItemFromManifest = LevelDragFree.prototype.getItemFromManifest;
    LevelDragFree.prototype.getItemFromManifest = function(itemId) {
        return LevelDragFree.prototype.level_getItemFromManifest(itemId);
    };
    LevelDragFree.prototype.handlePressup = function(event, itemId) {
        if (this.isDragged === true) {
            if (this.isCorrectAnswer(event, itemId)) {
                this.manageCorrectAnswer(event, itemId);
            } else {
                this.manageWrongAnswer(event, itemId);
            }
            this.isDragged = false;
        }
    };
    LevelDragFree.prototype.handleStartDrag = function(evt, itemId) {
        this.isDragged = false;
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
    };
    LevelDragFree.prototype.handleDrag = function(event) {
        event.target.x = (event.stageX - this.stage.x) / this.stage.scaleX;
        event.target.y = event.stageY / this.stage.scaleY;
        this.isDragged = true;
    };

    LevelDragFree.prototype.manageWrongAnswer = function(event, itemId) {
        if (this.isDragged) {
            //reduce score
            this.score--;
            //move back the dragged item to its initial position 
            var originItem = this.getItemFromManifest(itemId);
            event.target.regX = 0;
            event.target.regY = 0;
            createjs.Tween.get(event.target).to({x: originItem.x, y: originItem.y}, 400, createjs.Ease.linear);
        }
    };
    LevelDragFree.prototype.level_manageCorrectAnswer = LevelDragFree.prototype.manageCorrectAnswer;
    LevelDragFree.prototype.manageCorrectAnswer = function(event, itemId) {
        LevelDragFree.prototype.level_manageCorrectAnswer(event, itemId);
    };
    LevelDragFree.prototype.isCorrectAnswer = function(event, itemId) {
        var outlineItem = this.getItemFromManifest(itemId + OUTLINE_SUFFIX);
        return this.isRightDropPosition(event.target, outlineItem);
    };
    LevelDragFree.prototype.level_isRightDropPosition = LevelDragFree.prototype.isRightDropPosition;
    LevelDragFree.prototype.isRightDropPosition = function(draggedItem, dropOutline) {
        return LevelDragFree.prototype.level_isRightDropPosition(draggedItem, dropOutline);
    };
    LevelDragFree.prototype.playFeedbackAndContinue = function(itemId, isPositiveFB) {
        this.setSoundPlaying(null, true);
        var soundId = "conf_" + itemId + "_snd";
        var feedbackSound;
        this.levelProxy = createjs.proxy(this.setSoundPlaying, this, false);

        //in any type of interaction, if the level is finished then we manage the level end after last feedback sentence
        if (this.levelImages.length === 0) { //level finished
            this.levelProxy = createjs.proxy(this.manageLevelEnd, this);
        }

        feedbackSound = createjs.Sound.play(soundId);
        feedbackSound.addEventListener("complete", this.levelProxy);
    };
    LevelDragFree.prototype.level_setSoundPlaying = LevelDragFree.prototype.setSoundPlaying;
    LevelDragFree.prototype.setSoundPlaying = function(event, val) { //event param needed because of proxy but not used
        LevelDragFree.prototype.level_setSoundPlaying(event, val);
    };
    LevelDragFree.prototype.level_manageLevelEnd = LevelDragFree.prototype.manageLevelEnd;
    LevelDragFree.prototype.manageLevelEnd = function() {
        LevelDragFree.prototype.level_manageLevelEnd();
    };
    LevelDragFree.prototype.level_updateLevelScore = LevelDragFree.prototype.updateLevelScore;
    LevelDragFree.prototype.updateLevelScore = function(level, score) {
        LevelDragFree.prototype.level_updateLevelScore(level, score);
    };
    LevelDragFree.prototype.level_loadNextLevelSilently = LevelDragFree.prototype.loadNextLevelSilently;
    LevelDragFree.prototype.loadNextLevelSilently = function() {
        LevelDragFree.prototype.level_loadNextLevelSilently();
    };
    LevelDragFree.prototype.level_handleNextLevelLoadCompletion = LevelDragFree.prototype.handleNextLevelLoadCompletion;
    LevelDragFree.prototype.handleNextLevelLoadCompletion = function(event, nextLevel) {
        LevelDragFree.prototype.level_handleNextLevelLoadCompletion(event, nextLevel);
        //game.loadedLevels.push(nextLevel.id);
    };
    LevelDragFree.prototype.level_manageLevelLoadifNeeded = LevelDragFree.prototype.manageLevelLoadifNeeded;
    LevelDragFree.prototype.manageLevelLoadifNeeded = function() {
        LevelDragFree.prototype.level_manageLevelLoadifNeeded();
    };
    LevelDragFree.prototype.level_handleLevelLoadCompletion = LevelDragFree.prototype.handleLevelLoadCompletion;
    LevelDragFree.prototype.handleLevelLoadCompletion = function(event, level) {
        LevelDragFree.prototype.level_handleLevelLoadCompletion(event, level);
    };
    LevelDragFree.prototype.level_handleLevelLoadProgress = LevelDragFree.prototype.handleLevelLoadProgress;
    LevelDragFree.prototype.handleLevelLoadProgress = function(event, loadingBar, assets) {
        LevelDragFree.prototype.level_handleLevelLoadProgress(event, loadingBar, assets);
    };
    Moulin.LevelDragFree = LevelDragFree;
}());



