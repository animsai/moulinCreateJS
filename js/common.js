// create a namespace for the application
this.Moulin = this.Moulin || {};

var keepAspectRatio = true;
var imgFolder = "./media/images/";
var sndFolder = "./media/sounds/";
var stage;

var animalFolder = "animaux/";
var fbFolder = "feedbacks/";


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

