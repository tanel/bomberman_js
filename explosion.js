var Explosion = me.ObjectEntity.extend({
    init: function(x, y, bombRadius, maxBombRadius, direction) {
        this.currentBombRadius = bombRadius || 1;
        this.maxBombRadius = maxBombRadius || me.game.HUD.getItemValue("range");
        this.currentDirection = direction || new me.Vector2d(0, 0);

        if (this.currentBombRadius === 1) {
            me.audio.play("bomb", false, null, 0.6);
            me.game.viewport.shake(5, 50, me.game.viewport.AXIS.BOTH);
        }

        var settings = {
            image: "boom",
            spritewidth: window.bomberman.spritewidth,
            spriteheight: window.bomberman.spritewidth,
            type: me.game.ACTION_OBJECT,
            name: "explosion",
            collidable: true
        };

        this.parent(x, y, settings);

        window.bomberman.clearBreakingTile(this.pos.x, this.pos.y);

        this.expandAt = me.timer.getTime() + 0.1 * 1000;
        this.clearAt = me.timer.getTime() + 0.4 * 1000;
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
            res.obj.die("exploded");
        }

        if (this.clearAt < me.timer.getTime()) {
            this.visible = false;
            me.game.remove(this);
            me.game.sort();
        }

        if (!this.expansionDone) {
            if (this.expandAt < me.timer.getTime()) {
                // Expand explosion, if possible
                if (this.currentBombRadius <= this.maxBombRadius) {
                    // First, expand in all 4 directions
                    if (this.currentBombRadius === 1) {
                        this.expand(new me.Vector2d(0, -1)); // one row up
                        this.expand(new me.Vector2d(0, +1)); // one row down
                        this.expand(new me.Vector2d(-1, 0)); // one col left
                        this.expand(new me.Vector2d(+1, 0)); // one col right
                    } else {
                        // After initial expansion, keep expanding in current direction only
                        this.expand(this.currentDirection);
                    }
                }
                // Anyway, we're done with expanding
                this.expansionDone = true;
                me.game.sort();
                return true;
            }
        }

        return false;
    },

    expand: function(direction) {
        var tileCoords = window.bomberman.pixelToTileCoords(this.pos.x, this.pos.y);
        var col = tileCoords.x;
        var row = tileCoords.y;
        var coords = window.bomberman.tileToPixelCoords(col + direction.x, row + direction.y);
        if (!window.bomberman.isSolidTile(coords)) {
            var explosion = new Explosion(coords.x, coords.y, this.currentBombRadius + 1, this.maxBombRadius, direction);
            me.game.add(explosion, 1000);
        }
    }
});
