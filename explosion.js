var Explosion = me.ObjectEntity.extend({
    init: function(x, y) {
        me.audio.play("bomb", false, null, 0.6);

        var settings = {
            image: "boom",
            spritewidth: window.bomberman.spritewidth,
            spriteheight: window.bomberman.spritewidth,
            type: me.game.ACTION_OBJECT,
            name: "explosion",
            collidable: true
        };

        this.parent(x, y, settings);

        this.bombRadius = me.game.HUD.getItemValue("range");

        // Timer when explosion is hidden
        this.clearAt = me.timer.getTime() + 0.2 * 1000;
    },

    update: function() {
        // do nothing if not visible
        if (! this.visible) {
            return false;
        }

        // Kill enemies if they collide with explosion.
        var mres = me.game.collideType(this, me.game.ENEMY_OBJECT, true);
        if (mres) {
            for (var i = 0; i < mres.length; i++) {
                mres[i].obj.die();
            }
        }

        // Kill player, if it collides with explosion.
        var res = me.game.collideType(this, me.game.NO_OBJECT);
        if (res) {
            res.obj.die();
        }

        if (this.clearAt < me.timer.getTime()) {
            window.bomberman.clearBreakingTiles(this.left, this.right, this.top, this.bottom);
            this.visible = false;
            me.game.remove(this);
        }

        // update object animation
        this.parent();
        return true;
    }
});
