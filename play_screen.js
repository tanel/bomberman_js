
var PlayScreen = me.ScreenObject.extend({

    score: null,
    lives: null,
    range: null,
    timeHudItem: null,

    init: function(settings) {
        this.parent(true);
    },

    update: function() {
        if (me.input.isKeyPressed('abort')) {
            me.state.change(me.state.MENU);
            return true;
        }
        return false;
    },

    onResetEvent: function () {
        me.levelDirector.loadLevel("level1");

        // Split HUD into 4 sectors
        var sectorWidth = me.video.getWidth() / 4, hudItemWidth = 50;

        if (!this.score) {
            this.score = new ScoreObject(0 * sectorWidth, hudItemWidth);
            me.game.HUD.addItem("score", this.score);
        }

        if (!this.range) {
            this.range = new RangeObject(1 * sectorWidth, hudItemWidth);
            me.game.HUD.addItem("range", this.range);
            me.game.HUD.setItemValue("range", 2);
        }

        if (!this.lives) {
            this.lives = new LivesObject(2 * sectorWidth, hudItemWidth);
            me.game.HUD.addItem("lives", this.lives);
            me.game.HUD.setItemValue("lives", 3);
        }

        if (!this.timeHudItem) {
            this.timeHudItem = new TimeHudItem(3 * sectorWidth, hudItemWidth);
            me.game.HUD.addItem("time", this.timeHudItem);
        }

        me.game.add(new TimeoutEntity(60));
    }
});
