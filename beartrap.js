
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
	
        this.addAnimation("ready", [0], 30);
        this.addAnimation("springed", [1,2,3], 30);
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
            // FIXME: spring the trap
            return true;
        }

        return false;
    },

    startAction: function() {
        if (!this.actionStarted) {
            this.setCurrentAnimation("springed");
            this.springAt = me.timer.getTime() + 2.0 * 1000;
        }
    }
});
