var keepAspectRatio = true;
var imgFolder = "./media/images/";
var sndFolder = "./media/sounds/";




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
var animalFolder = "animaux/";
var fbFolder = "feedbacks/"
var level1_AnimauxFileManifest = [
        //level images
        {id: "scene", src: imgFolder + animalFolder + "decor_champ.jpg"},
        {id: "papillon", src: imgFolder + animalFolder + "animaux_papillon.png"},
        {id: "oiseau", src: imgFolder + animalFolder + "animaux_oiseau.png"},
        
        //image outlines
        {id: "papillon_outline", src: imgFolder + animalFolder + "animaux_papillon_seul.png"},
        {id: "oiseau_outline", src: imgFolder + animalFolder + "animaux_oiseau_seul.png"},
        
        //level sounds
        {id:"papillon_snd", src: sndFolder  + animalFolder +  "1animaux_serie1_6.wav"},
        {id:"oiseau_snd", src: sndFolder  + animalFolder +  "1animaux_serie1_1.wav"},        
        
        //instruction and feedback sounds
        {id:"consignes", src: sndFolder + animalFolder + fbFolder + "1animaux_serie1_consigne_1.wav"},
        {id:"fb_pos0", src: sndFolder + animalFolder + fbFolder + "1animaux_reponse_bon_1.wav"},
        {id:"fb_neg0", src: sndFolder + animalFolder + fbFolder + "1animaux_reponse_mauvais_1.wav"},
        {id:"conclusion", src: sndFolder + animalFolder + fbFolder + "1animaux_conclusion_1.wav"}
    ];




window.onresize = function()
{
     onResize();
};

function init() {
    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    onResize();
    loadProgressText = new LoadingBarText("Loading...", "1.2em Verdana", "black", 300, "center", canvas.width / 2, 50);
    stage.addChild(loadProgressText);

    //creating a loading bar from our class and passing some arguments
    var bar = new LoadingBar(400, 40, 5, "green", "black");
    stage.addChild(bar);
    
    level = new Moulin.Level(level1_AnimauxFileManifest, stage, bar, loadProgressText);

    /*preload = new createjs.LoadQueue(false);
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("complete", handleComplete);
    preload.addEventListener("progress", handleProgress);
    preload.loadManifest([
        {id: "chat", src: imgFolder + "animaux_chat_seul.png"},
        {id: "background", src: imgFolder + "decor_champ.jpg"},
        {id:"consignes", src: sndFolder + "animaux/1animaux_serie1_consigne_1.wav"},
        {id:"test", src: sndFolder + "test.wav"}
    ]);*/

    stage.update();
}


/*
function handleProgress() {
    bar.loadingBar.scaleX = preload.progress * bar.width;

    progresPrecentage = Math.round(preload.progress * 100);
    loadProgressText.setText(progresPrecentage + "% Loaded");
    stage.update();
}

function handleComplete() {
    backgroundImage = preload.getResult("background");
    loadProgressText.setText("Loading complete click to start");
    stage.update();

    canvas.addEventListener("click", handleClick);
}

function handleClick() {
    start();
    createjs.Sound.play("consignes");
    stage.removeChild(loadProgressText, bar);
    canvas.removeEventListener("click", handleClick);
}

function start() {
    //adding the background image
    background = new createjs.Bitmap(backgroundImage);
    stage.addChild(background);

    //adding the trees image
    chat = new createjs.Bitmap(preload.getResult("chat"));
    chat.y = 440;
    stage.addChild(chat);

    //updating the stage
    stage.update();
    
  // game = new Game();
}
*/
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

    if (keepAspectRatio)
    {
        // keep aspect ratio
        var scale = Math.min(w / ow, h / oh);
        stage.scaleX = scale;
        stage.scaleY = scale;

        // adjust canvas size
        stage.canvas.width = ow * scale - 10;
        stage.canvas.height = oh * scale - 10;
    }
    else
    {
        // scale to exact fit
        stage.scaleX = w / ow;
        stage.scaleY = h / oh;

        // adjust canvas size
        stage.canvas.width = ow * stage.scaleX;
        stage.canvas.height = oh * stage.scaleY;
    }

    // update the stage
    stage.update();
}