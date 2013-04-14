
var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "boom";
	me.audio.play("bomb", false, null, 0.6);
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        settings.collidable = true;
        this.parent(x, y, settings);
        this.bomb = settings.bomb;
	this.extTime = 100; // Laienemisaeg
	this.bombRadius = 6;
	this.currentRadius = 1; // Hetkel kui palju plahvatus laienend on
	
	// Laienemishetk
	this.startMoment = me.timer.getTime();
	
        // Kustutame selle n seki pärast
        this.endTime = me.timer.getTime() + (this.extTime * this.bombRadius);
    },
    
    update: function() {
        // Collisionboxi laiendamine ajaliselt
	if ((this.startMoment + this.extTime * this.currentRadius) <= me.timer.getTime()) {
	    this.extendingExp();
	}

        // Otsime entiteete, mis jäävad plahvatuse alasse.                       
        // Leitud entiteedid võib nö sodiks lasta.
        var res = me.game.collide(this);
        if (res) {
            // if we collide with the bomb
            if (res.obj.type === me.game.ENEMY_OBJECT) {
                console.log('collision with enemy');
		if (res.obj.alive) {  // surnud ei karju
                    res.obj.doomed(); // Vastase objekt
		}
            } else if (res.obj.type === me.game.ACTION_OBJECT) {
                console.log('collision with action object');
            } else {
                console.log('collision with unknown object :)');
                // FIXME: powerupi puudumine peaks selle üles korjama ning powerupi sisse lülitama
            }
        }

        if (this.endTime < me.timer.getTime()) {
            me.game.remove(this);
            return true;
        }

        return false;
    },
    extendingExp: function() {
	// Selgitus: mäng ühtlaselt jaotab laienemist saates algpunkti 16p tagasi
        // ja kokku laiendades 32p. +16p on vaja selleks, et esimese ruuduga
        // algpunkti tagasisaatmist ei toimuks.
	this.updateColRect(-16*this.currentRadius + 16, 32 * this.currentRadius, -1);
	if (this.currentRadius < this.bombRadius) {
	    this.currentRadius++;
	}
    } 
});
