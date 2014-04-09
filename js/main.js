
function init() {
    var canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    createjs.Ticker.addEventListener("tick", handleTick);
    onResize();
    /*var loadProgressText = new Moulin.LoadingBarText("Loading...", "1.2em Verdana", "black", 300, "center", 50);
    stage.addChild(loadProgressText);

    //creating a loading bar from our class and passing some arguments
    var bar = new Moulin.LoadingBar(400, 40, 5, "green", "black");
    stage.addChild(bar);*/
    
    //level = new Moulin.Level(level1_AnimauxFileManifest, stage);

    //nav = new Moulin.Navigation(nav_fileManifest, stage);
    
    var game = new Moulin.MediaLoader(allFiles, stage);

    //stage.update();
}
  function handleTick() {
    stage.update();
  } 

window.onresize = function()
{
     onResize();
};

//code found here and slightly adapted:
//http://community.createjs.com/discussions/createjs/547-resizing-canvas-and-its-content-proportionally-cross-platform
function onResize()
{
// browser viewport size
    var w = window.innerWidth;
    var h = window.innerHeight;

// stage dimensions
    var ow = 1035; 
    var oh = 779; 

    // keep aspect ratio
    var scale = Math.min(w / ow, h / oh);
    stage.scaleX = scale;
    stage.scaleY = scale;

    // adjust canvas size
    stage.canvas.width = ow * scale - 10;
    stage.canvas.height = oh * scale - 10;
 
}

function getNextLevelForUser(user, theme) {
    var lastLevel = "";    
    var levelCount = levels.length;
    
    //find last level where the user has a score for this theme
    for (var i=0; i<userScore.length; i++) {
        if(userScore[i].theme === theme && userScore[i].user === user && (userScore[i].score > 0 || userScore[i].score != "")) {
            lastLevel = userScore[i].levelId;
        }
    }
    if(lastLevel != "") {
        //find the level right after the last one that the user has a score
        for(var i=0; i<levelCount; i++) {
            if(levels[i].id === lastLevel && i < levelCount-1) {
               return levels[i+1];
            }
        }
    } else { //return the first level of the theme
        for(var i=0; i<levelCount; i++) {
            if(levels[i].theme === theme){
                return levels[i];
            }
        }
    }
  
}