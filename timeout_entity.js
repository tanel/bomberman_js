
var TimeoutEntity = me.ObjectEntity.extend({

    init: function(seconds) {
        this.collidable = false;
        this.visible = false;
        this.timeoutAt = me.timer.getTime() + seconds * 1000;
    },
    
    update: function() {
        if (window.bomberman.player.alive) {
            var timeLeft = (this.timeoutAt - me.timer.getTime()) / 1000;
            if (timeLeft > 0) {
                me.game.HUD.setItemValue("time", Math.round(timeLeft));
            } else {
	        this.visible = false;
                me.game.HUD.setItemValue("time", 0);
                window.bomberman.player.die();
            }
        }
        return false;
    }
});
