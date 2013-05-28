var BearTrap = me.ObjectEntity.extend({

    init: function(x, y) {
        settings = {
            name: "beartrap",
            image: "trap_animation",
            spritewidth : window.bomberman.spritewidth,
            spriteheight: window.bomberman.spriteheight,
            type: me.game.ACTION_OBJECT
        };

        this.parent(x, y, settings);
	
        this.x = x;
        this.y = y;
        this.addAnimation("ready", [0], 30);
        this.addAnimation("springed", [1,2,3], 40);
        this.setCurrentAnimation("ready");
        this.collidable = true;
        this.actionStarted = false;
        this.visible = true;
    },
    
    update: function() {
        if (! this.visible) {
            return false; // return false if beartrap is not visible
        }

        if (this.springAt < me.timer.getTime()) {
            var playerX = window.bomberman.player.pos.x; // get player position on x-axis
            var playerY = window.bomberman.player.pos.y; // get player position on y-axis
            var trapTile = window.bomberman.pixelToTileCoords(this.x, this.y); // get tile (BearTrap`s x and y coordinates will be used)
            var playerTile = window.bomberman.pixelToTileCoords(playerX, playerY); // get tile (player`s x and y coordinates will be used)
            if (trapTile && playerTile && trapTile.equals(playerTile)) {
                window.bomberman.player.die();
            }
            this.actionStarted = false;
            this.setCurrentAnimation("ready");
            return true;
        }
        this.parent(true);
    },

    startAction: function() {
        if (!this.actionStarted) {
            this.actionStarted = true;
            this.setCurrentAnimation("springed");
	    this.setAnimationFrame(0);
            this.springAt = me.timer.getTime() + 2.0 * 1000;
        }
    }
});
