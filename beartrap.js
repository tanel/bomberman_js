
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
            return false;
        }

        if (this.springAt < me.timer.getTime()) {
            var playerX =  window.bomberman.player.pos.x;
            console.log (window.bomberman.player.pos.x);
            var playerY =  window.bomberman.player.pos.y;
            var trapTile = window.bomberman.pixelToTileCoords(this.x, this.y);
            var playerTile = window.bomberman.pixelToTileCoords(playerX, playerY);
            console.log(trapTile);
            console.log(playerTile);
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
            console.log("action started");
            this.setCurrentAnimation("springed");
            this.springAt = me.timer.getTime() + 2.0 * 1000;
        }
    }
});
