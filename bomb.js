
var BombEntity = me.ObjectEntity.extend({

    // When bomb detonates
    explodeAt: 0,

    init: function(x, y) {
        // define this here instead of tiled
        settings = {
            name: "bomb",
            image: "bomb_animation",
            spritewidth: window.bomberman.spritewidth,
            spriteheight: window.bomberman.spritewidth
        };

        // this.parent() kutsub päritud init() funktsiooni 
        // välja, ning tolle sees võetakse mitmed väärtused
        // just settings objektilt. vt melonJS lähtekoodi.
        this.parent(x, y, settings);
	
	this.addAnimation ("zzz", [0,1,2,3], 30);
	this.setCurrentAnimation("zzz");

        this.visible = true;

        me.audio.play("fuse", false, null, 0.6);

        // Timer when bomb explodes
        this.explodeAt = me.timer.getTime() + 2.0 * 1000;

        // adjust collisionbox to actual bomb not image size
        this.updateColRect(6, 44, 14, 44);
    },
    
    update: function() {
        // do nothing if not visible
        if (! this.visible) {
            return false;
        }
        this.parent(true);

        if (this.explodeAt < me.timer.getTime()) {
            window.bomberman.player.bombs--;
            var settings = {
                bomb: this
            };
            var explodeRight = new Explosion(this.pos.x, this.pos.y, settings, "right");
            var explodeLeft = new Explosion(this.pos.x, this.pos.y, settings, "left");
            var explodeUp = new Explosion(this.pos.x, this.pos.y, settings, "up");
            var explodeDown = new Explosion(this.pos.x, this.pos.y, settings, "down");
            me.game.add(explodeRight, 1000);
            me.game.add(explodeLeft, 1000);
            me.game.add(explodeUp, 1000);
            me.game.add(explodeDown, 1000);
            me.game.sort();
            me.game.remove(this);
            this.parent();
            return true;
        }

        return false;
    }
});
