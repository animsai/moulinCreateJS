
var Utils = {
    getNextLevelForUser: function(user, theme) { //TODO see if still needed, not used anymore
        var lastLevel = "";
        var levelCount = levels.length;

        //find last level where the user has a score for this theme
        for (var i = 0; i < userScore.length; i++) {
            if (userScore[i].theme === theme && userScore[i].user === user && (userScore[i].score > 0 || userScore[i].score != "")) {
                lastLevel = userScore[i].levelId;
            }
        }
        if (lastLevel != "") {
            //find the level right after the last one that the user has a score
            for (var i = 0; i < levelCount; i++) {
                if (levels[i].id === lastLevel && i < levelCount - 1) {
                    return levels[i + 1];
                }
            }
        } else { //return the first level of the theme
            for (var i = 0; i < levelCount; i++) {
                if (levels[i].theme === theme) {
                    return levels[i];
                }
            }
        }
        return null;
    },
    getNextDirectLevel: function(currentLevelId) {
        var levelCount = levels.length;
        for (var i = 0; i < levelCount; i++) {
            if (levels[i].id === currentLevelId && i < levelCount - 1) {
                return levels[i + 1];
            }
        }
        return null;
    },
    getLevelById: function(id) {
        for (var i = 0; i < levels.length; i++) {
            if (levels[i].id === id) {
                return levels[i];
            }
        }
        return null;
    },
    generateBitmapItem: function(src, x, y, duration, withShadow) {
        var item = new createjs.Bitmap(src);
        if (withShadow) {
            item.shadow = new createjs.Shadow("#000000", 3, 3, 10);
        }
        item.x = x;
        item.y = y;
        item.alpha = 0;
        createjs.Tween.get(item).to({alpha: 1}, duration);

        return item;
    },
    createStar: function(fillColor, x, y, duration, radius, strokeStyle) {
        var starG = new createjs.Graphics();
        starG.setStrokeStyle(strokeStyle);
        starG.beginStroke("#E9AB17");
        starG.beginFill(fillColor);
        starG.drawPolyStar(0, 0, radius, 5, 0.6, -90);

        var star = new createjs.Shape(starG);
        star.shadow = new createjs.Shadow("#000000", 3, 3, 10);
        star.x = x;
        star.y = y;
        star.alpha = 0;
        createjs.Tween.get(star).to({alpha: 1}, duration);

        return star;
    },
    getScoreByUserAndLevel: function(user, levelId) {
        for (var i = 0; i < userScore.length; i++) {
            if (userScore[i].user === user && userScore[i].levelId === levelId) {
                return  userScore[i].score;
            }
        }
        //null shall be returned for main navigation items since they do not appear in the score table 
        //as well as for those items that were never played yet
        return null;
    },
    supportsLocalStorage: function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },
   addBackButton:function(stage, theme, isBackToMainNav) {
      var backImg = Utils.generateBitmapItem(backButtonFile.src, backButtonFile.x, backButtonFile.y, 300, true);
      backImg.addEventListener("pressup", function() {
          createjs.Sound.stop();
          new Moulin.Navigation(nav_fileManifest, stage, isBackToMainNav, theme);
      });
      stage.addChild(backImg);
  },
  manageSpeaker:function(stage){
       var speaker = Utils.generateBitmapItem(speakerIconFile.src, speakerIconFile.x, speakerIconFile.y, 0, false);
       stage.addChild(speaker);
       speaker.alpha = 0.2;
       createjs.Tween.get(speaker).to({alpha: 0.8}, 300).to({alpha: 0}, 300);
  }
};


