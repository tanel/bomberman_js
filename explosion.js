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
        this.bombRadius = me.game.HUD.getItemValue("range");
        this.currentRadius = 1;
        this.direction = direction;

        // Clear explosion after n seconds
        this.endTime = me.timer.getTime() + (this.extTime * (this.bombRadius + 1));
    },

    update: function() {
        // do nothing if not visible
        if (! this.visible) {
            return false;
        }

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
            this.clearBreakingTiles(x, x+w, y, y+h);
            this.currentRadius++;
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

        if (this.endTime <= me.timer.getTime()) {
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
                var pixelCoords = new me.Vector2d(tile.col * window.bomberman.spritewidth, tile.row * window.bomberman.spritewidth);
		this.foundItem(pixelCoords)
                
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
	    if (Math.random() > 0.5) {
	    var coin = new CoinEntity(pixelCoords.x, pixelCoords.y);
	    me.game.add(coin, 1000);
	    me.game.sort();
	}
    }
});
