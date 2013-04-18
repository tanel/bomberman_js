var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings, dir) {
        settings.image = "boom";
        me.audio.play("bomb", false, null, 0.6);
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        settings.collidable = true;
        this.x = x;
        this.y = y;
        this.parent(x, y, settings);
        this.bomb = settings.bomb;
        this.extTime = 70; // Laienemisaeg
        this.bombRadius = 6;
        this.currentRadius = 1; // Hetkel kui palju plahvatus laienend on
        this.dir = dir;
	this.laiendusX = -1;
	this.laiendusY = -1;
	switch (dir)
	{
	  case "L": laiendusX = -32; 
	    break;
	  case "R": laiendusX = 32; 
	    break;
	  case "U": laiendusY = 32; 
	    break;
	  case "D": laiendusY = -32; 
	    break;
	  default: console.log("Explosion direction Unknown!");
	}
	
	
        // Ajaarvamise algus :)
        this.startMoment = me.timer.getTime();
	
        // Kustutame selle n seki pärast
        this.endTime = this.startMoment + (this.extTime * (this.bombRadius + 1));
    },
    
    update: function() {
        // Collisionboxi laiendamine ajaliselt
        if ((this.startMoment + this.extTime * this.currentRadius) <= me.timer.getTime()) {
            this.grow();
        }

        // Otsime entiteete, mis jäävad plahvatuse alasse.                       
        // Leitud entiteedid võib nö sodiks lasta.
        // tilewidth="32" tileheight="32"
        // width="512" height="480"/>
        var res = me.game.collide(this);
        if (res) {

            if (res.obj.type === me.game.ENEMY_OBJECT) {
                console.log('collision with enemy');
                if (res.obj.alive) {  // surnud ei karju
                    res.obj.doomed(); // Vastase objekt
                }
            } if (res.obj.type === me.game.ACTION_OBJECT) {
                console.log('collision with action object');
            } if (res.obj.type === 1) {
                console.log('collision with 1 object');
                console.log('row: ' + parseInt((res.x + this.pos.x) / 32) + ' --- col: ' + parseInt((res.y + this.pos.y) / 32) );
                me.game.currentLevel.clearTile(parseInt((res.x + this.pos.x) / 32), parseInt((res.y + this.pos.y) / 32));
            } if (res.obj.type === 3) {
                console.log('collision with 3 object');
                console.log('row: ' + Math.round(res.x / 32) + ' --- col: ' + Math.round(res.y / 32) );
                me.game.currentLevel.clearTile(parseInt((res.x + this.pos.x) / 32), parseInt((res.y + this.pos.y) / 32));
            } else {
                console.log('collision with unknown object :)');
                // FIXME: powerupi puudumine peaks selle üles korjama ning powerupi sisse lülitama
            }
        }

        if (this.endTime <= me.timer.getTime()) {
            me.game.remove(this);
            return true;
        }

        return false;
    },

    grow: function() {
        // Selgitus: mäng ühtlaselt jaotab laienemist saates algpunkti 16p tagasi
        // ja kokku laiendades 32p. +16p on vaja selleks, et esimese ruuduga
        // algpunkti tagasisaatmist ei toimuks.
        this.updateColRect(-1, this.laiendusX * this.currentRadius,-1, this.laiendusY * this.currentRadius);
        if (this.currentRadius < this.bombRadius) {
            this.currentRadius++;
        } 
    } 
});
