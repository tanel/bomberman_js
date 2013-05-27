(function () {
    "use strict";

    window.bomberman = {
        spritewidth: 64,
        // Utility functions, taken from MelonJS source (they're private there):
        pixelToTileCoords: function(x, y) {
            return new me.Vector2d(Math.round(x / this.spritewidth), Math.round(y / this.spritewidth));
        },
        tileToPixelCoords: function(x, y) {
            return new me.Vector2d(Math.round(x * this.spritewidth), Math.round(y * this.spritewidth));
        },
        // Align pixel coordinates to tile
        alignPixelCoords: function(x, y) {
            var tileCoords = this.pixelToTileCoords(x, y);
            var pixelCoords = this.tileToPixelCoords(Math.round(tileCoords.x), Math.round(tileCoords.y));
            return {
                x: pixelCoords.x,
                y: pixelCoords.y
            };
        },
        // Tell apart if a tile is a breakable tile or not.
        knownBreakingTileId: null, // this value wil be set later in the game, when it's needed
        isBreakingTile: function(tile) {
            // If we already know which tile ID breaks on the collision map,
            // compare to it and we're done
            if (this.knownBreakingTileId === tile.tileId) {
                return true;
            } else if (!this.knownBreakingTileId) {
                // Fetch tile properties
                var props = me.game.collisionMap.tileset.getTileProperties(tile.tileId);
                if (props && props.isBreakable) {
                    // Remember the breaking tile ID
                    this.knownBreakingTileId = tile.tileId;
                    return true;
                }
            }
            return false;
        },
        // Tell apart if a tile is solid
        knownSolidTileId: null, // cache value, we honestly don't know it yet
        isSolidTile: function(vector2d) {
            if (vector2d.x >= 0 && vector2d.y >= 0) {
                var tile = me.game.collisionMap.getTile(vector2d.x, vector2d.y);
                if (!tile) {
                    return false;
                }
                // Following code checks if the tile is solid
                // *and* caches the result, so it can later be
                // reused for other tiles as well.
                if (this.knownSolidTileId === tile.tileId) {
                    return true;
                } else if (!this.knownSolidTileId) {
                    // Fetch tile properties
                    var props = me.game.collisionMap.tileset.getTileProperties(tile.tileId);
                    if (props && props.isSolid) {
                        this.knownSolidTileId = tile.tileId;
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        },
        clearBreakingTile: function(x, y) {
            if (x >= 0 && y >= 0) {
                var tile = me.game.collisionMap.getTile(x, y);
                if (tile && this.isBreakingTile(tile)) {
                    me.game.currentLevel.clearTile(tile.col, tile.row);
                    var pixelCoords = this.tileToPixelCoords(tile.col, tile.row);
                    this.tileBroken(pixelCoords);
                }
            }
        },
        tileBroken: function(pixelCoords) {
            var roll = Math.random(), entity = null;
            if (roll > 0.7) {
                entity = new CoinEntity(pixelCoords.x, pixelCoords.y);
            } else if (roll < 0.1) {
                entity = new FlamePowerEntity(pixelCoords.x, pixelCoords.y);
            }
            if (entity) {
                me.game.add(entity, 1000);
                me.game.sort();
            }
        }
    };

    if (window.location && window.location.href && (/debug/.test(window.location.href))) {
        window.bomberman.debug = true;
    }

    me.debug.renderHitBox = window.bomberman.debug;

    window.bomberman.resources = [{
        name: "level1_tileset_64",
        type: "image",
        src: "data/level1_tileset_64.png"
    }, {
        name: "kollisioon_64",
        type: "image",
        src: "data/kollisioon_64.png"
    }, {
        name: "level1",
        type: "tmx",
        src: "data/level1.tmx"
    }, {
        name: "gripe",
        type: "image",
        src: "data/sprite/gripe_64.png"
    }, {
        name: "flame",
        type: "image",
        src: "data/flame.png"
    }, {
        name: "bomb_animation",
        type: "image",
        src: "data/sprite/pomm_64.png"
    }, {
        name: "trap_animation",
        type: "image",
        src: "data/sprite/beartrap.png"
    }, {
        name: "life",
        type: "image",
        src: "data/sprite/life_powerup.png"
    }, {
        name: "flamepower",
        type: "image",
        src: "data/sprite/flame_icon.png"
    }, {
        name: "coin",
        type: "image",
        src: "data/sprite/coin.png"
    }, {
        name: "boom",
        type: "image",
        src: "data/sprite/plahvatus_64.png"
    }, {
        name: "evil",
        type: "image",
        src: "data/sprite/evil_64.png"
    }, {
        name: "moan",
        type: "audio",
        src: "data/audio/", channel: 1
    }, {
        name: "wscream",
        type: "audio",
        src: "data/audio/", channel: 1
    }, {
        name: "scream",
        type: "audio",
        src: "data/audio/", channel: 1
    }, {    
        name: "fuse",
        type: "audio",
        src: "data/audio/", channel: 1
    }, {    
        name: "bomb",
        type: "audio",
        src: "data/audio/", channel: 1
    }, {    
        name: "soda_open",
        type: "audio",
        src: "data/audio/", channel: 1
    }];

    window.bomberman.game = {

        onload: function () {
            if (!me.video.init('bombermanGame', 800, 600, true, 'auto')) {
                alert("Teie veebilehitseja ei toeta HTML5 canvas tehnoloogiat. Ei saa jätkata :(");
                return;
            }

            me.audio.init("mp3");
            me.loader.onload = this.loaded.bind(this);

            me.loader.preload(window.bomberman.resources);

            me.state.change(me.state.LOADING);
        },

        selectSpawnPoint: function () {
            var roll = Math.random();
            if (roll > 0.5) {
                me.entityPool.add("SpawnPoint1", PlayerEntity);
            } else {
                me.entityPool.add("SpawnPoint2", PlayerEntity);
            }
        },

        loaded: function () {
            me.sys.fps = 60;

            // cool transition between gamestates
            me.state.transition("fade", "#000000", 200);

            // Define gamestate screens
            me.state.set(me.state.PLAY, new PlayScreen());
            me.state.set(me.state.MENU, new TitleScreen());
            me.state.set(me.state.USER, new HelpScreen());
            me.state.set(me.state.SCORE, new ScoreScreen());

            // Add entities to pool. They will be initialized
            // according to map file.
            me.entityPool.add("enemyentity", EnemyEntity);
            me.entityPool.add("life", LifePowerupEntity);
            me.entityPool.add("coin", CoinEntity);
            me.entityPool.add("flamepower", FlamePowerEntity);
            me.entityPool.add("beartrap", BearTrap);

            this.selectSpawnPoint();

            // Lets disable default gravity
            me.sys.gravity = 0;

            // enable the keyboard
            me.input.bindKey(me.input.KEY.LEFT, "left");
            me.input.bindKey(me.input.KEY.RIGHT, "right");
            me.input.bindKey(me.input.KEY.UP, "up");
            me.input.bindKey(me.input.KEY.DOWN, "down");
            me.input.bindKey(me.input.KEY.X, "setBomb", true);

            me.input.bindKey(me.input.KEY.ESC, "abort", true);
            me.input.bindKey(me.input.KEY.ENTER, "enter", true);
            me.input.bindKey(me.input.KEY.V, "instructions", true);
            me.input.bindKey(me.input.KEY.S, "score", true);

            // Set gamestate to MENU.
            me.state.change(me.state.MENU);

            // add a default HUD to the game mngr (with no background)
            me.game.addHUD(0,0, me.video.width, 50);
        }
    };

    window.onReady(function () {
        window.bomberman.game.onload();
    });

}).call(this);
