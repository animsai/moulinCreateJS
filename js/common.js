 /* 
 * Contains all the global variables as well as all the file manifests needed for the game
 * Author : J. Travnjak
 * Date : may 2014
 */

var IMGFOLDER = "./media/images/";
var SNDFOLDER = "./media/sounds/";
var stage;
var nav;

var NAV_FOLDER = "nav/";
var ANIMAL_FOLDER = "animaux/";
var FB_FOLDER = "feedbacks/";

var OUTLINE_SUFFIX = "_outline";
var SOUND_SUFFIX = "_snd";
var SCENE_ID = "scene";
var FEEDBACK_SUFFIX = "_fb";
var CONSINGES = "consignes";


var userScore = [
    {user: "test", levelId: "animaux1", theme: "animaux", score: 1},
    {user: "test", levelId: "animaux2", theme: "animaux", score: 2}
];

var InteractionTypeEnum = {
    GUIDED: 1,
    FREEDRAG: 2,
    GUIDEDDRAG: 3
};

var themes = [
    {id: "nav"},
    {id: "animaux"},
    {id: "habits"},
    {id: "objets"},
    {id: "adjectifs"}
];

/*******************************global files, can be used anywhere in the game****************************************************/
var interLevel_fileManifest = [
    {id: "menu", src: IMGFOLDER + NAV_FOLDER + "menu.png", x: 180, y: 400},
    {id: "replay", src: IMGFOLDER + NAV_FOLDER + "replay.png", x: 410, y: 400},
    {id: "next", src: IMGFOLDER + NAV_FOLDER + "next.png", x: 630, y: 400}
];

//global var used to inform user that there is a sound going on and that he has to wait
var speakerIconFile = {id: "speaker", src: IMGFOLDER + NAV_FOLDER + "speaker.png", "x": 410, "y": 350};
//global file used in different contexts to go back to previous screen
var backButtonFile = {id: "previous_small", src: IMGFOLDER + NAV_FOLDER + "previous_small.png", x: 35, y: 35};
var repeatButtonFile = {id: "repeat", src: IMGFOLDER + NAV_FOLDER + "repeat.png", x: 35, y: 650};
var closeButtonFile = {id: "close", src: IMGFOLDER + NAV_FOLDER + "close.png", x: 135, y: 35};
var introSnd = {id: "intro_snd", src: SNDFOLDER + NAV_FOLDER + "intro.wav"};
var introImg = {id: "introImg", src: IMGFOLDER + NAV_FOLDER + "ecran_debut_couleurs_v2.png", x: 0, y: 0};

var feedback_fileManifest = [
    {id: "pos0_fb", src: SNDFOLDER + FB_FOLDER + "1animaux.reponse.bon.1.wav"},
    {id: "pos1_fb", src: SNDFOLDER +  FB_FOLDER + "1animaux.reponse.bon.2.wav"},
    {id: "pos2_fb", src: SNDFOLDER +  FB_FOLDER + "1animaux.reponse.bon.3.wav"},
    {id: "neg0_fb", src: SNDFOLDER +  FB_FOLDER + "1animaux.reponse.mauvais.1.wav"},
    {id: "neg1_fb", src: SNDFOLDER +  FB_FOLDER + "1animaux.reponse.mauvais.2.wav"},
    {id: "neg2_fb", src: SNDFOLDER +  FB_FOLDER + "1animaux.reponse.mauvais.3.wav"},
    {id: "animaux_conclusion_fb", src: SNDFOLDER + ANIMAL_FOLDER + FB_FOLDER + "1animaux.conclusion.1.wav"},
    {id: "habits_conclusion_fb", src: SNDFOLDER + "habits/" + FB_FOLDER + "2habit.ex3.conclusion.1.wav"},
    {id: "objets_conclusion_fb", src: SNDFOLDER + "objets/" + FB_FOLDER + "3objets.conclusion.wav"},
     {id: "adjectifs_conclusion_fb", src: SNDFOLDER + "adjectifs/" + FB_FOLDER + "9adjectifs.conclusion.1.wav"}
];
/***********************************************************************""""""""""""""""""""""""""""**************************/


/***************************************NAVIGATION FILES ****************************""""""""""""""""******************************/
var nav_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + NAV_FOLDER + "niveau1_decor_grand.png"},
    //level images
    {id: "animaux", src: IMGFOLDER + NAV_FOLDER + "niveau1_animaux.png", x: 42, y: 184},
    {id: "habits", src: IMGFOLDER + NAV_FOLDER + "niveau1_habits.png", x: 238, y: 184},
    {id: "objets", src: IMGFOLDER + NAV_FOLDER + "niveau1_objets.png", x: 438, y: 184},
    {id: "adjectifs", src: IMGFOLDER + NAV_FOLDER + "niveau1_adjectifs.png", x: 628, y: 184},
    //instruction and feedback sounds
    {id: "nav_consignes_fb", src: SNDFOLDER + NAV_FOLDER + "consignes.wav"},
    {id: "subNav_consignes_fb", src: SNDFOLDER + NAV_FOLDER + "son_5.wav"}
];

var animaux_nav_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + NAV_FOLDER + "niveau2_animaux_decor.png"},
    //level images
    {id: "animauxEx1", levelId: "animaux1", src: IMGFOLDER + NAV_FOLDER + "niveau2_animaux_ex1.png", "x": 42, "y": 254},
    {id: "animauxEx2", levelId: "animaux2", src: IMGFOLDER + NAV_FOLDER + "niveau2_animaux_ex2.png", "x": 228, "y": 254},
    {id: "animauxEx3", levelId: "animaux3", src: IMGFOLDER + NAV_FOLDER + "niveau2_animaux_ex3.png", "x": 408, "y": 254},
    {id: "animauxEx4", levelId: "animaux4", src: IMGFOLDER + NAV_FOLDER + "niveau2_animaux_ex4.png", "x": 598, "y": 254},
    {id: "animauxEx5", levelId: "animaux5", src: IMGFOLDER + NAV_FOLDER + "niveau2_animaux_ex5.png", "x": 778, "y": 254},
    {id: "animauxEx6", levelId: "animaux6", src: IMGFOLDER + NAV_FOLDER + "niveau2_animaux_ex6.png", "x": 42, "y": 454},
    {id: "animauxEx7", levelId: "animaux7", src: IMGFOLDER + NAV_FOLDER + "niveau2_animaux_ex7.png", "x": 228, "y": 454}
];

var habits_nav_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + NAV_FOLDER + "niveau2_habits_decor.png"},
    //level images
    {id: "habitsEx1", levelId: "habits1", src: IMGFOLDER + NAV_FOLDER + "niveau2_habits_ex1.png", "x": 42, "y": 254},
    {id: "habitsEx2", levelId: "habits2", src: IMGFOLDER + NAV_FOLDER + "niveau2_habits_ex2.png", "x": 228, "y": 254},
    {id: "habitsEx3", levelId: "habits3", src: IMGFOLDER + NAV_FOLDER + "niveau2_habits_ex3.png", "x": 408, "y": 254}
];

var objets_nav_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + NAV_FOLDER + "niveau2_objets_decor.png"},
    //level images
    {id: "objetsEx1", levelId: "objets1", src: IMGFOLDER + NAV_FOLDER + "niveau2_objets_ex1.png", "x": 42, "y": 254},
    {id: "objetsEx2", levelId: "objets2", src: IMGFOLDER + NAV_FOLDER + "niveau2_objets_ex2.png", "x": 228, "y": 254},
    {id: "objetsEx3", levelId: "objets3", src: IMGFOLDER + NAV_FOLDER + "niveau2_objets_ex3.png", "x": 408, "y": 254}
];

var adjectifs_nav_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + NAV_FOLDER + "niveau2_adjectifs_decor.png"},
    //level images
    {id: "adjectifsEx1", levelId: "adjectifs1", src: IMGFOLDER + NAV_FOLDER + "niveau2_adjectifs_ex1.png", "x": 42, "y": 254},
    {id: "adjectifsEx2", levelId: "adjectifs2", src: IMGFOLDER + NAV_FOLDER + "niveau2_adjectifs_ex2.png", "x": 228, "y": 254}
];
/**************************************************************************************************************************/


/*******************************************************LEVEL SPECIFIC FILES ******************************************************/

//keep the levels in the correct order, otherwise it won't work for the score calculations
var levels = [
    {id: "animaux1", theme: "animaux", media: "animaux1_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "animaux2", theme: "animaux", media: "animaux2_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "animaux3", theme: "animaux", media: "animaux3_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "animaux4", theme: "animaux", media: "animaux4_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "animaux5", theme: "animaux", media: "animaux5_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "animaux6", theme: "animaux", media: "animaux6_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "animaux7", theme: "animaux", media: "animaux7_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "habits1", theme: "habits", media: "habits1_fileManifest", interaction: InteractionTypeEnum.FREEDRAG},
    {id: "habits2", theme: "habits", media: "habits2_fileManifest", interaction: InteractionTypeEnum.FREEDRAG},
    {id: "habits3", theme: "habits", media: "habits3_fileManifest", interaction: InteractionTypeEnum.FREEDRAG},
    {id: "objets1", theme: "objets", media: "objets1_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "objets2", theme: "objets", media: "objets2_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "objets3", theme: "objets", media: "objets3_fileManifest", interaction: InteractionTypeEnum.GUIDED},
    {id: "adjectifs1", theme: "adjectifs", media: "adjectifs1_fileManifest", interaction: InteractionTypeEnum.GUIDEDDRAG},
    {id: "adjectifs2", theme: "adjectifs", media: "adjectifs2_fileManifest", interaction: InteractionTypeEnum.GUIDEDDRAG}
];


/***
 * array of files needed in  levels
 * respect the following order
 * first item shall be the background of the scene
 * followed by outline images
 * then clickable images
 * then  level instructions
 * */
var animaux1_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level1/decor_champ.jpg"},
    //image outlines
    {id: "papillon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_papillon_seul.png", "x": 335, "y": 458},
    {id: "oiseau_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_oiseau_seul.png", "x": 389, "y": 150},
    {id: "tortue_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_tortue_seul.png", "x": 493, "y": 295},
    {id: "lapin_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_lapin_seul.png", "x": 130, "y": 280},
    {id: "chat_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_chat_seul.png", "x": 29, "y": 440},
    //level images
    {id: "papillon", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_papillon.png", "x": 790, "y": 35},
    {id: "oiseau", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_oiseau.png", "x": 790, "y": 160},
    {id: "tortue", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_tortue.png", "x": 790, "y": 296},
    {id: "lapin", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_lapin.png", "x": 790, "y": 420},
    {id: "chat", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_chat.png", "x": 790, "y": 576},
    //level sounds
    {id: "papillon_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_6.wav"},
    {id: "oiseau_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_1.wav"},
    {id: "tortue_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_4.wav"},
    {id: "lapin_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_2.wav"},
    {id: "chat_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_3.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux1", src: SNDFOLDER + ANIMAL_FOLDER + "level1/1animaux_serie1_consigne_1.wav"}
];


var animaux2_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_decor_champ2.png"},
    //image outlines
    {id: "abeille_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_abeille_seul.png", "x": 360, "y": 500},
    {id: "poule_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_poule_seul.png", "x": 52, "y": 430},
    {id: "chien_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_chien_seul.png", "x": 148, "y": 539},
    {id: "cochon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_cochon_seul.png", "x": 599, "y": 540},
    {id: "vache_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_vache_seul.png", "x": 460, "y": 300},
    //level images
    {id: "abeille", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_abeille.png", "x": 790, "y": 35},
    {id: "poule", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_poule.png", "x": 790, "y": 146},
    {id: "chien", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_chien.png", "x": 790, "y": 290},
    {id: "cochon", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_cochon.png", "x": 790, "y": 455},
    {id: "vache", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_vache.png", "x": 790, "y": 600},
    //level sounds
    {id: "abeille_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.6.wav"},
    {id: "poule_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.1.wav"},
    {id: "chien_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.3.wav"},
    {id: "cochon_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.4.wav"},
    {id: "vache_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.2.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux2", src: SNDFOLDER + ANIMAL_FOLDER + "level2/1animaux.serie2.consigne.1.wav"}
];

var animaux3_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_decor_ex3.png"},
    //image outlines
    {id: "grenouille_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_grenouille_seul.png", "x": 651, "y": 615},
    {id: "ecureuil_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_ecureuil_seul.png", "x": 42, "y": 425},
    {id: "mouton_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_mouton_seul.png", "x": 519, "y": 448},
    {id: "loup_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_loup_seul.png", "x": 81, "y": 535},
    {id: "biche_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_biche_seul.png", "x": 442, "y": 262},
    //level images
    {id: "grenouille", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_grenouille.png", "x": 790, "y": 35},
    {id: "ecureuil", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_ecureuil.png", "x": 790, "y": 146},
    {id: "mouton", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_mouton.png", "x": 790, "y": 285},
    {id: "loup", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_loup.png", "x": 790, "y": 435},
    {id: "biche", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_biche.png", "x": 790, "y": 600},
    //level sounds
    {id: "grenouille_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.6.wav"},
    {id: "ecureuil_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.3.wav"},
    {id: "mouton_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.5.wav"},
    {id: "loup_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.1.wav"},
    {id: "biche_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.2.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux3", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.consigne.1.wav"}
];

var animaux4_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_decor_ex4.png"},
    //image outlines
    {id: "oie_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_oie_seul.png", "x": 640, "y": 540},
    {id: "dindon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_dindon_seul.png", "x": 48, "y": 400},
    {id: "agneau_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_agneau_seul.png", "x": 135, "y": 570},
    {id: "chevre_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_chevre_seul.png", "x": 425, "y": 370},
    {id: "poney_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_poney_seul.png", "x": 120, "y": 214},
    //level images
    {id: "oie", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_oie.png", "x": 790, "y": 35},
    {id: "dindon", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_dindon.png", "x": 790, "y": 166},
    {id: "agneau", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_agneau.png", "x": 790, "y": 295},
    {id: "chevre", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_chevre.png", "x": 790, "y": 445},
    {id: "poney", src: IMGFOLDER + ANIMAL_FOLDER + "level4/animaux_poney.png", "x": 790, "y": 600},
    //level sounds
    {id: "oie_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level4/1animaux.serie4.4.wav"},
    {id: "dindon_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level4/1animaux.serie4.6.wav"},
    {id: "agneau_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level4/1animaux.serie4.2.wav"},
    {id: "chevre_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level4/1animaux.serie4.5.wav"},
    {id: "poney_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level4/1animaux.serie4.3.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux4", src: SNDFOLDER + ANIMAL_FOLDER + "level4/1animaux.serie4.consigne.1.wav"}
];

var animaux5_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_decor_ex5.png"},
    //image outlines
    {id: "singe_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_singe_seul.png", "x": 250, "y": 77},
    {id: "lion_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_lion_seul.png", "x": 440, "y": 270},
    {id: "crocodile_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_crocodile_seul.png", "x": 360, "y": 650},
    {id: "elephant_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_elephant_seul.png", "x": 70, "y": 430},
    {id: "girafe_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_girafe_seul.png", "x": 70, "y": 214},
    //level images
    {id: "singe", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_singe.png", "x": 790, "y": 35},
    {id: "lion", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_lion.png", "x": 790, "y": 145},
    {id: "crocodile", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_crocodile.png", "x": 790, "y": 265},
    {id: "elephant", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_elephant.png", "x": 790, "y": 360},
    {id: "girafe", src: IMGFOLDER + ANIMAL_FOLDER + "level5/animaux_girafe.png", "x": 790, "y": 530},
    //level sounds
    {id: "singe_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level5/1animaux.serie5.4.wav"},
    {id: "lion_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level5/1animaux.serie5.3.wav"},
    {id: "crocodile_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level5/1animaux.serie5.5.wav"},
    {id: "elephant_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level5/1animaux.serie5.1.wav"},
    {id: "girafe_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level5/1animaux.serie5.2.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux5", src: SNDFOLDER + ANIMAL_FOLDER + "level5/1animaux.serie5.consigne.1.wav"}
];

var animaux6_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_decor_ex6.png"},
    //image outlines
    {id: "poisson_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_poisson_seul.png", "x": 640, "y": 660},
    {id: "phoque_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_phoque_seul.png", "x": 86, "y": 320},
    {id: "pinguin_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_pinguin_seul.png", "x": 500, "y": 370},
    {id: "ours_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_ours_seul.png", "x": 285, "y": 190},
    {id: "baleine_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_baleine_seul.png", "x": 40, "y": 495},
    //level images
    {id: "poisson", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_poisson.png", "x": 790, "y": 35},
    {id: "phoque", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_phoque.png", "x": 790, "y": 166},
    {id: "pinguin", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_pinguin.png", "x": 790, "y": 310},
    {id: "ours", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_ours.png", "x": 790, "y": 465},
    {id: "baleine", src: IMGFOLDER + ANIMAL_FOLDER + "level6/animaux_baleine.png", "x": 790, "y": 615},
    //level sounds
    {id: "poisson_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level6/1animaux.serie6.6.wav"},
    {id: "phoque_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level6/1animaux.serie6.5.wav"},
    {id: "pinguin_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level6/1animaux.serie6.2.wav"},
    {id: "ours_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level6/1animaux.serie6.1.wav"},
    {id: "baleine_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level6/1animaux.serie6.4.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux6", src: SNDFOLDER + ANIMAL_FOLDER + "level6/1animaux.serie6.consigne.1.wav"}
];

var animaux7_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_decor_ex7.png"},
    //image outlines
    {id: "tigre_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_tigre_seul.png", "x": 440, "y": 390},
    {id: "gazelle_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_gazelle_seul.png", "x": 610, "y": 180},
    {id: "zebre_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_zebre_seul.png", "x": 45, "y": 320},
    {id: "hippopotame_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_hippopotame_seul.png", "x": 400, "y": 580},
    {id: "buffle_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_buffle_seul.png", "x": 40, "y": 514},
    //level images
    {id: "tigre", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_tigre.png", "x": 790, "y": 35},
    {id: "gazelle", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_gazelle.png", "x": 790, "y": 166},
    {id: "zebre", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_zebre.png", "x": 790, "y": 320},
    {id: "hippopotame", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_hippopotame.png", "x": 790, "y": 465},
    {id: "buffle", src: IMGFOLDER + ANIMAL_FOLDER + "level7/animaux_buffle.png", "x": 790, "y": 605},
    //level sounds
    {id: "tigre_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level7/1animaux.serie7.3.wav"},
    {id: "gazelle_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level7/1animaux.serie7.5.wav"},
    {id: "zebre_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level7/1animaux.serie7.2.wav"},
    {id: "hippopotame_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level7/1animaux.serie7.4.wav"},
    {id: "buffle_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level7/1animaux.serie7.1.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux7", src: SNDFOLDER + ANIMAL_FOLDER + "level7/1animaux.serie7.consigne.1.wav"}
];
var habits1_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + "habits/level1/habits_decor_ex1.png"},
    //image outlines
    {id: "chaussettes_outline", src: IMGFOLDER + "habits/level1/habits_chaussettes_seul.png", "x": 413, "y": 640, width:190, height:70},
    {id: "baskets_outline", src: IMGFOLDER + "habits/level1/habits_baskets_seul.png", "x": 413, "y": 660, width:200, height:50},
    {id: "pantalon_outline", src: IMGFOLDER + "habits/level1/habits_pantalon_seul.png", "x": 445, "y": 465, width:145, height:200},
    {id: "pull_outline", src: IMGFOLDER + "habits/level1/habits_pull_seul.png", "x": 370, "y": 338, width:270, height:125},
    {id: "mouffles_outline", src: IMGFOLDER + "habits/level1/habits_mouffles_seul.png", "x": 335, "y": 450, width:350, height:70},
    {id: "manteau_outline", src: IMGFOLDER + "habits/level1/habits_manteau_seul.png", "x": 357, "y": 337, width:300, height:250},
    //level images
    {id: "chaussettes", src: IMGFOLDER + "habits/level1/habits_chaussettes.png", "x": 790, "y": 212},
    {id: "baskets", src: IMGFOLDER + "habits/level1/habits_baskets.png", "x": 36, "y": 383},
    {id: "pantalon", src: IMGFOLDER + "habits/level1/habits_pantalon.png", "x": 36, "y": 550},
    {id: "pull", src: IMGFOLDER + "habits/level1/habits_pull.png", "x": 790, "y": 357},
    {id: "mouffles", src: IMGFOLDER + "habits/level1/habits_mouffles.png", "x": 36, "y": 212},
    {id: "manteau", src: IMGFOLDER + "habits/level1/habits_manteau.png", "x": 790, "y": 540},
    //level sounds
    {id: "chaussettes_snd", src: SNDFOLDER + "habits/level1/2habit.ex1.serie1.3.wav"},
    {id: "baskets_snd", src: SNDFOLDER + "habits/level1/2habit.ex1.serie1.4.wav"},
    {id: "pantalon_snd", src: SNDFOLDER + "habits/level1/2habit.ex1.serie1.2.wav"},
    {id: "pull_snd", src: SNDFOLDER + "habits/level1/2habit.ex1.serie1.1.wav"},
    {id: "mouffles_snd", src: SNDFOLDER + "habits/level1/2habit.ex1.serie1.6.wav"},
    {id: "manteau_snd", src: SNDFOLDER + "habits/level1/2habit.ex1.serie1.5.wav"},
    //level sound confirmations
    {id: "conf_chaussettes_snd", src: SNDFOLDER + "habits/level1/chaussettes.wav"},
    {id: "conf_baskets_snd", src: SNDFOLDER + "habits/level1/baskets.wav"},
    {id: "conf_pantalon_snd", src: SNDFOLDER + "habits/level1/pantalon.wav"},
    {id: "conf_pull_snd", src: SNDFOLDER + "habits/level1/pull.wav"},
    {id: "conf_mouffles_snd", src: SNDFOLDER + "habits/level1/mouffles.wav"},
    {id: "conf_manteau_snd", src: SNDFOLDER + "habits/level1/manteau.wav"},
    //instruction and feedback sounds
    {id: "consignes_habits1", src: SNDFOLDER + "habits/level1/2habit.ex1.consigne1.wav"}
];

var habits2_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + "habits/level2/habits_decor_ex2.png"},
    //image outlines
    {id: "chaussures_outline", src: IMGFOLDER + "habits/level2/habits_chaussures_seul.png", "x": 410, "y": 660, width:195, height:40},
    {id: "lunettes_outline", src: IMGFOLDER + "habits/level2/habits_lunettes_seul.png", "x": 400, "y": 253, width:215, height:40},
    {id: "casquette_outline", src: IMGFOLDER + "habits/level2/habits_casquette_seul.png", "x": 360, "y": 136, width:250, height:130},
    {id: "montre_outline", src: IMGFOLDER + "habits/level2/habits_montre_seul.png", "x": 370, "y": 440, width:50, height:50},
    {id: "tshirt_outline", src: IMGFOLDER + "habits/level2/habits_tshirt_seul.png", "x": 417, "y": 338, width:180, height:130},
    {id: "short_outline", src: IMGFOLDER + "habits/level2/habits_short_seul.png", "x": 450, "y": 458, width:120, height:90},
    //level images
    {id: "chaussures", src: IMGFOLDER + "habits/level2/habits_chaussures.png", "x": 790, "y": 212},
    {id: "lunettes", src: IMGFOLDER + "habits/level2/habits_lunettes.png", "x": 36, "y": 580},
    {id: "casquette", src: IMGFOLDER + "habits/level2/habits_casquette.png", "x": 36, "y": 420},
    {id: "montre", src: IMGFOLDER + "habits/level2/habits_montre.png", "x": 790, "y": 357},
    {id: "tshirt", src: IMGFOLDER + "habits/level2/habits_tshirt.png", "x": 36, "y": 212},
    {id: "short", src: IMGFOLDER + "habits/level2/habits_short.png", "x": 790, "y": 520},
    //level sounds
    {id: "chaussures_snd", src: SNDFOLDER + "habits/level2/2habit.ex2.serie1.4.wav"},
    {id: "casquette_snd", src: SNDFOLDER + "habits/level2/2habit.ex2.serie1.3.wav"},
    {id: "lunettes_snd", src: SNDFOLDER + "habits/level2/2habit.ex2.serie1.5.wav"},
    {id: "montre_snd", src: SNDFOLDER + "habits/level2/2habit.ex2.serie1.6.wav"},
    {id: "tshirt_snd", src: SNDFOLDER + "habits/level2/2habit.ex2.serie1.2.wav"},
    {id: "short_snd", src: SNDFOLDER + "habits/level2/2habit.ex2.serie1.1.wav"},
    //level sound confirmations
    {id: "conf_chaussures_snd", src: SNDFOLDER + "habits/level2/chaussures.wav"},
    {id: "conf_casquette_snd", src: SNDFOLDER + "habits/level2/casquette.wav"},
    {id: "conf_lunettes_snd", src: SNDFOLDER + "habits/level2/lunettes.wav"},
    {id: "conf_montre_snd", src: SNDFOLDER + "habits/level2/montre.wav"},
    {id: "conf_tshirt_snd", src: SNDFOLDER + "habits/level2/tshirt.wav"},
    {id: "conf_short_snd", src: SNDFOLDER + "habits/level2/short.wav"},
    //instruction and feedback sounds
    {id: "consignes_habits2", src: SNDFOLDER + "habits/level2/2habit.ex2.consigne1.wav"}
];

var habits3_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + "habits/level3/habits_decor_ex3.png"},
    //image outlines
    {id: "blouse_outline", src: IMGFOLDER + "habits/level3/habits_blouse_seul.png", "x": 371, "y": 333, width:203, height:125},
    {id: "collants_outline", src: IMGFOLDER + "habits/level3/habits_collants_seul.png", "x": 413, "y": 460, width:200, height:250},
    {id: "jupe_outline", src: IMGFOLDER + "habits/level3/habits_jupe_seul.png", "x": 411, "y": 460, width:200, height:110},
    {id: "veste_outline", src: IMGFOLDER + "habits/level3/habits_veste_seul.png", "x": 370, "y": 334, width:290, height:150},
    {id: "bottes_outline", src: IMGFOLDER + "habits/level3/habits_bottes_seul.png", "x": 410, "y": 647, width:200, height:70},
    {id: "foulard_outline", src: IMGFOLDER + "habits/level3/habits_foulard_seul.png", "x": 410, "y": 305, width:180, height:110},
    //level images
    {id: "blouse", src: IMGFOLDER + "habits/level3/habits_blouse.png", "x": 790, "y": 212},
    {id: "collants", src: IMGFOLDER + "habits/level3/habits_collants.png", "x": 36, "y": 510},
    {id: "jupe", src: IMGFOLDER + "habits/level3/habits_jupe.png", "x": 36, "y": 340},
    {id: "veste", src: IMGFOLDER + "habits/level3/habits_veste.png", "x": 790, "y": 400},
    {id: "bottes", src: IMGFOLDER + "habits/level3/habits_bottes.png", "x": 36, "y": 212},
    {id: "foulard", src: IMGFOLDER + "habits/level3/habits_foulard.png", "x": 790, "y": 580},
    //level sounds
    {id: "blouse_snd", src: SNDFOLDER + "habits/level3/2habit.ex2.serie1.3.wav"},
    {id: "collants_snd", src: SNDFOLDER + "habits/level3/2habit.ex2.serie1.2.wav"},
    {id: "jupe_snd", src: SNDFOLDER + "habits/level3/2habit.ex2.serie1.1.wav"},
    {id: "veste_snd", src: SNDFOLDER + "habits/level3/2habit.ex2.serie1.4.wav"},
    {id: "bottes_snd", src: SNDFOLDER + "habits/level3/2habit.ex2.serie1.5.wav"},
    {id: "foulard_snd", src: SNDFOLDER + "habits/level3/2habit.ex2.serie1.6.wav"},
    //level sound confirmations
    {id: "conf_blouse_snd", src: SNDFOLDER + "habits/level3/blouse.wav"},
    {id: "conf_collants_snd", src: SNDFOLDER + "habits/level3/collants.wav"},
    {id: "conf_jupe_snd", src: SNDFOLDER + "habits/level3/jupe.wav"},
    {id: "conf_veste_snd", src: SNDFOLDER + "habits/level3/veste.wav"},
    {id: "conf_bottes_snd", src: SNDFOLDER + "habits/level3/bottes.wav"},
    {id: "conf_foulard_snd", src: SNDFOLDER + "habits/level3/foulard.wav"},
    //instruction and feedback sounds
    {id: "consignes_habits3", src: SNDFOLDER + "habits/level3/2habit.ex1.consigne1.wav"}
];


var objets1_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + "objets/level1/objets_decor.png"},
    //level images
    {id: "avion", src: IMGFOLDER + "objets/level1/objets_avion.png", "x": 470, "y": 490},
    {id: "balle", src: IMGFOLDER + "objets/level1/objets_balle.png", "x": 769, "y": 640},
    {id: "cles", src: IMGFOLDER + "objets/level1/objets_cles.png", "x": 546, "y": 645},
    {id: "poupee", src: IMGFOLDER + "objets/level1/objets_poupee.png", "x": 484, "y": 188},
    {id: "livre", src: IMGFOLDER + "objets/level1/objets_livre.png", "x": 180, "y": 463},
    {id: "tasse", src: IMGFOLDER + "objets/level1/objets_tasse.png", "x": 280, "y": 604},
    //level sounds
    {id: "avion_snd", src: SNDFOLDER + "objets/level1/3objets.serie1.3.wav"},
    {id: "balle_snd", src: SNDFOLDER + "objets/level1/3objets.serie1.4.wav"},
    {id: "cles_snd", src: SNDFOLDER + "objets/level1/3objets.serie1.2.wav"},
    {id: "poupee_snd", src: SNDFOLDER + "objets/level1/3objets.serie1.6.wav"},
    {id: "livre_snd", src: SNDFOLDER + "objets/level1/3objets.serie1.5.wav"},
    {id: "tasse_snd", src: SNDFOLDER + "objets/level1/3objets.serie1.1.wav"},
    //instruction and feedback sounds
    {id: "consignes_objets1", src: SNDFOLDER + "objets/level1/3objets.consigne.1.wav"}
];

var objets2_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + "objets/level2/objets_decor.png"},
    //level images
    {id: "ballon", src: IMGFOLDER + "objets/level2/objets_ballon.png", "x": 63, "y": 216},
    {id: "biberon", src: IMGFOLDER + "objets/level2/objets_biberon.png", "x": 816, "y": 435},
    {id: "telephone", src: IMGFOLDER + "objets/level2/objets_telephone.png", "x": 608, "y": 242},
    {id: "cadeau", src: IMGFOLDER + "objets/level2/objets_cadeau.png", "x": 270, "y": 550},
    {id: "verre", src: IMGFOLDER + "objets/level2/objets_verre.png", "x": 450, "y": 480},
    {id: "voiture", src: IMGFOLDER + "objets/level2/objets_voiture.png", "x": 680, "y": 625},
    //level sounds
    {id: "ballon_snd", src: SNDFOLDER + "objets/level2/3objets.serie2.5.wav"},
    {id: "biberon_snd", src: SNDFOLDER + "objets/level2/3objets.serie2.3.wav"},
    {id: "telephone_snd", src: SNDFOLDER + "objets/level2/3objets.serie2.2.wav"},
    {id: "cadeau_snd", src: SNDFOLDER + "objets/level2/3objets.serie2.6.wav"},
    {id: "verre_snd", src: SNDFOLDER + "objets/level2/3objets.serie2.1.wav"},
    {id: "voiture_snd", src: SNDFOLDER + "objets/level2/3objets.serie2.4.wav"},
    //instruction and feedback sounds
    {id: "consignes_objets2", src: SNDFOLDER + "objets/level2/3objets.consigne.1.wav"}
];

var objets3_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + "objets/level2/objets_decor.png"},
    //level images
    {id: "bouteille", src: IMGFOLDER + "objets/level3/objets_bouteille.png", "x": 99, "y": 180},
    {id: "cadeau_v2", src: IMGFOLDER + "objets/level3/objets_cadeau_v2.png", "x": 800, "y": 435},
    {id: "lampe", src: IMGFOLDER + "objets/level3/objets_lampe.png", "x": 430, "y": 450},
    {id: "poubelle", src: IMGFOLDER + "objets/level3/objets_poubelle.png", "x": 840, "y": 500},
    {id: "sirop", src: IMGFOLDER + "objets/level3/objets_sirop.png", "x": 593, "y": 370},
    {id: "train", src: IMGFOLDER + "objets/level3/objets_train.png", "x": 185, "y": 630},
    //level sounds
    {id: "bouteille_snd", src: SNDFOLDER + "objets/level3/3objets.serie3.5.wav"},
    {id: "cadeau_v2_snd", src: SNDFOLDER + "objets/level3/3objets.serie3.4.wav"},
    {id: "lampe_snd", src: SNDFOLDER + "objets/level3/3objets.serie4.4.wav"},
    {id: "poubelle_snd", src: SNDFOLDER + "objets/level3/3objets.serie4.6.wav"},
    {id: "sirop_snd", src: SNDFOLDER + "objets/level3/3objets.serie3.2.wav"},
    {id: "train_snd", src: SNDFOLDER + "objets/level3/3objets.serie3.3.wav"},
    //instruction and feedback sounds
    {id: "consignes_objets3", src: SNDFOLDER + "objets/level3/3objets.consigne.1.wav"}
];

var adjectifs1_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + "adjectifs/level1/adjectifs_cartes_ex1_decor.png"},
    //level outlines
    {id: "chaud_outline", src: IMGFOLDER + "adjectifs/level1/adjectifs_chaud_decor.png", "x": 130, "y": 428, width:300, height:300},
    {id: "froid_outline", src: IMGFOLDER + "adjectifs/level1/adjectifs_froid_decor.png", "x": 427, "y": 428, width:300, height:300},
    {id: "grand_outline", src: IMGFOLDER + "adjectifs/level1/adjectifs_grand_decor.png", "x": 427, "y": 128, width:300, height:300},
    {id: "petit_outline", src: IMGFOLDER + "adjectifs/level1/adjectifs_petit_decor.png", "x": 130, "y": 128, width:300, height:300},
    
    //level clickable items
    {id: "chaud", src: IMGFOLDER + "adjectifs/level1/adjectifs_chaud.png", "x": 818, "y": 575},
    {id: "froid", src: IMGFOLDER + "adjectifs/level1/adjectifs_froid.png", "x": 818, "y": 410},
    {id: "grand", src: IMGFOLDER + "adjectifs/level1/adjectifs_grand.png", "x": 818, "y": 240},
    {id: "petit", src: IMGFOLDER + "adjectifs/level1/adjectifs_petit.png", "x": 818, "y": 75},
    
    //level sounds
    {id: "chaud_snd", src: SNDFOLDER + "adjectifs/level1/9adjectifs.chaud.wav"},
    {id: "froid_snd", src: SNDFOLDER + "adjectifs/level1/9adjectifs.froid.wav"},
    {id: "grand_snd", src: SNDFOLDER + "adjectifs/level1/9adjectifs.grand.wav"},
    {id: "petit_snd", src: SNDFOLDER + "adjectifs/level1/9adjectifs.petit.wav"},
   
    //instruction and feedback sounds
    {id: "consignes_adjectifs1", src: SNDFOLDER + "adjectifs/level1/9adjectifs.consigne.1.wav"}
];


var adjectifs2_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + "adjectifs/level2/adjectifs_cartes_ex2_decor.png"},
    //level outlines
    {id: "couche_outline", src: IMGFOLDER + "adjectifs/level2/adjectifs_couche_decor.png", "x": 130, "y": 428, width:300, height:300},
    {id: "debout_outline", src: IMGFOLDER + "adjectifs/level2/adjectifs_debout_decor.png", "x": 427, "y": 428, width:300, height:300},
    {id: "ferme_outline", src: IMGFOLDER + "adjectifs/level2/adjectifs_ferme_decor.png", "x": 427, "y": 128, width:300, height:300},
    {id: "ouvert_outline", src: IMGFOLDER + "adjectifs/level2/adjectifs_ouvert_decor.png", "x": 130, "y": 128, width:300, height:300},
    
    //level clickable items
    {id: "couche", src: IMGFOLDER + "adjectifs/level2/adjectifs_couche.png", "x": 818, "y": 575},
    {id: "debout", src: IMGFOLDER + "adjectifs/level2/adjectifs_debout.png", "x": 818, "y": 410},
    {id: "ferme", src: IMGFOLDER + "adjectifs/level2/adjectifs_ferme.png", "x": 818, "y": 240},
    {id: "ouvert", src: IMGFOLDER + "adjectifs/level2/adjectifs_ouvert.png", "x": 818, "y": 75},
    
    //level sounds
    {id: "couche_snd", src: SNDFOLDER + "adjectifs/level2/9adjectifs.couche.wav"},
    {id: "debout_snd", src: SNDFOLDER + "adjectifs/level2/9adjectifs.debout.wav"},
    {id: "ferme_snd", src: SNDFOLDER + "adjectifs/level2/9adjectifs.ferme.wav"},
    {id: "ouvert_snd", src: SNDFOLDER + "adjectifs/level2/9adjectifs.ouvert.wav"},
   
    //instruction and feedback sounds
    {id: "consignes_adjectifs2", src: SNDFOLDER + "adjectifs/level2/9adjectifs.consigne.1.wav"}
];


/**************************************************************************************************************************/



/************************************************CONTAINERS FOR ALL THE OTHER MANIFESTS **************************************************************************/

/*these files are the ones that are loaded in the beggining of the game
 * they are the most needed for the player to start playing*/
var coreFiles = [interLevel_fileManifest, nav_fileManifest, feedback_fileManifest, speakerIconFile, backButtonFile, introImg,
                 animaux_nav_fileManifest, habits_nav_fileManifest, objets_nav_fileManifest, adjectifs_nav_fileManifest];
             
/**************************************************************************************************************************/