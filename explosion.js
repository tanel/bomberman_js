var Explosion = me.ObjectEntity.extend({
    init: function(x, y, bombRadius, maxBombRadius, direction) {
        me.audio.play("bomb", false, null, 0.6);

        this.currentBombRadius = bombRadius || 1;
        this.maxBombRadius = maxBombRadius || me.game.HUD.getItemValue("range");
        this.currentDirection = direction || new me.Vector2d(0, 0);

        var settings = {
            image: "boom",
            spritewidth: window.bomberman.spritewidth,
            spriteheight: window.bomberman.spritewidth,
            type: me.game.ACTION_OBJECT,
            name: "explosion",
            collidable: true
        };

        this.parent(x, y, settings);

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
            if (this.currentBombRadius <= this.maxBombRadius) {
                // In first stage, expand in all 4 directions.
                if (this.currentBombRadius === 1) {
                    this.expand(new me.Vector2d(0, -1)); // one row up
                    this.expand(new me.Vector2d(0, +1)); // one row down
                    this.expand(new me.Vector2d(-1, 0)); // one col left
                    this.expand(new me.Vector2d(+1, 0)); // one col right
                } else {
                    // After initial expansion in all 4 directions, continue
                    // expanding in the current direction.
                    this.expand(this.currentDirection);
                }
            }
            this.visible = false;
            me.game.remove(this);
            me.game.sort();
        }

        return false;
    },

    expand: function(direction) {
        var tileCoords = window.bomberman.pixelToTileCoords(this.pos.x, this.pos.y);
        var col = tileCoords.x;
        var row = tileCoords.y;
        var coords = window.bomberman.tileToPixelCoords(col + direction.x, row + direction.y);
        var explosion = new Explosion(coords.x, coords.y, this.currentBombRadius + 1, this.maxBombRadius, direction);
        me.game.add(explosion, 1000);
    }
});
