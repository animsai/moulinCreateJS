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
                
            blurredRectangle.graphics.beginFill("#726E6D").drawRect(0,0,this.stage.canvas.width,this.stage.canvas.height);      
            this.stage.addChild(blurredRectangle);
            createjs.Tween.get(blurredRectangle).to({alpha:0.8}, 1200);
            var x =  280; 
            var y = 200;
            var i = 0;
            
            var cptGoldenStars = 1;
            if(this.score > 4) {
                cptGoldenStars = 3;
            } else if(this.score > 3) {
                cptGoldenStars = 2;
            }
            
            var localThis = this;
              //draw 3 stars with an interval of 600 mililseconds to make them appear one after another
             setInterval(function() {
                 if(i<3) { //"loop" management inside of interval, to limit the interval to 3 executions, because we want only 3 stars
                     if (cptGoldenStars > 0) {
                      starFillColor = "#FDD017";
                      cptGoldenStars--;
                    } else {
                        starFillColor = "#5C5858";
                    }
                    var star = localThis.createStar(starFillColor, x, y, 600, 100);
                    stage.addChild(star);
                    x+= 220;
                    i++;
                 }
             }, 600);

        },
        createStar: function(fillColor, x, y, duration, radius) {
            var starG = new createjs.Graphics();
            starG.setStrokeStyle(3);
            starG.beginStroke("#E9AB17");
            starG.beginFill(fillColor);
            starG.drawPolyStar(0, 0, radius, 5, 0.6, -90);

            var star = new createjs.Shape(starG);
            star.x = x;
            star.y = y;
            star.alpha = 0;
            createjs.Tween.get(star).to({alpha:1}, duration);  
            
            return star;
        },
        /***
         * adds the score and the clickable items
         */
        addScoreScreenItems: function() {
            var files = eval(interLevel_fileManifest);
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
            this.startNextLevel();
        },
        startNextLevel: function(){
            //set the score for this level
            this.stage.removeAllChildren();
            
            if(this.nextLevel != null && this.nextLevel.theme == this.finishedLevel.theme) { //if the same theme, continue
                new Moulin.Level(this.nextLevel, this.stage);
            } else { //else back to navigation
                new Moulin.Navigation(nav_fileManifest, this.stage);
            }
        }
    };
    Moulin.Score = Score;
}());



