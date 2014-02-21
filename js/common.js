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
 * */
var level1_AnimauxFileManifest = [
    //level images
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "decor_champ.jpg"},
    {id: "papillon", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_papillon.png"},
    {id: "oiseau", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_oiseau.png"},
    {id: "tortue", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_tortue.png"},
    {id: "lapin", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_lapin.png"},
    {id: "chat", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_chat.png"},
    {id: "canard", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_canard.png"},
    //image outlines
    {id: "papillon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_papillon_seul.png"},
    {id: "oiseau_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_oiseau_seul.png"},
    {id: "tortue_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_tortue_seul.png"},
    {id: "lapin_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_lapin_seul.png"},
    {id: "chat_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_chat_seul.png"},
    {id: "canard_outline", src: IMGFOLDER + ANIMAL_FOLDER + "animaux_canard_seul.png"},
    //level sounds
    {id: "papillon_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_6.wav"},
    {id: "oiseau_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_1.wav"},
    {id: "tortue_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_4.wav"},
    {id: "lapin_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_2.wav"},
    {id: "chat_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_3.wav"},
    {id: "canard_snd", src: SNDFOLDER + ANIMAL_FOLDER + "1animaux_serie1_5.wav"},
    //instruction and feedback sounds
    {id: "consignes_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux_serie1_consigne_1.wav"},
    {id: "pos0_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux_reponse_bon_1.wav"},
    {id: "neg0_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux_reponse_mauvais_1.wav"},
    {id: "conclusion_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux_conclusion_1.wav"}
];
//positions of the items
var level1_itemPositions = {
    papillon: {x: 818, y: 27},
    oiseau: {x: 818, y: 123},
    tortue: {x: 818, y: 230},
    lapin: {x: 818, y: 323},
    canard: {x: 818, y: 447},
    chat: {x: 818, y: 600},
    papillon_outline: {x: 335, y: 458},
    oiseau_outline: {x: 389, y: 150},
    tortue_outline: {x: 493, y: 295},
    lapin_outline: {x: 130, y: 280},
    canard_outline: {x: 606, y: 530},
    chat_outline: {x: 29, y: 440}
};

