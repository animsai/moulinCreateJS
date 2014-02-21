(function() {
  function Level(fileManifest, imgPositions, stage, loadingBar, loadingBarText) {
        this.initialize(fileManifest, imgPositions, stage, loadingBar, loadingBarText);
    }
    
    Level.prototype = {
         levelQueue: null,
         imgPositions:null,
         stage:null,
         bar:null,
         loadingBarText: null,
         levelProxy : null,
         
    initialize : function(fileManifest, imgPositions, stage, loadingBar, loadingBarText) {
        this.imgPositions = imgPositions;
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
        this.loadingBarText.setText("Loading complete click to start");
        this.stage.update();
        //proxy to manage the scope of 'this' 
        this.levelProxy = createjs.proxy(this.handleClick, this);
        this.stage.addEventListener("click", this.levelProxy);
    },

    handleClick : function() {
        this.playLevel();
        this.stage.removeChild(this.loadingBarText, this.bar);
        this.stage.removeAllEventListeners("click");  
    },

    playLevel : function() {
        //adding the background image
        background = new createjs.Bitmap(this.levelQueue.getResult("scene"));
        this.stage.addChild(background);

        //adding the other images image, for now hard coded, to be refactored
        var papillon = new createjs.Bitmap(this.levelQueue.getResult("papillon"));
        papillon.x = this.imgPositions["papillon"].x ;//* this.stage.scaleX;
        papillon.y = this.imgPositions["papillon"].y ;//* this.stage.scaleY;
        
         //proxy to manage the scope of 'this' 
        this.levelProxy = createjs.proxy(this.handleGameClick, this);
        papillon.addEventListener("click", this.levelProxy);
        this.stage.addChild(papillon);
        
        //adding the other images image, for now hard coded, to be refactored
        var oiseau = new createjs.Bitmap(this.levelQueue.getResult("oiseau"));
        oiseau.x = this.imgPositions["oiseau"].x ;//* this.stage.scaleX;
        oiseau.y = this.imgPositions["oiseau"].y ;//* this.stage.scaleY;
        this.stage.addChild(oiseau);

        //updating the stage
        this.stage.update();
        var consignesSound = createjs.Sound.play("consignes");
        
        consignesSound.addEventListener("complete", function() {
            createjs.Sound.play("papillon_snd");
        });
    },
      
    handleGameClick:function(event) {
        console.log("clicked");
        var fb = createjs.Sound.play("fb_pos0");
        this.stage.removeChild(event.target);
        
         //adding the other images image, for now hard coded, to be refactored
        var papillon = new createjs.Bitmap(this.levelQueue.getResult("papillon_outline"));
        papillon.x = this.imgPositions["papillon_outline"].x * this.stage.scaleX;
        papillon.y = this.imgPositions["papillon_outline"].y * this.stage.scaleY;
        
         this.stage.addChild(papillon);
        
        this.stage.update();
        fb.addEventListener("complete", this.playRandomSound);
    }, 
    
    playRandomSound:function() {
        createjs.Sound.play("oiseau_snd");
    }        
    
    };
    Moulin.Level = Level;
}());



