
var TitleScreen = me.ScreenObject.extend({

    // constructor
    init: function() {
        this.parent(true);

        // title screen image
        this.title = null;
	
        this.activeScreen = null; // What data is being shown on screen

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
            this.activeScreen = "instructions";
            console.log("Noob detected!");
            return true;
        } else if (me.input.isKeyPressed('score')) {
            this.activeScreen = "score";
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
        this.titlefont.draw(context, "BOMBERMAN", me.video.getWidth()/2, 50);
        this.font.draw(context, "PRESS ENTER TO PLAY", me.video.getWidth()/2, 350);
        this.font.draw(context, "PRESS V FOR INSTRUCTIONS", me.video.getWidth()/2, 375);
        this.font.draw(context, "AND S FOR HIGHSCORES", me.video.getWidth()/2, 400);
        if (this.activeScreen === "instructions") {
            this.clearInfo(context);
            this.font.draw(context, "YOUR MISSION IS TO KILL EVERYONE EXCEPT YOURSELF.", me.video.getWidth()/2, 100);
            this.font.draw(context, "USE ARROWS TO MOVE AND X TO PLANT BOMB.", me.video.getWidth()/2, 125);
            this.font.draw(context, "HAPPY HUNTING! AND TRY NOT TO BLOW YOURSELF UP...", me.video.getWidth()/2, 150);
        } else if (this.activeScreen === "score") {
            this.clearInfo(context);
            this.font.draw(context, "SCORE IS TOTALLY AMAZING: 0 POINTS, WELL DONE!", me.video.getWidth()/2, 100);
        }
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.V);
	me.input.unbindKey(me.input.KEY.S);
    }

}); 
