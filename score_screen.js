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
        var score = me.game.HUD.getItemValue("score");
            this.clearInfo(context);
            this.writeHiScoreToLocalStorage(me.game.HUD.getItemValue("score"), me.game.HUD.getItemValue("playerName"));
        }

        this.font.draw(context, "NAME", 460, 270);
        this.font.draw(context, "SCORE", 670, 270);
        
        this.font.draw(context, "1.", 305, 350);
        this.font.draw(context, this.readNameFromLocalStorage(1).toUpperCase(), 480, 350);
        //this.font.draw(context, this.readNameFromLocalStorage(1), 490, 350);
        this.font.draw(context, "" + this.readHiScoreFromLocalStorage(1), 605, 350);
        this.font.draw(context, "2.", 305, 380);
        this.font.draw(context, this.readNameFromLocalStorage(2).toUpperCase(), 480, 380);
        this.font.draw(context, "" + this.readHiScoreFromLocalStorage(2), 605, 380);
        this.font.draw(context, "3.", 305, 410);
        this.font.draw(context, this.readNameFromLocalStorage(3).toUpperCase(), 480, 410);
        this.font.draw(context, "" + this.readHiScoreFromLocalStorage(3), 605, 410);
	
        console.log(" Name 1: " + this.readNameFromLocalStorage(1) + " Name 2: " + this.readNameFromLocalStorage(2) +" Name 3: " + this.readNameFromLocalStorage(3));	
    },
    
    writeHiScoreToLocalStorage: function (score, name) {
        if (me.sys.localStorage) {

            var minimum = 9999;
            var min_id = 0;
            // get smallest high score
            for (var i = 1; i < 4; i++) {
                var next_val = this.readHiScoreFromLocalStorage(i);

                if (next_val < minimum) {
            
                    minimum = next_val;
                    min_id = i;
                }
            }
                    
            if (score > minimum ) {		
                localStorage.setItem("hiscore" + min_id, score); // use id of the minimum high score
                localStorage.setItem("name" + min_id, name);       
            }
        }
    },
    
    readHiScoreFromLocalStorage: function (number) {
        if (me.sys.localStorage) {
            return (localStorage.getItem("hiscore" + number) || 0);
        }
        return 0;
    },

    readNameFromLocalStorage: function (number) {
        if (me.sys.localStorage) {
            return (localStorage.getItem("name" + number) || '-   ');
        }
        return 0;
    }
    
}); 
