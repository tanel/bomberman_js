var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings, direction) {
        settings.image = "boom";
        me.audio.play("bomb", false, null, 0.6);
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        settings.name = "explosion";
        settings.collidable = true;
        this.x = x;
        this.y = y;
        this.parent(x, y, settings);
        this.bomb = settings.bomb;
        this.extTime = 70; // Laienemisaeg
        this.bombRadius = 6;
        this.currentRadius = 1; // Hetkel kui palju plahvatus laienend on
        this.direction = direction;
	
        // Beginning of time counting :)
        this.startMoment = me.timer.getTime();
	
        // del explosion after n seconds
        this.endTime = this.startMoment + (this.extTime * (this.bombRadius + 1));
    },
    
    update: function() {
        // do nothing if not visible
        if (! this.visible)
            return false;

        // Extends explosion in proper direction
        if (this.currentRadius < this.bombRadius) {
            if (this.direction === "right") {
                this.updateColRect(0, 32 * this.currentRadius + 32, 0, 32);
            } else if (this.direction === "left") {
                this.updateColRect(0, 32 * -this.currentRadius, 0, 32);
            } else if (this.direction === "up") {
                this.updateColRect(0, 32, 0, 32 * -this.currentRadius);
            } else if (this.direction === "down") {
                this.updateColRect(0, 32, 0, 32 * this.currentRadius + 32);
            }
            this.currentRadius++;
        }

        // Searches objects that are in explosion and removes them.
        var mres = me.game.collide(this, true);
        if (mres) {
            for (var i = 0; i < mres.length; i++) {
                var res = mres[i];
                // tells enemies that they are doomed
                if (res.obj.type === me.game.ENEMY_OBJECT) {
                    if (window.bomberman.debug) {
                        console.log(res.obj.name);
                    }
                    if (res.obj.alive) {
                        res.obj.doomed();
                    }
                // removes destructable walls
                } else if (res.obj.type === me.game.ACTION_OBJECT) {
                    if (window.bomberman.debug) {
                        console.log(res.obj.name);
                    }
                    var row = Math.round((res.x + this.pos.x) / 32);
                    var col = Math.round((res.y + this.pos.y) / 32);
		    console.dir(x);
                    me.game.currentLevel.clearTile(row, col);
                } else {
                    throw("Unexpected object type");
                }
            }
        }

        if (this.endTime <= me.timer.getTime()) {
            me.game.remove(this);
        }

        return true;
    }
});
