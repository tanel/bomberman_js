var CoinEntity = me.ObjectEntity.extend({

    init: function(x, y) {
        settings = {
            name: "coin",
            image: "coin",
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
        me.game.HUD.updateItemValue("score", 25);
    }
});