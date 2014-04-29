(function() {
    function Score(nextLevel, stage, score) {
        this.initialize(nextLevel, stage, score);
    }

    Score.prototype = {
        stage: null,
        nextLevel:null,
        score:0,
        levelProxy:null,
        initialize: function(nextLevel, stage, score) {
            //init internal variables
            this.nextLevel = nextLevel;
            this.stage = stage;
            this.score = score;
            this.createScoreScreen();
            return this;
        },
        createScoreScreen: function() {
            //adding the background image
            var blurredRectangle = new createjs.Shape().set({x:0,y:0});
            blurredRectangle.alpha = 0.8;
            blurredRectangle.graphics.beginFill("#726E6D").drawRect(0,0,this.stage.canvas.width,this.stage.canvas.height);      
            this.stage.addChild(blurredRectangle);
             
            var x =  280; 
            var y = 200;
            
            var cptGoldenStars = 1;
            if(this.score > 4) {
                cptGoldenStars = 3;
            } else if(this.score > 3) {
                cptGoldenStars = 2;
            }
             
            //draw 3 stars in a row
            for (var i=0; i<3; i++){
                var starG = new createjs.Graphics();
                starG.setStrokeStyle(3);
                starG.beginStroke("#E9AB17");
                if (cptGoldenStars > 0) {
                  starG.beginFill("#FDD017");
                  cptGoldenStars--;
                } else {
                    starG.beginFill("#5C5858");
                }
                 starG.drawPolyStar(0, 0, 100, 5, 0.6, -90);

                var star = new createjs.Shape(starG);
                star.x = x;
                star.y = y;
                stage.addChild(star);
                x += 220;
            }

        },
        /***
         * adds the score and the clickable items
         */
        addScoreScreenItems: function() {
            var files = eval(interLevel_fileManifest);
            for (var i=0; i< files.length; i++) {
                var entry = files[i];
                var item = new createjs.Bitmap(entry.src);
                //item.shadow = new createjs.Shadow("#000000", 3, 3, 10);
                var itemId = entry.id;
                item.x = entry.x;
                item.y = entry.y;
                this.levelProxy = createjs.proxy(this.handleItemClick, this, itemId);
                item.addEventListener("click", this.levelProxy);

                this.stage.addChild(item);
            }   
        },
        handleItemClick:function(event, itemId) {
            //FOR NOW GO TO NEXT LEVEL WITHOUTH CHECKING ANYTHING
            this.startNextLevel();
        },
        startNextLevel: function(){
            //set the score for this level
            this.stage.removeAllChildren();
            
            //if(nextLevel != null && nextLevel.theme == this.level.theme) { //if the same theme, continue
            var lev = new Moulin.Level(this.nextLevel, this.stage);
            //} else { //else back to navigation
               // var nav = new Moulin.Navigation(nav_fileManifest, stage);
            //}
        }
    };
    Moulin.Score = Score;
}());



