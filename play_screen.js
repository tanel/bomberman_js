
// Screen objektist pärinevad kõik erinevad mängu nn screenid,
// näiteks "Loading..", "High score", "ingame" ehk mäng ise ka.
// (vt http://www.melonjs.org/docs/symbols/me.ScreenObject.html)
var PlayScreen = me.ScreenObject.extend({

    score: null,
    lives: null,

    // constructor
    init: function(settings) {
        this.parent(true);
    },

    onResetEvent: function () {
        // levelDirector tegeleb leveli jaoks vajalike ressursside
        // laadimise ning haldamisega. Käseme tal level1 sisse laadida:
        // (vt http://www.melonjs.org/docs/symbols/me.levelDirector.html)
        me.levelDirector.loadLevel("level1");

        // add the "score" HUD item
        if (!this.score) {
            this.score = new ScoreObject(10, 40);
            me.game.HUD.addItem("score", this.score);
        }

        // add the "lives" HUD item
        if (!this.lives) {
            this.lives = new LivesObject(me.video.getWidth() - 200, 40);
            me.game.HUD.addItem("lives", this.lives);
        }
    }
});
