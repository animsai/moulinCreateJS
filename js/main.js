
/*'./sounds/animaux/1animaux_serie1_consigne_1.wav'),
        new buzz.sound('./sounds/animaux/feedbacks/1animaux_reponse_bon_1.wav'),
        new buzz.sound('./sounds/animaux/feedbacks/1animaux_reponse_mauvais_1.wav'),
        new buzz.sound('./sounds/animaux/feedbacks/1animaux_conclusion_1.wav'

    new buzz.sound('./sounds/animaux/1animaux_serie1_6.wav'),
        new buzz.sound('./sounds/animaux/1animaux_serie1_1.wav'),
        new buzz.sound('./sounds/animaux/1animaux_serie1_4.wav'),
        new buzz.sound('./sounds/animaux/1animaux_serie1_2.wav'),
        new buzz.sound('./sounds/animaux/1animaux_serie1_5.wav'),
        new buzz.sound('./sounds/animaux/1animaux_serie1_3.wav')

 bgImage: 'decor_champ.jpg',
    papillon: 'animaux_papillon.png',
    oiseau: 'animaux_oiseau.png',
    tortue: 'animaux_tortue.png',
    lapin: 'animaux_lapin.png',
    chat: 'animaux_chat.png',
    canard: 'animaux_canard.png',
    papillon_alone: 'animaux_papillon_seul.png',
    oiseau_alone: 'animaux_oiseau_seul.png',
    tortue_alone: 'animaux_tortue_seul.png',
    lapin_alone: 'animaux_lapin_seul.png',
    chat_alone: 'animaux_chat_seul.png',
    canard_alone: 'animaux_canard_seul.png'

*/



function init() {
    var canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    onResize();
    
    var loadProgressText = new Moulin.LoadingBarText("Loading...", "1.2em Verdana", "black", 300, "center", 50);
    stage.addChild(loadProgressText);

    //creating a loading bar from our class and passing some arguments
    var bar = new Moulin.LoadingBar(400, 40, 5, "green", "black");
    stage.addChild(bar);
    
    level = new Moulin.Level(level1_AnimauxFileManifest, level1_itemPositions, stage, bar, loadProgressText);

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