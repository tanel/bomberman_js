
var ScoreScreen = me.ScreenObject.extend({

    // constructor
    init: function() {
        this.parent(true);

        this.font = new me.Font("Cursive", 20, "yellow", "center");
    },

    update: function() {
        if (me.input.isKeyPressed('abort')) {
            me.state.change(me.state.MENU);
            return true;
        } 
        return false;
    },

    clearInfo: function(context) {
        context.clearRect(0, 55, me.video.getWidth(), 200);
    },

    // draw function
    draw: function(context) {
        this.clearInfo(context);
        this.font.draw(context, "SCORE IS TOTALLY AMAZING: 0 POINTS, WELL DONE!", me.video.getWidth()/2, 100);
    }

}); 
