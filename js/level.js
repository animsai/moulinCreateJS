(function() {
    function Level(fileManifest, imgPositions, stage, loadingBar, loadingBarText) {
        this.initialize(fileManifest, imgPositions, stage, loadingBar, loadingBarText);
    }

    Level.prototype = {
        fileManifest: null,
        levelQueue: null,
        imgPositions: null,
        stage: null,
        bar: null,
        loadingBarText: null,
        levelProxy: null,
        playedSoundIds: null,
        levelSoundIds: null,
        levelImages: null,
        levelOutlines: null, //TODO check if needed, for now not used
        initialize: function(fileManifest, imgPositions, stage, loadingBar, loadingBarText) {
            //init internal variables
            this.fileManifest = fileManifest;
            this.imgPositions = imgPositions;
            this.bar = loadingBar;
            this.stage = stage;
            this.loadingBarText = loadingBarText;
            this.playedSoundIds = new Array();
            this.levelSoundIds = new Array();
            this.levelImages = new Array();
            this.levelOutlines = new Array();

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
                } else if (file.id.match(outlineMatch) === null && file.id.match(sceneMatch) === null && file.id.match(fbMatch) === null){
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
            this.levelProxy = createjs.proxy(this.handleClick, this);
            this.stage.addEventListener("click", this.levelProxy);
        },
        handleClick: function() {
            this.playLevel();
            this.stage.removeChild(this.loadingBarText, this.bar);
            this.stage.removeAllEventListeners("click");
        },
        playLevel: function() {
            //adding the background image
            background = new createjs.Bitmap(this.levelQueue.getResult("scene"));
            this.stage.addChild(background);

            this.addInitialGameItems();

            var consignesSound = createjs.Sound.play("consignes_fb");
            this.levelProxy = createjs.proxy(this.playRandomSound, this);
            consignesSound.addEventListener("complete", this.levelProxy);
        },
        handleItemlick: function(event, itemId) {
            //TODO manage correct / wrong answer
            console.log(itemId);
            var lastPlayedSound = this.playedSoundIds[this.playedSoundIds.length - 1];

            if (itemId + SOUND_SUFFIX === lastPlayedSound) {
                //correct, play positive feedback
                var posFeedBack = createjs.Sound.play("pos0_fb");
                event.target.removeEventListener("click", this.levelProxy);
                this.stage.removeChild(event.target);
                //add outline image
                var outline = new createjs.Bitmap(this.levelQueue.getResult(itemId + OUTLINE_SUFFIX));
                outline.x = this.imgPositions[itemId + OUTLINE_SUFFIX].x;
                outline.y = this.imgPositions[itemId + OUTLINE_SUFFIX].y;
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
        addInitialGameItems: function() {
           //st = this.stage;
            var i = 1; // background is already added
            var entry = this.fileManifest[i];
            //add images and manage click event. use levelImages array because it contains just the images we need here
           /* for (i=0; i<this.levelImages.length; i++) {
                var item = this.levelQueue.getResult(this.levelImages[i]);
                //var item = new createjs.Bitmap(this.fileManifest[this.levelImages[i]].src);
                var itemId = this.levelImages[i];
                item.x = this.imgPositions[itemId].x;
                item.y = this.imgPositions[itemId].y;
                this.levelProxy = createjs.proxy(this.handleItemlick, this, itemId);
                item.addEventListener("click", this.levelProxy);
                this.stage.addChild(item);
            } */

           var outlineMatch = new RegExp(OUTLINE_SUFFIX, "g");
            while (i < this.fileManifest.length && entry.type === "image" && entry.id.match(outlineMatch) === null) {
                var item = new createjs.Bitmap(entry.src);
                var itemId = entry.id;
                item.x = this.imgPositions[itemId].x;
                item.y = this.imgPositions[itemId].y;
                this.levelProxy = createjs.proxy(this.handleItemlick, this, itemId);
                item.addEventListener("click", this.levelProxy);

                this.stage.addChild(item);
                i++;
                entry = this.fileManifest[i];
            } ;
           

            //updating the stage
            this.stage.update();

        },
        playRandomSound: function() {
           if(this.levelSoundIds.length > 0) {
               var randomIndex = Math.floor(Math.random() * this.levelSoundIds.length);
                var randomSoundId = this.levelSoundIds[randomIndex];
                this.playedSoundIds.push(randomSoundId);
                createjs.Sound.play(randomSoundId);
                //remove played sound to prevent from being selected again
                this.levelSoundIds.splice(randomIndex, 1);
           } else {
               //game finished, play conclusion
               createjs.Sound.play("conclusion_fb");
           }   
        }
    };
    Moulin.Level = Level;
}());



