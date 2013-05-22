
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
            this.score = me.game.HUD.getItemValue("score");
        }
        return false;
    },

    clearInfo: function(context) {
        context.clearRect(0, 55, me.video.getWidth(), 200);
    },

    // draw function
    draw: function(context) {
        this.clearInfo(context);
        this.writeHiScore(me.game.HUD.getItemValue("score")); // save new high score
        this.font.draw(context, "SCORE IS TOTALLY AMAZING: " + this.score  + " POINTS, WELL DONE! HIGH SCORE IS " + this.readHiScore(), me.video.getWidth()/2, 100);
    },
    
    // write the hiscore in localstorage
    writeHiScore : function (val) {
    
        if (me.sys.localStorage) {
        
            try {       
                lval = this.readHiScore();
                if (val > lval)
                { 
                    // save to database, "key", "value"
                    localStorage.setItem("mefw_hiscore", val); 
                }
            } 
            catch (e){
                // sthg went wrong
            }
        }
    },
    
    // read the hiscore from localstorage    
    readHiScore: function () {
            
        if (me.sys.localStorage) {
            
            try {       
                // get value from database
                return (localStorage.getItem("mefw_hiscore") || 0);
            } 
            catch (e)
            {
                // sthg went wrong
            }
        }
        return 0;
    }
}); 
