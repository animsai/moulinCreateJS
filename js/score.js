/* 
 * Manages the interlevel screen, meaning the level conclusion where the score is shown, a conclusion sentance is played and the
 * child can use from going to next level or back to navigation or re-do the level
 * Author : J. Travnjak
 * Date : may 2014
 */
(function() {
    function Score(finishedLevel, nextLevel, stage, score) {
        this.initialize(finishedLevel, nextLevel, stage, score);
    }

    Score.prototype = {
        stage: null,
        nextLevel: null,
        score: 0,
        levelProxy: null,
        finishedLevel: null,
        initialize: function(finishedLevel, nextLevel, stage, score) {
            //init internal variables
            this.finishedLevel = finishedLevel;
            this.nextLevel = nextLevel;
            this.stage = stage;
            this.score = score;
            this.stage.removeAllEventListeners();
            this.createScoreScreen();
            return this;
        },
        createScoreScreen: function() {
            //adding the background image
            Utils.createBlurredRectangle(this.stage);
            var x = 280;
            var y = 200;
            var i = 0;
            var container = new createjs.Container();
            var cptGoldenStars = this.score;
            //draw 3 stars with an interval of 600 mililseconds to make them appear one after another
            setInterval(function() {
                if (i < 3) { //"loop" management inside of interval, to limit the interval to 3 executions, because we want only 3 stars
                    if (cptGoldenStars > 0) {
                        starFillColor = "#FDD017";
                        cptGoldenStars--;
                    } else {
                        starFillColor = "#5C5858";
                    }
                    var star = Utils.createStar(starFillColor, x, y, 600, 100, 3);
                    container.addChild(star);
                    x += 220;
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
            for (var i = 0; i < files.length; i++) {
                var entry = files[i];
                if (entry.id === "next") {
                    if (this.isNextLevelAvailable()) {
                        var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 300, true);
                        this.levelProxy = createjs.proxy(this.handleItemClick, this, entry.id);
                        item.addEventListener("pressup", this.levelProxy);
                        this.stage.addChild(item);
                    }
                } else {
                    var item = Utils.generateBitmapItem(entry.src, entry.x, entry.y, 300, true);
                    this.levelProxy = createjs.proxy(this.handleItemClick, this, entry.id);
                    item.addEventListener("pressup", this.levelProxy);
                    this.stage.addChild(item);
                }
            }
        },
        handleItemClick: function(event, itemId) {
            switch (itemId) {
                case "menu":
                    new Moulin.Navigation(nav_fileManifest, this.stage);
                    break;
                case "next" :
                    Utils.launchLevel(this.nextLevel.id, this.stage);
                    break;
                case "replay" :
                    Utils.launchLevel(this.finishedLevel.id, this.stage);
                    break;
            }
        },
        isNextLevelAvailable: function() {
            if (this.nextLevel !== null && this.nextLevel.theme === this.finishedLevel.theme) {
                return true;
            } else {
                return false;
            }
        }
    };
    Moulin.Score = Score;
}());



