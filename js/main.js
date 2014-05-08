 /* 
 * launches the game and sets the onresize button for the window
 * Author : J. Travnjak
 * Date : may 2014
 */
function init() {
    game = new Moulin();
    game.init();
}

window.onresize = function()
{
    game.onResize();
};

