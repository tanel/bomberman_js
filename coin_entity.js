var CoinEntity = me.ObjectEntity.extend({

    init: function(x, y) {
        // define this here instead of tiled
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
    }
});