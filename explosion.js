var Explosion = me.ObjectEntity.extend({
    init: function(x, y, settings, dir) {
        settings.image = "boom";
        me.audio.play("bomb", false, null, 0.6);
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        settings.type = me.game.ACTION_OBJECT;
        settings.collidable = true;
        this.x = x;
        this.y = y;
        this.parent(x, y, settings);
        this.bomb = settings.bomb;
        this.extTime = 70; // Laienemisaeg
        this.bombRadius = 6;
        this.currentRadius = 1; // Hetkel kui palju plahvatus laienend on
        this.dir = dir;
        this.laiendusX = -1;
        this.laiendusY = -1;
        switch (dir) {
        case "left":
            this.laiendusX = -32; 
            break;
        case "right":
            this.laiendusX = 32; 
            break;
        case "up":
            this.laiendusY = 32; 
            break;
        case "down":
            this.laiendusY = -32; 
            break;
        default:
            throw("Explosion direction Unknown!");
        }
	
        // Ajaarvamise algus :)
        this.startMoment = me.timer.getTime();
	
        // Kustutame selle n seki pärast
        this.endTime = this.startMoment + (this.extTime * (this.bombRadius + 1));
    },
    
    update: function() {
        // do nothing if not visible
        if (! this.visible)
            return false;

        // Collisionboxi laiendamine ajaliselt
        if ((this.startMoment + this.extTime * this.currentRadius) <= me.timer.getTime()) {
            this.grow();
        }

        var viewNeeedsUpdate = false;

        // Otsime entiteete, mis jäävad plahvatuse alasse.                       
        // Leitud entiteedid võib nö sodiks lasta.
        var res = me.game.collide(this);
        if (res) {
            var row, col;
            if (res.obj.type === me.game.ENEMY_OBJECT) {
                if (res.obj.alive) {
                    res.obj.doomed();
                }
                row = parseInt((res.x + this.pos.x) / 32, 10);
                col = parseInt((res.y + this.pos.y) / 32, 10);
                me.game.currentLevel.clearTile(row, col);
                viewNeeedsUpdate = true;
            } else if (res.obj.type === me.game.ACTION_OBJECT) {
                row = Math.round(res.x / 32);
                col = Math.round(res.y / 32);
                me.game.currentLevel.clearTile(row, col);
                viewNeeedsUpdate = true;
            }
        }

        if (this.endTime <= me.timer.getTime()) {
            me.game.remove(this);
            viewNeeedsUpdate = true;
        }

        return viewNeeedsUpdate;
    },

    grow: function() {
        var w = this.laiendusX * this.currentRadius;
        var h = this.laiendusY * this.currentRadius;
        console.log('w = ', w, 'h = ', h);

        this.updateColRect(-1, w,-1, h);
        if (this.currentRadius < this.bombRadius) {
            this.currentRadius++;
        } 
    } 
});
