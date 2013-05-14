
// Enemy
var EnemyEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "evil";
        settings.spritewidth = window.bomberman.spritewidth;

        // call the parent constructor
        this.parent(x, y, settings);

        // make him start from the right
        this.pos.x = x;
        this.walkLeft = true;

        // walking & jumping speed
        this.setVelocity(1, 1);

        // make it collidable
        this.collidable = true;

        // make it an enemy object
        this.type = me.game.ENEMY_OBJECT;
	
        // collisionbox reduced to actual character not image size
        this.updateColRect(7, 50, 10, 54);
    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
        if (this.alive) {
            if (this.dir === 0) {
                this.dir = 1;
            } else {
                this.dir = 0;
            }
        } 
    },

    // manage the enemy movement
    update: function() {
        // do nothing if not visible
        if (!this.visible)
            return false;

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            
            // make it walk
            if (this.dir === 0 && this.vel.y === 0) {
                this.flipX(this.walkLeft);
                this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
            } else if (this.dir === 1 && this.vel.y === 0) {
                this.flipX(0);
                this.vel.x += (this.walkLeft) ? this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
            } else if (this.dir === 2) {
                // alla
                this.vel.y += (this.walkLeft) ? this.accel.y * me.timer.tick : this.accel.y * me.timer.tick;
            } else if (this.dir === 3) {
                // yles
                this.vel.y += (this.walkLeft) ? -this.accel.y * me.timer.tick : this.accel.y * me.timer.tick;
            }

            // check and update movement
            this.updateMovement();

            // if enemy collides with wall, it starts moving in other direction
            // X-axis and Y-axis check
            if (this.vel.x === 0 && this.vel.y === 0) {
                if (this.dir === 0 || this.dir === 1) {
                    // Muudetakse vastase liikumise suunda
                    this.dir = Math.floor(Math.random() * 3) + 1;
                } else {
                    this.dir = 0;
                }
            }

            // update animation if necessary
            if (this.vel.x !== 0 || this.vel.y !== 0) {
                // update object animation
                this.parent();
                return true;
            }

        } else if (this.removeAt < me.timer.getTime()) {
            me.game.remove(this);
            return true;
        }

        return false;
    },

    die: function() {
        if (!this.alive) {
            // Aready dead
            return;
        }
        if (Math.random() >= 0.5) {
            me.audio.play("moan");
        } else {
            me.audio.play("wscream");
        }
        this.alive = false;
        this.setVelocity(0, 0);
        this.flicker(60);
        this.removeAt = me.timer.getTime() + 1 * 1000;

        me.game.HUD.updateItemValue("score", 10);
    }
});
