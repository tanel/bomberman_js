
var BombEntity = me.ObjectEntity.extend({

    // Nimi
    name: "bomb",
    
    // Mängija, kes pommi pani (vajalik, highscorei arvutusteks)
    player: null,

    // Millal pomm plahvatab
    explodeAt: 0,

    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.name = "bomb";
        settings.image = "pomm_mini";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        // this.parent() kutsub päritud init() funktsiooni 
        // välja, ning tolle sees võetakse mitmed väärtused
        // just settings objektilt. vt melonJS lähtekoodi.
        this.parent(x, y, settings);

        if (!settings.player) {
            throw("Must set player with bomb settings!");
        }
        
        this.player = settings.player;
        this.visible = true;

        me.audio.play("fuse", false, null, 0.6);

        // Paneme pommi n sek pärast plahvatama
        this.explodeAt = me.timer.getTime() + 1.5 * 1000;
    },
    
    update: function() {
        // do nothing if not visible
        if (! this.visible)
            return false;

        if (this.explodeAt < me.timer.getTime()) {
            this.player.bombs = this.player.bombs - 1;
            var settings = {bomb: this};
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
