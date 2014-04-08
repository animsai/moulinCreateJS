(function() {

    var LoadingBar = function(width, height, padding, color, frameColor) {

        //setting default values for our arguments if no value is given
        width = typeof width !== 'undefined' ? width : 300;
        height = typeof height !== 'undefined' ? height : 20;
        padding = typeof padding !== 'undefined' ? padding : 3;
        color = typeof color !== 'undefined' ? color : "black";
        frameColor = typeof frameColor !== 'undefined' ? frameColor : "black";

        //calling the initialize function we will write
        this.initialize(width, height, padding, color, frameColor);
    };

    //LoadingBar will inherit from the Container class
    LoadingBar.prototype = new createjs.Container();

    //saving the old initialize function of the container class cause we are overwriting it
    //we will call the container initialize function in our own initialize
    LoadingBar.prototype.Container_initialize = LoadingBar.prototype.initialize;

    //the initialize function for our LoadingBar class
    LoadingBar.prototype.initialize = function(width, height, padding, color, frameColor) {

        //calling tha saved initialize function of the Container class
        this.Container_initialize();

        //the height, width, padding, color and frame color of the loading bar
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.color = color;
        this.frameColor = frameColor;

        //placing of the container
        this.x = 10;//Math.round(window.screen.width / 2 - this.width / 2);
        this.y =  25;//Math.round(window.screen.height / 2 - this.height / 2);

        //creating the loading bar   
        this.loadingBar = new createjs.Shape();
        this.loadingBar.graphics.beginFill(this.color).drawRect(0, 0, 1, this.height).endFill();

        //creating the frame around the loading bar
        this.frame = new createjs.Shape();
        this.frame.graphics.setStrokeStyle(1).beginStroke(this.frameColor).drawRect(-this.padding / 2, -this.padding / 2, this.width + this.padding, this.height + this.padding).endStroke();

        //adding the loading bar and the frame to our container
        this.addChild(this.loadingBar, this.frame);
    };

    Moulin.LoadingBar = LoadingBar;
}());


(function() {
    var LoadingBarText = function(label, fontSize, fontColor, lineWidth, textAlign, loadingBarHeight) {

        //setting default values for our arguments if no value is given
        label = typeof label !== 'undefined' ? label : "";
        fontSize = typeof fontSize !== 'undefined' ? fontSize : "1em Verdana";
        fontColor = typeof fontColor !== 'undefined' ? fontColor : "black";
        lineWidth = typeof lineWidth !== 'undefined' ? lineWidth : 300;
        textAlign = typeof textAlign !== 'undefined' ? textAlign : "center";
        loadingBarHeight = typeof loadingBarHeight !== 'undefined' ? loadingBarHeight : 50;

        //calling the initialize function we will write
        this.initialize(label, fontSize, fontColor, lineWidth, textAlign, loadingBarHeight);
    };
    
     //LoadingBar will inherit from the TextJs class
    LoadingBarText.prototype = new createjs.Text();
    LoadingBarText.prototype.Text_initialize = LoadingBarText.prototype.initialize;
 //the initialize function for our LoadingBar class
    LoadingBarText.prototype.initialize = function(label, fontSize, fontColor, lineWidth, textAlign, loadingBarHeight) {
            //super constructor
         this.Text_initialize(label, fontSize, fontColor);
         this.lineWidth = lineWidth;
         //this.textAlign = textAlign;
         this.x = 100;//Math.round(window.screen.width / 2) ;
         this.y = 0;//Math.round(window.screen.height / 2)- loadingBarHeight;
    };
    
    LoadingBarText.prototype.setText = function(label){
        this.text = label;
    };

    Moulin.LoadingBarText = LoadingBarText;
}());