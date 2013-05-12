
// Screen objektist pärinevad kõik erinevad mängu nn screenid,
// näiteks "Loading..", "High score", "ingame" ehk mäng ise ka.
// (vt http://www.melonjs.org/docs/symbols/me.ScreenObject.html)
var PlayScreen = me.ScreenObject.extend({

    // where lives will be rendered in-play
    livesPlaceholder: null,

    // and where score will be rendered in-play
    scorePlaceholder: null,

    // constructor
    init: function(settings) {
        this.parent(true);

        this.font = new me.Font("Verdana", 15, "cyan");
        this.font.bold();

        this.livesPlaceholder = document.getElementById("lives");
        this.scorePlaceholder = document.getElementById("score");
    },

    onResetEvent: function () {
        // levelDirector tegeleb leveli jaoks vajalike ressursside
        // laadimise ning haldamisega. Käseme tal level1 sisse laadida:
        // (vt http://www.melonjs.org/docs/symbols/me.levelDirector.html)
        me.levelDirector.loadLevel("level1");
    },

    update: function() {
        this.livesPlaceholder.replaceChild(document.createTextNode(window.bomberman.player.lives),
            this.livesPlaceholder.firstChild);
        this.scorePlaceholder.replaceChild(document.createTextNode(window.bomberman.player.score),
            this.scorePlaceholder.firstChild);
        return true;
    }
});
