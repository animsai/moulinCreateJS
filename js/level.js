// create a namespace for the application
this.Moulin = this.Moulin || {};
(function() {
  function Level(fileManifest, stage, loadingBar, loadingBarText) {
        this.initialize(fileManifest, stage, loadingBar, loadingBarText);
    }
    
    Level.prototype = {
         levelQueue: null,
         stage:null,
         bar:null,
         loadingBarText: null,
         levelProxy : null,
         
        
    /*var Level = function(fileManifest, stage, loadingBar, loadingBarText) {
        this.queue = null,
                this.stage = null,
                this.bar = null,
                this.loadingBarText = null,
                this.initialize(fileManifest, stage, loadingBar, loadingBarText);
    };*/

    initialize : function(fileManifest, stage, loadingBar, loadingBarText) {
        this.bar = loadingBar;
        this.stage = stage;
        this.loadingBarText = loadingBarText;

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
    handleProgress :function() {
        this.bar.loadingBar.scaleX = this.levelQueue.progress * this.bar.width;
        progresPrecentage = Math.round(this.levelQueue.progress * 100);
        this.loadingBarText.setText(progresPrecentage + "% Loaded");
        this.stage.update();
    },

    handleComplete : function() {
        //backgroundImage = this.queue.getResult("scene");
        this.loadingBarText.setText("Loading complete click to start");
        this.stage.update();
        //proxy to manage the scope of 'this' 
        this.levelProxy = createjs.proxy(this.handleClick, this);
        this.stage.canvas.addEventListener("click", this.levelProxy);
    },

    handleClick : function() {
        this.startLevel();
        this.stage.removeChild(this.loadingBarText, this.bar);
        this.stage.canvas.removeEventListener("click",this.levelProxy);  
    },

    startLevel : function() {
        //adding the background image
        background = new createjs.Bitmap(this.levelQueue.getResult("scene"));
        this.stage.addChild(background);

        //adding the other images image, for now hard coded, to be refactored
        var papillon = new createjs.Bitmap(this.levelQueue.getResult("papillon"));
        papillon.y = 18;
        papillon.x = 18;
        this.stage.addChild(papillon);
        
        //adding the other images image, for now hard coded, to be refactored
       // var oiseau = new createjs.Bitmap(this.levelQueue.getResult("oiseau"));
       // oiseau.y = 818;
        //oiseau.x = 123;
        //this.stage.addChild(oiseau);

        //updating the stage
        this.stage.update();
        var consignesSound = createjs.Sound.play("consignes");
        
        consignesSound.addEventListener("complete", function() {createjs.Sound.play("papillon_snd");});
    }
    };
    Moulin.Level = Level;
}());



