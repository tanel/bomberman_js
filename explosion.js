
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
        
        var res2 = me.game.collide(this);
    	
        if (res2) {
            // if we collide with the bomb
            if (res2.obj.type === me.game.ENEMY_OBJECT) {
                console.log('collision with enemy');
                // Pommi puudutamine paneb flickerdama
                //this.flicker(45);
                //res2.obj.flicker(45);
                res2.obj.alive = false; // Vastase objekt
            } else if (res2.obj.type === me.game.ACTION_OBJECT) {
                console.log('collision with action object');
                //this.flicker(45);
            } else {
                console.log('collision with unknown object :)');
                // FIXME: powerupi puudumine peaks selle üles korjama ning powerupi sisse lülitama
            }
        }

        if (this.explodeAt < me.timer.getTime()) {
            me.game.remove(this);
            return true;
        }

        return false;
    }
});
