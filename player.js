
// Peategelase ehk mängija nn entity - PlayerEntity
var PlayerEntity = me.ObjectEntity.extend({

    // Nimi pommide omaja eristamiseks ja highscoreiks tulevikus
    name: '',

    // Aktiivsete pommide arv kaardil
    bombs: 0,
    
    // Max lubatud pommide arv kaardil
    maxAllowedBombs: 3,
    
    lives: 3,
    
    // Score
    score: 0,
 
    init: function(x, y, settings) {
        // Initialize player variable in the global bomberman
        // namespace. So we can easily reference it, without
        // passing it around all the time.
        window.bomberman.player = this;

        // call the constructor
        // alternatiivne koht omaduste jaoks tiledi asemel
        settings.image = "gripe";
        settings.spritewidth = 64;

        this.parent(x, y, settings);
	
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(1, 1);
	
        // maksimumkiirus
        this.maxVel.x = 2;
        this.maxVel.y = 2;
        
        // FIXME: what does hp mean? hewlett packard? should rename to something meaningful
        this.hp = 100;
        this.endTime = 0;
        this.isSet = 0;
        this.score = 0;

        // eemaldame whitespace'i playeri tile'i ümbert 
        // Remove whitespace around the player tile.
        // Else it gets really hard for player to move; as the tile
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
                this.bombs = this.bombs + 1;
                var bomb = new BombEntity(this.pos.x, this.pos.y, {player: this});
                me.game.add(bomb, 1000);
                me.game.sort(); // ensure the object is properly displayed, vt http://www.melonjs.org/docs/symbols/me.game.html#add
            }
        }
 
        // check & update player movement
        this.updateMovement();

        // check for collision
        var res = me.game.collide(this);
        if (res) {
            if (res.obj.type === me.game.ENEMY_OBJECT) {
                if (this.isSet === 0 && this.alive) {
                    this.hp = this.hp - 25; // decrease hitpoints
                    this.endTime = me.timer.getTime() + 1000;
                    this.isSet = 1; // end time was set
                    if (this.hp === 0)
                        this.alive = false;
                    }
                
                if (this.isSet === 1 && this.endTime <= me.timer.getTime()) { // When waiting time is over
                    this.isSet = 0;
                }
		
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
    }
 
});
