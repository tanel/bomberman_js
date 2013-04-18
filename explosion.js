var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings, direction) {
        settings.image = "boom";
        me.audio.play("bomb", false, null, 0.6);
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        settings.name = "explosion";
        settings.collidable = true;
        this.parent(x, y, settings);
        this.bomb = settings.bomb;
        this.extTime = 70; // Laienemisaeg
        this.bombRadius = 6;
        this.currentRadius = 1; // Hetkel kui palju plahvatus laienend on
        this.direction = direction;
	
        // Ajaarvamise algus :)
        this.startMoment = me.timer.getTime();
	
        // Kustutame selle n seki pärast
        this.endTime = this.startMoment + (this.extTime * (this.bombRadius + 1));
    },
    
    update: function() {
        // do nothing if not visible
        if (! this.visible)
            return false;

        // Laiendame plahvatust vastavalt plahvatuse suunale
        if (this.currentRadius < this.bombRadius) {
            if (this.direction === "right") {
                this.updateColRect(0, 32 * this.currentRadius, 0, 32);
            } else if (this.direction === "left") {
                this.updateColRect(0, 32 * -this.currentRadius, 0, 32);
            } else if (this.direction === "up") {
                this.updateColRect(0, 32, 0, 32 * -this.currentRadius);
            } else if (this.direction === "down") {
                this.updateColRect(0, 32, 0, 32 * this.currentRadius);
            }
            this.currentRadius++;
        }

        // Otsime entiteete, mis jäävad plahvatuse alasse.                       
        // Leitud entiteedid võib nö sodiks lasta.
        var mres = me.game.collide(this, true);
        if (mres) {
            for (var i = 0; i < mres.length; i++) {
                var res = mres[i];
                // Ignoreerime teisi plahvatuse juppe
                if (res.obj.name === "explosion")
                    continue;
                // Meil huvitavad vaenalsed
                if (res.obj.type === me.game.ENEMY_OBJECT) {
                    if (res.obj.alive) {
                        res.obj.doomed();
                    }
                // ning lõhutavad seinatükid
                } else if (res.obj.type === me.game.ACTION_OBJECT) {
                    console.dir(res.obj);
                    var row = Math.round(res.x / 32);
                    var col = Math.round(res.y / 32);
                    me.game.currentLevel.clearTile(row, col);
                } else {
                    console.dir(res.obj);
                }
            }
        }

        if (this.endTime <= me.timer.getTime()) {
            me.game.remove(this);
        }

        return true;
    }
});
