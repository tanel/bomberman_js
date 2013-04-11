
var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "boom";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        settings.collidable = true;
        this.parent(x, y, settings);
        this.bomb = settings.bomb;
	this.bombRadius = 3;
	
        // Kustutame selle n seki pärast
        this.explodeAt = me.timer.getTime() + 300;
    },
    
    update: function() {
        // Collisionboxi laiendamine X teljel
        this.updateColRect(-16*this.bombRadius + 16, 32*this.bombRadius, -1); // Selgitus: mäng ühtlaselt jaotab laienemist saates algpunkti 16p tagasi
        // Otsime entiteete, mis jäävad plahvatuse alasse.                       ja kokku laiendades 32p. +16p on vaja selleks, et esimese ruuduga
        // Leitud entiteedid võib nö sodiks lasta.                               algpunkti tagasisaatmist ei toimuks.
        
        var res = me.game.collide(this);
    	
        if (res) {
            // if we collide with the bomb
            if (res.obj.type === me.game.ENEMY_OBJECT) {
                console.log('collision with enemy');
                res.obj.alive = false; // Vastase objekt
            } else if (res.obj.type === me.game.ACTION_OBJECT) {
                console.log('collision with action object');
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
