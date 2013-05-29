var ScoreScreen = me.ScreenObject.extend({
    
    init: function() {
        this.parent(true);
        this.font = new me.BitmapFont("32x32_font", 32);
    },

    update: function() {        
        if (me.input.isKeyPressed('abort')) {
            me.state.change(me.state.MENU);
        } else if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.MENU);
        } else {
            return false;
        }
        return true;
    },

    clearInfo: function(context) {
        context.clearRect(0, 55, me.video.getWidth(), 200);
    },

    draw: function(context) {
        if (! me.game.HUD.getItemValue("playerName")) {
            var nimi = prompt("Enter your name:");
            me.game.HUD.setItemValue("playerName", nimi);
        }
        this.clearInfo(context);
        this.writeHiScoreToLocalStorage(me.game.HUD.getItemValue("score"), me.game.HUD.getItemValue("playerName"));
        var score = me.game.HUD.getItemValue("score");
        
        this.font.draw(context, "NAME", 460, 270);
        this.font.draw(context, "SCORE", 670, 270);
        this.font.draw(context, "1.   " + this.readNameFromLocalStorage(), 440, 350);
        this.font.draw(context, "" + this.readHiScoreFromLocalStorage(), 615, 350);
        this.font.draw(context, "2.   " + this.readNameFromLocalStorage(), 440, 380);
        this.font.draw(context, "" + this.readHiScoreFromLocalStorage(), 615, 380);
        this.font.draw(context, "3.   " + this.readNameFromLocalStorage(), 440, 410);
        this.font.draw(context, "" + this.readHiScoreFromLocalStorage(), 615, 410);
    },
    
    writeHiScoreToLocalStorage: function (score, name) {
        if (me.sys.localStorage) {
            var previous = this.readHiScoreFromLocalStorage();
            
            for (var i = 0; i < 3; i++) {
                
            }
            
            if (score > previous) {
                localStorage.setItem("hiscore1", score);
                localStorage.setItem("name1", name);
            }     
        }
    },
    
    readHiScoreFromLocalStorage: function () {
        if (me.sys.localStorage) {
            return (localStorage.getItem("hiscore1") || 0);
        }
        return 0;
    },

    readNameFromLocalStorage: function () {
        if (me.sys.localStorage) {
            return (localStorage.getItem("name1") || "");
        }
        return "";
    }
    
}); 
