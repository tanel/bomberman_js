
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
	
        this.addAnimation ("ready", [0], 30);
        this.addAnimation ("springed", [1,2,3], 30);
        this.setCurrentAnimation("ready");

        this.visible = true;
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
    },

    springed: function() {
        this.setCurrentAnimation("springed");
        this.springAt = me.timer.getTime() + 2.0 * 1000;
    }
});
