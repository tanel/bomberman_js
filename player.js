
// Peategelase ehk mängija nn entity - PlayerEntity
var PlayerEntity = me.ObjectEntity.extend({

    bombs: 0,
    maxAllowedBombs: 3,

    init: function(x, y, settings) {
        // Initialize player variable in the global bomberman
        // namespace. So we can easily reference it, without
        // passing it around all the time.
        window.bomberman.player = this;

        // call the constructor
        // alternatiivne koht omaduste jaoks tiledi asemel
        settings.image = "gripe";
        settings.spritewidth = window.bomberman.spritewidth;

        this.parent(x, y, settings);

        // make it collidable
        this.collidable = true;
	
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0.15, 0.15);
	
        // speed gets capped at 4
        this.maxVel.x = 3;
        this.maxVel.y = 3;
        
        // Remove whitespace around the player tile.
        // Else it gets really hard for player to move.
        // 
         /*
         * @param {int} x x offset (specify -1 to not change the width)
         * @param {int} w width of the hit box
         * @param {int} y y offset (specify -1 to not change the height)
         * @param {int} h height of the hit box
         */
        //updateColRect : function(x, w, y, h)
        this.updateColRect(15, 40, 15, 40);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
    update: function() {
        // Do nothing if not visible and no restart is scheduled.
        if (!this.visible && !this.resetAt) {
            return false;
        }

        if (this.alive) {
            if (me.input.isKeyPressed('left')) {
                // flip the sprite on horizontal axis
                this.flipX(true);
                // update the entity velocity
                this.vel.x -= this.accel.x * me.timer.tick;
            } else if (me.input.isKeyPressed('right')) {
                // unflip the sprite
                this.flipX(false);
                // update the entity velocity
                this.vel.x += this.accel.x * me.timer.tick;
            } else {
                this.vel.x = 0;
            }

            if (me.input.isKeyPressed('up')) {
                // update the entity velocity
                this.vel.y -= this.accel.y * me.timer.tick;
            } else if (me.input.isKeyPressed('down')) {
                // update the entity velocity
                this.vel.y += this.accel.y * me.timer.tick;
            } else {
                this.vel.y = 0;
            }

            if (me.input.isKeyPressed('setBomb')) {
                if (this.bombs < this.maxAllowedBombs) {
                    this.bombs++;
                    // Position bomb exactly in the middle of a tile.
                    var aligned = window.bomberman.alignPixelCoords(this.pos.x, this.pos.y);
                    me.game.add(new BombEntity(aligned.x, aligned.y), 1000);
                    // ensure the object is properly displayed, vt http://www.melonjs.org/docs/symbols/me.game.html#add
                    me.game.sort();
                }
            }

            // check & update player movement
            this.updateMovement();

            // check for collision
            var res = me.game.collide(this);
            if (res) {
                if (res.obj.type === me.game.ENEMY_OBJECT && this.alive) {
                    this.die();
                } else if (res.obj.type === me.game.COLLECTABLE_OBJECT) {
                    res.obj.collect();
                } else if (res.obj.type === me.game.ACTION_OBJECT) { 
                    res.obj.springed();
                }
            }

            // update animation if necessary
            if (this.vel.x !== 0 || this.vel.y !== 0) {
                // update object animation
                this.parent();
                return true;
            }

        } else if (this.resetAt < me.timer.getTime()) {
            me.game.reset();
            me.state.change(me.state.PLAY);
            return false;

        } else if (this.removeAt < me.timer.getTime()) {
            this.visible = false;
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },

    die: function() {
        if (!this.alive) {
            return;
        }
        me.audio.play("scream");
	
        this.alive = false;
        this.setVelocity(0, 0);
        me.game.viewport.fadeIn("red", 2500);
        this.flicker(60);
        
        this.removeAt = me.timer.getTime() + 2 * 1000;
        this.resetAt = me.timer.getTime() + 2 * 1000;

        var livesLeft = me.game.HUD.getItemValue("lives");
        if (livesLeft > 0) {
            me.game.HUD.updateItemValue("lives", -1);
        } else {
            // No more lives left? Game over.
            me.state.change(me.state.SCORE);
        }
    }

});
