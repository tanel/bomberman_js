
var TitleScreen = me.ScreenObject.extend({

    // constructor
    init: function() {
        this.parent(true);

        // title screen image
        this.title = null;
	
        this.instructions = false;
        this.score = false;

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
        me.input.bindKey(me.input.KEY.V, "instructions", true);
        me.input.bindKey(me.input.KEY.S, "score", true);
    },

    update: function() {
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
            return true;
        } else if (me.input.isKeyPressed('instructions')) {
            this.instructions = true;
            this.score = false;
            console.log("Noob detected!");
            return true;
        } else if (me.input.isKeyPressed('score')) {
            this.score = true;
            this.instructions = false;
            console.log("Wannabe pro detected!"); 
            return true;
        } 
        return false;
    },

    clearInfo: function(context) {
        context.clearRect(0, 55, me.video.getWidth(), 200);
    },

    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 425);
        this.titlefont.draw(context, "BOMBERMAN", 400, 50);
        this.font.draw(context, "PRESS ENTER TO PLAY", 400, 350);
        this.font.draw(context, "PRESS V FOR INSTRUCTIONS", 400, 375);
        this.font.draw(context, "AND S FOR HIGHSCORES", 400, 400);
        if (this.instructions) {
            this.clearInfo(context);
            this.font.draw(context, "YOUR MISSION IS TO KILL EVERYONE EXCEPT YOURSELF.", 400, 75);
            this.font.draw(context, "USE ARROWS TO MOVE AND X TO PLANT BOMB.", 400, 100);
            this.font.draw(context, "HAPPY HUNTING! AND TRY NOT TO BLOW YOURSELF UP...", 400, 125);
        } else if (this.score) {
            this.clearInfo(context);
            this.font.draw(context, "SCORE IS TOTALLY AMAZING: 0 POINTS, WELL DONE!", 400, 100);
        }
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.V);
    }

}); 