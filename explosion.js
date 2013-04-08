
var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "boom";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        this.parent(x, y, settings);

        this.bomb = settings.bomb;
	
        // Kustutame selle n seki pärast
        this.explodeAt = me.timer.getTime() + 300;
    },
    
    update: function() {
        if (this.explodeAt < me.timer.getTime()) {
            me.game.remove(this);
            return true;
        }

        return false;
    }
});
