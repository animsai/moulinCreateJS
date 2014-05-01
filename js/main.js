
function init() {
    var canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    createjs.Ticker.addEventListener("tick", handleTick);
    onResize();
    var game = new Moulin.MediaLoader(allFiles, stage);
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
    var ow = 1045; 
    var oh = 789; 

    // keep aspect ratio
    var scale = Math.min(w / ow, h / oh);
    stage.scaleX = scale;
    stage.scaleY = scale;

    // adjust canvas size
    stage.canvas.width = ow * scale - 10;
    stage.canvas.height = oh * scale - 10;
 
}

