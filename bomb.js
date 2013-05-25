
var BombEntity = me.ObjectEntity.extend({

    init: function(x, y) {
        settings = {
            name: "bomb",
            image: "bomb_animation",
            spritewidth : window.bomberman.spritewidth,
            spriteheight: window.bomberman.spriteheight
        };

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
        if (! this.visible) {
            return false;
        }
        this.parent(true);

        if (this.explodeAt < me.timer.getTime()) {
            window.bomberman.player.bombs--;
            var explosion = new Explosion(this.pos.x, this.pos.y);
            me.game.add(explosion, 1000);
            this.visible = false;
            me.game.remove(this);
            me.game.sort();
            return true;
        }

        return false;
    }
});
