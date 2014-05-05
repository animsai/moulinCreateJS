(function() {
    function Score(finishedLevel, nextLevel, stage, score) {
        this.initialize(finishedLevel, nextLevel, stage, score);
    }

    Score.prototype = {
        stage: null,
        nextLevel:null,
        score:0,
        levelProxy:null,
        finishedLevel:null,
        initialize: function(finishedLevel, nextLevel, stage, score) {
            //init internal variables
            this.finishedLevel = finishedLevel;
            this.nextLevel = nextLevel;
            this.stage = stage;
            this.score = score;
            this.createScoreScreen();
            return this;
        },
        createScoreScreen: function() {
            //adding the background image
            var blurredRectangle = new createjs.Shape().set({x:0,y:0});
            blurredRectangle.alpha = 0;
                
            blurredRectangle.graphics.beginFill("white").drawRect(0,0,this.stage.canvas.width*2,this.stage.canvas.height*2);      
            this.stage.addChild(blurredRectangle);
            createjs.Tween.get(blurredRectangle).to({alpha:0.8}, 1000);
            var x =  280; 
            var y = 200;
            var i = 0;
            var container = new createjs.Container();
            container.addChild(blurredRectangle);
            
            var cptGoldenStars = this.score;
              //draw 3 stars with an interval of 600 mililseconds to make them appear one after another
             setInterval(function() {
                 if(i<3) { //"loop" management inside of interval, to limit the interval to 3 executions, because we want only 3 stars
                     if (cptGoldenStars > 0) {
                      starFillColor = "#FDD017";
                      cptGoldenStars--;
                    } else {
                        starFillColor = "#5C5858";
                    }
                    var star = Utils.createStar(starFillColor, x, y, 600, 100,3);
                    container.addChild(star);
                    x+= 220;
                    i++;
                 }
             }, 600);
            this.stage.addChild(container);
        },
        /***
         * adds the score and the clickable items
         */
        addScoreScreenItems: function() {
            var files = interLevel_fileManifest;
            for (var i=0; i< files.length; i++) {
                var entry = files[i];
                
                var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 600, true);              
                this.levelProxy = createjs.proxy(this.handleItemClick, this, entry.id);
                item.addEventListener("pressup", this.levelProxy);
                this.stage.addChild(item);
            }   
        },
        handleItemClick:function(event, itemId) {
            //FOR NOW GO TO NEXT LEVEL WITHOUTH CHECKING ANYTHING
            //TODO Manage restart and back to menu in the future
            switch (itemId) {
                case "menu":
                    new Moulin.Navigation(nav_fileManifest, this.stage);
                    break;
                case "next" :
                    this.startNextLevel();
                    break;
                case "replay" :
                     this.stage.removeAllChildren();
                     new Moulin.Level(this.finishedLevel, this.stage);
                    break;
            }
        },
        startNextLevel: function(){
            //set the score for this level
            this.stage.removeAllChildren();
            
            if(this.nextLevel !== null && this.nextLevel.theme === this.finishedLevel.theme) { //if the same theme, continue
                new Moulin.Level(this.nextLevel, this.stage);
            } else { //else back to navigation
                new Moulin.Navigation(nav_fileManifest, this.stage);
            }
        }
    };
    Moulin.Score = Score;
}());



