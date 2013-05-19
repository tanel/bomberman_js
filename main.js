/*global window: false, alert: false, me: false */
(function () {
    "use strict";

    // bomberman on nö namespace, mille küljes asuvad
    // kõik mänguga seotud objektid, funktsioonid, ressursid jne.
    window.bomberman = {
        spritewidth: 64,
        knownBreakingTileId: null // this value wil be set later in the game, when it's needed
    };

    // Kui URLi lõppu brauseris lisada ?debug, siis kuvatakse igasugu debug infot.
    if (window.location && window.location.href && (/debug/.test(window.location.href))) {
        window.bomberman.debug = true;
    }

    me.debug.renderHitBox = window.bomberman.debug;

    // Mängu vajaminevate ressursside massiiv.
    // Leveli map ise on TMX formaadis, vt lisaks https://github.com/bjorn/tiled/wiki/TMX-Map-Format
    // Leveli mapi redigeerimiseks on vajalik Tiled Map Editor, vt http://www.mapeditor.org/
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

    // Mäng ise
    window.bomberman.game = {

        // Alustame mängu laadimist
        onload: function () {
            // Video initsiliaseerimise parameetrid on:
            // wrapper, width, height, double_buffering, scale, maintainAspectRatio
            // (vt http://www.melonjs.org/docs/symbols/me.video.html#init)
            if (!me.video.init('bombermanGame', 800, 600, false, 1.0, false)) {
                alert("Teie veebilehitseja ei toeta HTML5 canvas tehnoloogiat. Ei saa jätkata :(");
                return;
            }

            // MelonJS loader proovib audiofaile laadida sellest järjekorras: mp3, ogg.
            // Kui veebilehitsejal puuduvad sobivad audio codec'id, siis mängul heli puudub
            // (vt http://www.melonjs.org/docs/symbols/me.audio.html#init)
            me.audio.init("mp3");
            // loader tegeleb mängu ressursside laadimisega. Kui ta on laadimisega
            // valmis saanud, siis tahame, et ta käivitaks meie funktsiooni "loaded":
            // (vt http://www.melonjs.org/docs/symbols/me.loader.html)
            me.loader.onload = this.loaded.bind(this);

            // Alustame mängule vajalike ressursside laadimist:
            me.loader.preload(window.bomberman.resources);

            // Kuniks mängu ressursid laevad, kuvame "Loading.." lehe kasutajale.
            me.state.change(me.state.LOADING);
        },

        // Kui mäng on laetud, käivitab loader siinse funktsiooni,
        // sest omistasime selle eelnevalt me.loader.onload'ile:
        loaded: function () {

            // cool transition between gamestates
            me.state.transition("fade", "#000000", 200);

            // Define gamestate screens
            me.state.set(me.state.PLAY, new PlayScreen());
            me.state.set(me.state.MENU, new TitleScreen());
            me.state.set(me.state.USER, new HelpScreen());
            me.state.set(me.state.SCORE, new ScoreScreen());

            // Add entities to pool. They will be initialized
            // according to map file.
            me.entityPool.add("mainPlayer", PlayerEntity);
            me.entityPool.add("enemyentity", EnemyEntity);
            me.entityPool.add("life", LifePowerupEntity);
            me.entityPool.add("coin", CoinEntity);
            me.entityPool.add("flamepower", FlamePowerEntity);

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

    // Kui leht on brauserisse laetud, hakkab mäng laadima
    window.onReady(function () {
        window.bomberman.game.onload();
    });

}).call(this);
