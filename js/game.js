(function() {
    function Game() {
        this.init();
    }

    Game.prototype = {
        levelSndManifest:null,
        src:null,
        soundInstance:null,  // the soundInstance returned by Sound when we create or play a src
	loadProxy:null,
        init: function() {
           
            // this does two things, it initializes the default plugins, and if that fails the if statement triggers and we display an error
            // NOTE that WebAudioPlugin plays an empty sound when initialized, which activates web audio on iOS if played inside of a function with a touch event in its callstack
            if (!createjs.Sound.initializeDefaultPlugins()) {
              
                return;
            }

            // Create a single item to load.
            var sndFolder = "./media/sounds/";
            this.levelSndManifest = [
                    {id:"intro", src: sndFolder + "intro.wav"},
                    {id:"test", src: sndFolder + "test.wav"}];
        
           // NOTE createjs.proxy is used to apply scope so we stay within the touch scope, allowing sound to play on mobile devices
            this.loadProxy = createjs.proxy(this.handleLoad, this);
            createjs.Sound.addEventListener("fileload", this.loadProxy); // add event listener for when load is completed.
            createjs.Sound.registerManifest(this.levelSndManifest, sndFolder);  // register sound, which preloads by default

            return this;
        },
        handleLoad: function(event) {
            createjs.Sound.play(event.src);
            //this.displayMessage.innerHTML = "Playing " + event.src;
        }
    }

    window.Game = Game;
}());