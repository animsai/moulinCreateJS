// create a namespace for the application
this.Moulin = this.Moulin || {};

var IMGFOLDER = "./media/images/";
var SNDFOLDER = "./media/sounds/";
var stage;

var ANIMAL_FOLDER = "animaux/";
var FB_FOLDER = "feedbacks/";
var OUTLINE_SUFFIX = "_outline";
var SOUND_SUFFIX = "_snd";
var SCENE_ID = "scene";
var FEEDBACK_SUFFIX = "_fb";
/***
 * array of files needed in a level
 * respect the following order
 * first item shall be the background of the scene
 * followed by clickable images
 * then image outlines
 * then level sounds, and at the end level instructions and feedbacks
 * */
var level1_AnimauxFileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "decor_champ.jpg"},
     //level images
    {id: "papillon", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_papillon.png", "x": 818, "y": 27},
    {id: "oiseau", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_oiseau.png", "x": 818, "y": 123},
    {id: "tortue", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_tortue.png", "x": 818, "y": 230},
    {id: "lapin", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_lapin.png", "x": 818, "y": 323},
    {id: "canard", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_canard.png", "x": 818, "y": 447},
    {id: "chat", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_chat.png", "x": 818, "y": 600},
    //image outlines
    {id: "papillon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_papillon_seul.png","x": 335, "y": 458},
    {id: "oiseau_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_oiseau_seul.png", "x": 389, "y": 150},
    {id: "tortue_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_tortue_seul.png", "x": 493, "y": 295},
    {id: "lapin_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_lapin_seul.png", "x": 130,"y": 280},
    {id: "canard_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_canard_seul.png","x": 606, "y": 530 },
    {id: "chat_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_chat_seul.png", "x": 29, "y": 440},
    //level sounds
    {id: "papillon_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_6.wav"},
    {id: "oiseau_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_1.wav"},
    {id: "tortue_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_4.wav"},
    {id: "lapin_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_2.wav"},
    {id: "canard_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_5.wav"},
    {id: "chat_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_3.wav"},
    //instruction and feedback sounds
    {id: "consignes_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux_serie1_consigne_1.wav"},
    {id: "pos0_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux_reponse_bon_1.wav"},
    {id: "neg0_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux_reponse_mauvais_1.wav"},
    {id: "conclusion_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux_conclusion_1.wav"}
];

