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
        this.clearAt = me.timer.getTime() + 0.5 * 1000;
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
            this.clearBreakingTiles(this.left, this.right, this.top, this.bottom);
            this.visible = false;
            me.game.remove(this);
        }

        // update object animation
        this.parent();
        return true;
    },

    isBreakingTile: function(tile) {
        // If we already know which tile ID breaks on the collision map,
        // compare to it and we're done
        if (window.bomberman.knownBreakingTileId === tile.tileId) {
            return true;
        } else if (!window.bomberman.knownBreakingTileId) {
            // Fetch tile properties
            var props = me.game.collisionMap.tileset.getTileProperties(tile.tileId);
            if (props && props.isBreakable) {
                // Remember the breaking tile ID
                window.bomberman.knownBreakingTileId = tile.tileId;
                return true;
            }
        }
        return false;
    },

    cleaBreakingTile: function(x, y) {
        if (x > 0 && y > 0) {
            var tile = me.game.collisionMap.getTile(x, y);
            if (tile && this.isBreakingTile(tile)) {
                me.game.currentLevel.clearTile(tile.col, tile.row);
                var pixelCoords = window.bomberman.tileToPixelCoords(tile.col, tile.row);
                this.foundItem(pixelCoords);
            }
        }
    },

    clearBreakingTiles: function(x, xw, y, yh) {
        this.cleaBreakingTile(x, y);
        this.cleaBreakingTile(x, yh);
        this.cleaBreakingTile(xw, y);
        this.cleaBreakingTile(xw, yh);
    },

    foundItem: function(pixelCoords) {
        // To-do: this method should contain what to drop when wall is destroyed and at which frequency
        var roll = Math.random();
        if (roll > 0.7) {
            var coin = new CoinEntity(pixelCoords.x, pixelCoords.y);
            me.game.add(coin, 1000);
            me.game.sort();
        } else if (roll < 0.1) {
            var flamepower = new FlamePowerEntity(pixelCoords.x, pixelCoords.y);
            me.game.add(flamepower, 1000);
            me.game.sort();
        }
    }
});
