
// Peategelase ehk mängija nn entity - PlayerEntity
var PlayerEntity = me.ObjectEntity.extend({

    // Aktiivsete pommide arv kaardil
    bombs: 0,
    
    // Max lubatud pommide arv kaardil
    maxAllowedBombs: 3,

    // Number of lives left    
    lives: 3,
    
    // Current game score
    score: 0,
 
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
        this.setVelocity(1, 1);
	
        // maksimumkiirus
        this.maxVel.x = 2;
        this.maxVel.y = 2;
        
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
        this.updateColRect(7, 50, 10, 54);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
    update: function() {
        if (!this.alive) {
            return false;
        }

        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
			//this.vel.y -= this.accel.y * me.timer.tick;
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
                var bomb = new BombEntity(this.pos.x, this.pos.y, {player: this});
                me.game.add(bomb, 1000);
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
            } else if (res.obj.type === me.game.ACTION_OBJECT) {
                // FIXME: powerupi puutumine peaks selle üles korjama ning powerupi sisse lülitama
            }
        }

        // update animation if necessary
        if (this.vel.x !== 0 || this.vel.y !== 0) {
            // update object animation
            this.parent();
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },

    die: function() {
        me.audio.play("scream");
        this.alive = false;
        this.setVelocity(0, 0);
    }

});
