var Powerups = me.ObjectEntity.extend({

    init: function(x, y) {
        // define this here instead of tiled
        settings = {
            name: "life",
            image: "life",
            spritewidth : 40,
            spriteheight : 40,
        };

        // this.parent() kutsub päritud init() funktsiooni 
        // välja, ning tolle sees võetakse mitmed väärtused
        // just settings objektilt. vt melonJS lähtekoodi.
        this.parent(x, y, settings);
	
	this.type = me.game.COLLECTABLE_OBJECT;
	
	this.collidable = true;
	
        this.visible = true;
    },
    bonus: function() {
        type: "life";
        return type;
    }
});
