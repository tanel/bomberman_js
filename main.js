/*global window: false, alert: false, me: false */

(function () {
    "use strict";

    // bomberman on nö namespace, mille küljes asuvad
    // kõik mänguga seotud objektid, funktsioonid, ressursid jne.
    window.bomberman = {};

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
        name: "metatiles64x64",
        type: "image",
        src: "data/metatiles64x64.png"
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
        name: "pomm",
        type: "image",
        src: "data/sprite/pomm_64.png"
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
        name: "fuse",
        type: "audio",
        src: "data/audio/", channel: 1
    }, {    
        name: "bomb",
        type: "audio",
        src: "data/audio/", channel: 1
    }, {
        name: "32x32_font",
        type: "image",
        src: "data/sprite/32x32_font.png"
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

            // Makes framecounter visible if browser has javascript support
            framecounter.setAttribute('style', 'visibility: visible');

            // Define gamestate screens
            me.state.set(me.state.PLAY, new PlayScreen());
            me.state.set(me.state.MENU, new TitleScreen());

            // Lisame entity pooli playeri ja vaenlase
            me.entityPool.add("mainPlayer", PlayerEntity);
            me.entityPool.add("enemyentity", EnemyEntity);

            // Lets disable default gravity
            me.sys.gravity = 0;

            // enable the keyboard
            me.input.bindKey(me.input.KEY.LEFT, "left");
            me.input.bindKey(me.input.KEY.RIGHT, "right");
            me.input.bindKey(me.input.KEY.UP, "up");
            me.input.bindKey(me.input.KEY.DOWN, "down");
            me.input.bindKey(me.input.KEY.X, "setBomb", true);
            me.input.bindKey(me.input.KEY.M, "music", true);
            me.input.bindKey(me.input.KEY.ESC, "abort", true);

            // Set gamestate to MENU.
            me.state.change(me.state.MENU);
        }
    };

    // Kui leht on brauserisse laetud, hakkab mäng laadima
    window.onReady(function () {
        window.bomberman.game.onload();
    });

}).call(this);
