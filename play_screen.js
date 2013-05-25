
var PlayScreen = me.ScreenObject.extend({

    score: null,
    lives: null,
    range: null,

    init: function(settings) {
        this.parent(true);
    },

    onResetEvent: function () {
        me.levelDirector.loadLevel("level1");

        // add the "score" HUD item
        if (!this.score) {
            this.score = new ScoreObject(10, 40);
            me.game.HUD.addItem("score", this.score);
        }

        // add "bombs" counter HUD item
        if (!this.range) {
            this.range = new RangeObject(180, 40);
            me.game.HUD.addItem("range", this.range);
            // At beginning, player bombs have range of 2
            me.game.HUD.setItemValue("range", 2);
        }

        // add the "lives" HUD item
        if (!this.lives) {
            this.lives = new LivesObject(350, 40);
            me.game.HUD.addItem("lives", this.lives);
            // At beginning, player has 3 lives
            me.game.HUD.setItemValue("lives", 3);
        }
    }
});
