var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings, direction) {
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
        var res = me.game.collide(this);
        if (res) {
            var row, col;
            console.log('collision with: ', res.obj.name);
            if (res.obj.type === me.game.ENEMY_OBJECT) {
                if (res.obj.alive) {
                    res.obj.doomed();
                }
            } else if (res.obj.type === me.game.ACTION_OBJECT) {
                row = Math.round(res.x / 32);
                col = Math.round(res.y / 32);
                me.game.currentLevel.clearTile(row, col);
            }
        }

        if (this.endTime <= me.timer.getTime()) {
            me.game.remove(this);
        }

        return true;
    }
});
