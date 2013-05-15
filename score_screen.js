
var ScoreScreen = me.ScreenObject.extend({

    // constructor
    init: function() {
        this.parent(true);
	this.score = 0;

        this.font = new me.Font("Cursive", 20, "yellow", "center");
    },

    update: function() {
        if (me.input.isKeyPressed('abort')) {
            me.state.change(me.state.MENU);
            return true;
	}
	if (this.score != me.game.HUD.getItemValue("score")) {
	    this.score =  me.game.HUD.getItemValue("score");
	} 
        return false;
    },

    clearInfo: function(context) {
        context.clearRect(0, 55, me.video.getWidth(), 200);
    },

    // draw function
    draw: function(context) {
        this.clearInfo(context);
        this.font.draw(context, "SCORE IS TOTALLY AMAZING: " + this.score  + " POINTS, WELL DONE!", me.video.getWidth()/2, 100);
    }

}); 
