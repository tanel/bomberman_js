
// Screen objektist pärinevad kõik erinevad mängu nn screenid,
// näiteks "Loading..", "High score", "ingame" ehk mäng ise ka.
// (vt http://www.melonjs.org/docs/symbols/me.ScreenObject.html)
var PlayScreen = me.ScreenObject.extend({

    // constructor
    init: function(settings) {
        this.parent(true);
        this.font = new me.Font("Verdana", 15, "cyan");
        this.font.bold();
    },

    onResetEvent: function () {
        // levelDirector tegeleb leveli jaoks vajalike ressursside
        // laadimise ning haldamisega. Käseme tal level1 sisse laadida:
        // (vt http://www.melonjs.org/docs/symbols/me.levelDirector.html)
        me.levelDirector.loadLevel("level1");
    },

    draw: function(context) {
        this.font.draw(context, "Player HP: " + window.bomberman.player.hp, 121, 21);
        this.font.draw(context, "Score: " + window.bomberman.player.score, 530, 21);
        if (!this.totalNumberOfEnemies) {
            this.font.draw(context, "Stage cleared!", 310, 21);
        }
    }
});

var ScoreScreen = me.ScreenObject.extend({});

var TitleScreen = me.ScreenObject.extend({

    // constructor
    init: function() {
        this.parent(true);

        // title screen image
        this.title = null;

        // font to display the menu items
        this.titlefont = new me.Font("Cursive", 40, "yellow", "center");
        this.font = new me.Font("Cursive", 20, "yellow", "center");
    },

    onResetEvent: function() {
        if (!this.title) {
            // init stuff if not yet done
            this.title = me.loader.getImage("flame");
        }

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    },

    update: function() {
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
            return true;
        }
        return false;
    },

    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 425);
        this.font.draw(context, "PRESS ENTER TO PLAY", 400, 300);
        this.titlefont.draw(context, "BOMBERMAN", 400, 25);

        this.font.draw(context, "YOUR MISSION IS TO KILL EVERYONE EXCEPT YOURSELF.", 400, 75);
        this.font.draw(context, "USE ARROWS TO MOVE AND X TO PLANT BOMB.", 400, 100);
        this.font.draw(context, "HAPPY HUNTING! AND TRY NOT TO BLOW YOURSELF UP...", 400, 125);
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.V);
    }

}); 
