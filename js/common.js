// create a namespace for the application
this.Moulin = this.Moulin || {};

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

var themes = [
    {id: "nav"},
    {id: "animaux"},
    {id: "habits"},
    {id: "objets"}
];

//keep the levels in the correct order, otherwise it won't work for the score calculations
var levels = [
    {id: "score", theme: "score", media: "interLevel_fileManifest"},
    {id: "animaux1", theme: "animaux", media: "animaux1_fileManifest"},
    {id: "animaux2", theme: "animaux", media: "animaux2_fileManifest"},
    {id: "animaux3", theme: "animaux", media: "animaux3_fileManifest"}
    /*{id:"habits1" , theme:"habits", media:"habits1_fileManifest"}*/
];

var userScore = [
    {user: "test", levelId: "animaux1", theme: "animaux", score: 1},
    {user: "test", levelId: "animaux2", theme: "animaux", score: 2}
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

var interLevel_fileManifest = [
    {id: "menu", src: IMGFOLDER + NAV_FOLDER + "menu.png", "x": 180, "y": 400},
    {id: "replay", src: IMGFOLDER + NAV_FOLDER + "replay.png", "x": 410, "y": 400},
    {id: "next", src: IMGFOLDER + NAV_FOLDER + "next.png", "x": 630, "y": 400}
];

var nav_fileManifest = [
    //background
    {id: "scene", src: IMGFOLDER + NAV_FOLDER + "niveau1_decor_grand.png"},
    //level images
    {id: "animaux", src: IMGFOLDER + NAV_FOLDER + "niveau1_animaux.png", "x": 42, "y": 184},
    /*{id: "habits", src: IMGFOLDER + NAV_FOLDER + "niveau1_habits.png", "x": 238, "y": 184},*/
    //instruction and feedback sounds
    {id: "intro_fb", src: SNDFOLDER + NAV_FOLDER + "intro.wav"},
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
    {id: "papillon", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_papillon.png", "x": 790, "y": 27},
    {id: "oiseau", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_oiseau.png", "x": 790, "y": 153},
    {id: "tortue", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_tortue.png", "x": 790, "y": 290},
    {id: "lapin", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_lapin.png", "x": 790, "y": 413},
    /* {id: "canard", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_canard.png", "x": 818, "y": 447},*/
    {id: "chat", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_chat.png", "x": 790, "y": 570},
    //image outlines
    {id: "papillon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_papillon_seul.png", "x": 335, "y": 458},
    {id: "oiseau_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_oiseau_seul.png", "x": 389, "y": 150},
    {id: "tortue_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_tortue_seul.png", "x": 493, "y": 295},
    {id: "lapin_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level1/animaux_lapin_seul.png", "x": 130, "y": 280},
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
    {id: "abeille", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_abeille.png", "x": 790, "y": 35},
    /*{id: "souris", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_souris.png", "x": 818, "y": 123},*/
    {id: "poule", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_poule.png", "x": 790, "y": 146},
    {id: "chien", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_chien.png", "x": 790, "y": 290},
    {id: "cochon", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_cochon.png", "x": 790, "y": 455},
    {id: "vache", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_vache.png", "x": 790, "y": 600},
    //image outlines
    {id: "abeille_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_abeille_seul.png", "x": 360, "y": 500},
    /*{id: "souris_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_souris_seul.png", "x": 432, "y": 716},*/
    {id: "poule_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_poule_seul.png", "x": 52, "y": 430},
    {id: "chien_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_chien_seul.png", "x": 148, "y": 539},
    {id: "cochon_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_cochon_seul.png", "x": 599, "y": 540},
    {id: "vache_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level2/animaux_vache_seul.png", "x": 460, "y": 300},
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
    {id: "scene", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_decor_ex3.png"},
    //level images
    {id: "grenouille", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_grenouille.png", "x": 790, "y": 35},
    {id: "ecureuil", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_ecureuil.png", "x": 790, "y": 146},
    {id: "mouton", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_mouton.png", "x": 790, "y": 285},
    {id: "loup", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_loup.png", "x": 790, "y": 435},
    {id: "biche", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_biche.png", "x": 790, "y": 600},
    //image outlines
    {id: "grenouille_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_grenouille_seul.png", "x": 651, "y": 615},
    {id: "ecureuil_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_ecureuil_seul.png", "x": 42, "y": 425},
    {id: "mouton_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_mouton_seul.png", "x": 519, "y": 448},
    {id: "loup_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_loup_seul.png", "x": 81, "y": 535},
    {id: "biche_outline", src: IMGFOLDER + ANIMAL_FOLDER + "level3/animaux_biche_seul.png", "x": 442, "y": 262},
    //level sounds
    {id: "grenouille_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.6.wav"},
    {id: "ecureuil_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.3.wav"},
    {id: "mouton_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.5.wav"},
    {id: "loup_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.1.wav"},
    {id: "biche_snd", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.2.wav"},
    //instruction and feedback sounds
    {id: "consignes_animaux3", src: SNDFOLDER + ANIMAL_FOLDER + "level3/1animaux.serie3.consigne.1.wav"},
];


var allFiles = [interLevel_fileManifest, nav_fileManifest, animaux1_fileManifest, animaux2_fileManifest, animaux3_fileManifest, feedback_fileManifest, animaux_nav_fileManifest];


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
    }
};