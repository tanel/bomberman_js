var LifePowerupEntity = me.ObjectEntity.extend({

    init: function(x, y) {
        // define this here instead of tiled
        settings = {
            name: "life",
            image: "life",
            spritewidth: 40,
            spriteheight: 40
        };

        this.parent(x, y, settings);
	
        this.type = me.game.COLLECTABLE_OBJECT;
        this.collidable = true;
        this.visible = true;
    },

    collect: function() {
        me.audio.play("soda_open");
        me.game.HUD.updateItemValue("lives", 1);
    }
});
