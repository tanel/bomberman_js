
var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "boom";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        settings.collidable = true;
        this.parent(x, y, settings);

        this.bomb = settings.bomb;
	
        // Kustutame selle n seki pärast
        this.explodeAt = me.timer.getTime() + 300;
    },
    
    update: function() {
        // Otsime entiteete, mis jäävad plahvatuse alasse.
        // Leitud entiteedid võib nö sodiks lasta.
        var mres = me.game.collide(this, true);
        if (mres && mres.length > 0) {
            console.dir(mres);
        }

        if (this.explodeAt < me.timer.getTime()) {
            me.game.remove(this);
            return true;
        }

        return false;
    }
});
