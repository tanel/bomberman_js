var ScoreScreen = me.ScreenObject.extend({

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

    draw: function(context) {
        this.clearInfo(context);
        this.writeHiScoreToLocalStorage(me.game.HUD.getItemValue("score"));
        var score = me.game.HUD.getItemValue("score");
        this.font.draw(context, "SCORE IS TOTALLY AMAZING: " + score  + " POINTS, WELL DONE! HIGH SCORE IS " + this.readHiScoreFromLocalStorage(),
            me.video.getWidth()/2, 100);
    },
    
    writeHiScoreToLocalStorage: function (score) {
        if (me.sys.localStorage) {
            var previous = this.readHiScoreFromLocalStorage();
            if (score > previous) {
                localStorage.setItem("hiscore", score);
            }
        }
    },
    
    readHiScoreFromLocalStorage: function () {
        if (me.sys.localStorage) {
            return (localStorage.getItem("hiscore") || 0);
        }
        return 0;
    }
}); 
