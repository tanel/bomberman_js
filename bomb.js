
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

        // Paneme pommi n sek pärast plahvatama
        this.explodeAt = me.timer.getTime() + 2 * 1000;
    },
    
    update: function() {
        // do nothing if not visible
        if (! this.visible)
            return false;

        if (this.explodeAt < me.timer.getTime()) {
            this.player.bombs = this.player.bombs - 1;
            var explosion = new Explosion(this.pos.x, this.pos.y, {bomb: this});
            me.game.add(explosion, 1000);
            me.game.sort();
            me.game.remove(this);
            this.parent();
            return true;
        }

        return false;
    }
});
