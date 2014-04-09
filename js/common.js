// create a namespace for the application
this.Moulin = this.Moulin || {};

var IMGFOLDER = "./media/images/";
var SNDFOLDER = "./media/sounds/";
var stage;
var nav ;


var NAV_FOLDER = "nav/";
var ANIMAL_FOLDER = "animaux/";
var FB_FOLDER = "feedbacks/";


var OUTLINE_SUFFIX = "_outline";
var SOUND_SUFFIX = "_snd";
var SCENE_ID = "scene";
var FEEDBACK_SUFFIX = "_fb";

var themes = [
    {id:"nav"},
    {id:"animaux"},
    {id:"habits"},
    {id:"objets"}
];

//keep the levels in the correct order, otherwise it won't work for the score calculations
var levels = [
    {id:"animaux1" , theme:"animaux", media:"animaux1_fileManifest"},
    {id:"animaux2" , theme:"animaux", media:"animaux2_fileManifest"},
    {id:"habits1" , theme:"habits", media:"habits1_fileManifest"}
];

var userScore = [
    {user:"test", levelId:"animaux1", theme:"animaux", score:0}  
];

var feedback_fileManifest = [
    {id: "pos0_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.reponse.bon.1.wav"},
    {id: "pos1_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.reponse.bon.2.wav"},
    {id: "pos2_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.reponse.bon.3.wav"},
    {id: "pos3_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.reponse.bon.4.wav"},
    {id: "neg0_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.reponse.mauvais.1.wav"},
    {id: "neg1_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.reponse.mauvais.2.wav"},
    {id: "neg2_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.reponse.mauvais.3.wav"},
    {id: "conclusion_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.conclusion.1.wav"}
];


var nav_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + NAV_FOLDER + "niveau1_decor_grand.png"},
     //level images
    {id: "animaux", src: IMGFOLDER + NAV_FOLDER + "niveau1_animaux.png", "x": 42, "y": 184},
    {id: "habits", src: IMGFOLDER + NAV_FOLDER + "niveau1_habits.png", "x": 238, "y": 184},
    //instruction and feedback sounds
    {id: "intro_fb", src: SNDFOLDER + NAV_FOLDER + "intro.wav"},
    {id: "nav_consignes_fb", src: SNDFOLDER + NAV_FOLDER + "consignes.wav"}
];


/***
 * array of files needed in  level1
 * respect the following order
 * first item shall be the background of the scene
 * followed by clickable images
 * then image outlines
 * then  level instructions
 * */
var animaux1_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level1/decor_champ.jpg"},
     //level images
    {id: "papillon", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_papillon.png", "x": 818, "y": 27},
    {id: "oiseau", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_oiseau.png", "x": 818, "y": 153},
    {id: "tortue", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_tortue.png", "x": 818, "y": 290},
    {id: "lapin", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_lapin.png", "x": 818, "y": 413},
   /* {id: "canard", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_canard.png", "x": 818, "y": 447},*/
    {id: "chat", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_chat.png", "x": 818, "y": 570},
    //image outlines
    {id: "papillon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_papillon_seul.png","x": 335, "y": 458},
    {id: "oiseau_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_oiseau_seul.png", "x": 389, "y": 150},
    {id: "tortue_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_tortue_seul.png", "x": 493, "y": 295},
    {id: "lapin_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_lapin_seul.png", "x": 130,"y": 280},
   /* {id: "canard_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_canard_seul.png","x": 606, "y": 530 },*/
    {id: "chat_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_chat_seul.png", "x": 29, "y": 440},
    //level sounds
    {id: "papillon_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_6.wav"},
    {id: "oiseau_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_1.wav"},
    {id: "tortue_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_4.wav"},
    {id: "lapin_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_2.wav"},
   /*{id: "canard_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_5.wav"},*/
    {id: "chat_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_3.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux1", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_consigne_1.wav"},

];

/***
 * array of files needed in  level1
 * respect the following order
 * first item shall be the background of the scene
 * followed by clickable images
 * then image outlines
 * then level instructions 
 * */
var animaux2_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_decor_champ2.png"},
     //level images
    {id: "abeille", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_abeille.png", "x": 818, "y": 35},
    /*{id: "souris", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_souris.png", "x": 818, "y": 123},*/
    {id: "poule", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_poule.png", "x": 818, "y": 146},
    {id: "chien", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_chien.png", "x": 818, "y": 290},
    {id: "cochon", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_cochon.png", "x": 818, "y": 455},
    {id: "vache", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_vache.png", "x": 818, "y": 600},
    //image outlines
    {id: "abeille_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_abeille_seul.png","x": 360, "y": 500},
    /*{id: "souris_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_souris_seul.png", "x": 432, "y": 716},*/
    {id: "poule_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_poule_seul.png", "x": 52, "y": 430},
    {id: "chien_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_chien_seul.png", "x": 148,"y": 539},
    {id: "cochon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_cochon_seul.png","x": 599, "y": 540 },
    {id: "vache_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_vache_seul.png", "x": 470, "y": 300},
    //level sounds
    {id: "abeille_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.6.wav"},
    /*{id: "souris_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.7.wav"},*/
    {id: "poule_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.1.wav"},
    {id: "chien_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.3.wav"},
    {id: "cochon_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.4.wav"},
    {id: "vache_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.2.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux2", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.consigne.1.wav"},
  
];

var animaux3_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_decor_champ2.png"},
     //level images
    {id: "abeille", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_abeille.png", "x": 818, "y": 35},
    /*{id: "souris", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_souris.png", "x": 818, "y": 123},*/
    {id: "poule", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_poule.png", "x": 818, "y": 146},
    {id: "chien", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_chien.png", "x": 818, "y": 290},
    {id: "cochon", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_cochon.png", "x": 818, "y": 455},
    {id: "vache", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_vache.png", "x": 818, "y": 600},
    //image outlines
    {id: "abeille_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_abeille_seul.png","x": 360, "y": 500},
    /*{id: "souris_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_souris_seul.png", "x": 432, "y": 716},*/
    {id: "poule_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_poule_seul.png", "x": 52, "y": 430},
    {id: "chien_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_chien_seul.png", "x": 148,"y": 539},
    {id: "cochon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_cochon_seul.png","x": 599, "y": 540 },
    {id: "vache_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_vache_seul.png", "x": 470, "y": 300},
    //level sounds
    {id: "abeille_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.6.wav"},
    /*{id: "souris_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.7.wav"},*/
    {id: "poule_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.1.wav"},
    {id: "chien_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.3.wav"},
    {id: "cochon_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.4.wav"},
    {id: "vache_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.2.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux2", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.consigne.1.wav"},
  
];


var allFiles = [nav_fileManifest, animaux1_fileManifest, animaux2_fileManifest, feedback_fileManifest];