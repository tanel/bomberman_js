
var HelpScreen = me.ScreenObject.extend({

    init: function() {
        this.parent(true);
        this.font = new me.Font("Cursive", 20, "yellow", "center");
    },

    clearInfo: function(context) {
        context.clearRect(0, 55, me.video.getWidth(), 200);
    },
    onResetEvent: function() {
        if (!this.life) {
            // init stuff if not yet done
            this.life = me.loader.getImage("life");
	    this.flamepower = me.loader.getImage("flamepower");
	}
    },

    update: function() {
        if (me.input.isKeyPressed('abort')) {
            me.state.change(me.state.MENU);
            return true;
        } 
        return false;
    },

    draw: function(context) {
        this.clearInfo(context);
	context.drawImage(this.life, 0, 175);
	context.drawImage(this.flamepower, 0, 225);
        this.font.draw(context, "YOUR MISSION IS TO KILL EVERYONE EXCEPT YOURSELF.", me.video.getWidth()/2, 100);
        this.font.draw(context, "USE ARROWS TO MOVE AND X TO PLANT BOMB.", me.video.getWidth()/2, 125);
        this.font.draw(context, "HAPPY HUNTING! AND TRY NOT TO BLOW YOURSELF UP...", me.video.getWidth()/2, 150);
	this.font.draw(context, "THIS POWERUP GIVES YOU LIFE, KEEP A WATCHOUT FOR THIS ONE", me.video.getWidth()/2, 200);
	this.font.draw(context, "THIS POWERUP MAKES YOUR BOMBS MORE POWERFUL, NICE TO HAVE", me.video.getWidth()/2, 250);
    }

}); 
