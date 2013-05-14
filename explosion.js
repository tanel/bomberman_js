var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings, direction) {
        settings.image = "boom";
        me.audio.play("bomb", false, null, 0.6);

        settings.spritewidth = window.bomberman.spritewidth;
        settings.spriteheight = window.bomberman.spritewidth;
        settings.type = me.game.ACTION_OBJECT;
        settings.name = "explosion";
        settings.collidable = true;

        this.explosionSize = (window.bomberman.spritewidth / 2);
        this.explosionMargin = (window.bomberman.spritewidth - this.explosionSize) / 2;

        this.parent(x, y, settings);

        this.bomb = settings.bomb;
        this.extTime = 70;
        this.bombRadius = 3;
        this.currentRadius = 1;
        this.direction = direction;

        // Clear explosion after n seconds
        this.endTime = me.timer.getTime() + (this.extTime * (this.bombRadius + 1));
    },
    
    update: function() {
        // do nothing if not visible
        if (! this.visible)
            return false;

        // Extends explosion in proper direction
        if (this.currentRadius < this.bombRadius) {
            var x = this.explosionMargin,
            w = this.explosionSize,
            y = this.explosionMargin,
            h = this.explosionSize;
            if (this.direction === "right") {
                w = (window.bomberman.spritewidth * this.currentRadius) + window.bomberman.spritewidth;
            } else if (this.direction === "left") {
                x = (window.bomberman.spritewidth * -this.currentRadius);
                w = window.bomberman.spritewidth * this.currentRadius;
            } else if (this.direction === "up") {
                y = window.bomberman.spritewidth * -this.currentRadius;
                h = window.bomberman.spritewidth * this.currentRadius;
            } else if (this.direction === "down") {
                h = (window.bomberman.spritewidth * this.currentRadius) + window.bomberman.spritewidth;
            }
            this.updateColRect(x, w, y, h);
            this.currentRadius++;
        }

        // Kill enemies and player if they collide with explosion.
        var mres = me.game.collideType(this, me.game.ENEMY_OBJECT, true);
        if (mres) {
            for (var i = 0; i < mres.length; i++) {
                var res = mres[i];
                if (res.obj.alive && res.obj.die) {
                    res.obj.die();
                }
            }
        }

        // Clear tiles, if they collide
        //var mres = me.game.collideType

        if (this.endTime <= me.timer.getTime()) {
            me.game.remove(this);
        }

        // update object animation
        this.parent();
        return true;
    }
});
