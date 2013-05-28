
var TitleScreen = me.ScreenObject.extend({

    // constructor
    init: function() {
        this.parent(true);

        this.flame = null;
	
        // font to display the menu items
        this.titlefont = new me.Font("Cursive", 40, "yellow", "center");
        this.font = new me.Font("Cursive", 20, "yellow", "center");
    },

    onResetEvent: function() {
        me.game.HUD.visible = false;
        if (!this.flame) {
            this.flame = me.loader.getImage("flame");
        }
        me.input.bindKey(me.input.KEY.ESC, "abort", true);
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.V, "instructions", true);
        me.input.bindKey(me.input.KEY.S, "score", true);
    },

    update: function() {
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        } else if (me.input.isKeyPressed('instructions')) {
            me.state.change(me.state.USER);
        } else if (me.input.isKeyPressed('score')) {
            me.state.change(me.state.SCORE);
        } else if (me.input.isKeyPressed('abort')) {
            me.state.change(me.state.MENU);
        } else {
            return false;
        }
        return true;
    },

    draw: function(context) {
        context.drawImage(this.flame, 0, me.video.getHeight() - 175);
        this.titlefont.draw(context, "BOMBERMAN", me.video.getWidth() / 2, 100);
        this.font.draw(context, "PRESS ENTER TO PLAY", me.video.getWidth() / 2, 350);
        this.font.draw(context, "PRESS V FOR INSTRUCTIONS", me.video.getWidth() / 2, 375);
        this.font.draw(context, "AND S FOR HIGHSCORES", me.video.getWidth() / 2, 400);
    },

    onDestroyEvent: function() {
    }
}); 
