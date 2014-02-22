
function init() {
    var canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    onResize();
    
    var loadProgressText = new Moulin.LoadingBarText("Loading...", "1.2em Verdana", "black", 300, "center", 50);
    stage.addChild(loadProgressText);

    //creating a loading bar from our class and passing some arguments
    var bar = new Moulin.LoadingBar(400, 40, 5, "green", "black");
    stage.addChild(bar);
    
    level = new Moulin.Level(level1_AnimauxFileManifest, stage, bar, loadProgressText);

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
    var ow = 1045; // your stage width
    var oh = 789; // your stage height

   // if (keepAspectRatio)
    //{
        // keep aspect ratio
        var scale = Math.min(w / ow, h / oh);
        stage.scaleX = scale;
        stage.scaleY = scale;

        // adjust canvas size
        stage.canvas.width = ow * scale - 10;
        stage.canvas.height = oh * scale - 10;
   /* }
    else
    {
        // scale to exact fit
        stage.scaleX = w / ow;
        stage.scaleY = h / oh;

        // adjust canvas size
        stage.canvas.width = ow * stage.scaleX;
        stage.canvas.height = oh * stage.scaleY;
    }*/

    // update the stage
    stage.update();
}