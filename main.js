/*global window: false, alert: false, me: false */

(function () {
    "use strict";

    //me.debug.renderHitBox = true;

    // bomberman on nö namespace, mille küljes asuvad
    // kõik mänguga seotud objektid, funktsioonid, ressursid jne.
    window.bomberman = {};
    // Mängu vajaminevate ressursside massiiv.
    // Leveli map ise on TMX formaadis, vt lisaks https://github.com/bjorn/tiled/wiki/TMX-Map-Format
    // Leveli mapi redigeerimiseks on vajalik Tiled Map Editor, vt http://www.mapeditor.org/
    window.bomberman.resources = [{
        name: "level1_tileset", // NB! oluline, et oleks sama nimega, mis TMX failis
        type: "image",
        src: "data/level1_tileset.png"
    }, {
        name: "metatiles32x32", // NB! oluline, et oleks sama nimega, mis TMX failis
        type: "image",
        src: "data/metatiles32x32.png"
    }, {
        name: "level1",
        type: "tmx",
        src: "data/level1.tmx"
    }, {
        name: "gripe_run_right",
        type: "image",
        src: "data/sprite/gripe_run_right.png"
    }, {
        name: "wheelie_right",
        type: "image",
        src: "data/sprite/wheelie_right.png"
    }];

    // Mäng ise
    window.bomberman.game = {

        // Alustame mängu laadimist
        onload: function () {
            // Video initsiliaseerimise parameetrid on:
            // wrapper, width, height, double_buffering, scale, maintainAspectRatio
            // (vt http://www.melonjs.org/docs/symbols/me.video.html#init)
            if (!me.video.init('bombermanGame', 640, 480, false, 1.0, false)) {
                alert("Teie veebilehitseja ei toeta HTML5 canvas tehnoloogiat. Ei saa jätkata :(");
                return;
            }

            // MelonJS loader proovib audiofaile laadida sellest järjekorras: mp3, ogg.
            // Kui veebilehitsejal puuduvad sobivad audio codec'id, siis mängul heli puudub
            // (vt http://www.melonjs.org/docs/symbols/me.audio.html#init)
            me.audio.init("mp3,ogg");

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
            // Teeb framecounteri nähtavaks kui JS on enabled.
            framecounter.setAttribute('style', 'visibility: visible');

            // Defineerime mängu state'ile vastavad vaated
            me.state.set(me.state.PLAY, new window.bomberman.playScreen());
            me.state.set(me.state.SCORE, new window.bomberman.playScreen());

            // Lisame entity pooli playeri ja vaenlase
            me.entityPool.add("mainPlayer", PlayerEntity);
            me.entityPool.add("enemyentity", EnemyEntity);

            // Nullime default gravitatsiooni
            me.sys.gravity = 0;

            // enable the keyboard
            me.input.bindKey(me.input.KEY.LEFT, "left");
            me.input.bindKey(me.input.KEY.RIGHT, "right");
            me.input.bindKey(me.input.KEY.UP, "up");
            me.input.bindKey(me.input.KEY.DOWN, "down");
            me.input.bindKey(me.input.KEY.X, "setBomb", true);
            me.input.bindKey(me.input.KEY.M, "music", true);
            me.input.bindKey(me.input.KEY.ESC, "abort", true);

            // Määrame mängu state'iks PLAY.
            me.state.change(me.state.PLAY);
        }
    };

    // Screen objektist pärinevad kõik erinevad mängu nn screenid,
    // näiteks "Loading..", "High score", "ingame" ehk mäng ise ka.
    // (vt http://www.melonjs.org/docs/symbols/me.ScreenObject.html)
    window.bomberman.playScreen = me.ScreenObject.extend({
        // Mängu state'i haldus kutsub seda funktsiooni välja,
        // kui mängu state muutub.
        onResetEvent: function () {
            // levelDirector tegeleb leveli jaoks vajalike ressursside
            // laadimise ning haldamisega. Käseme tal level1 sisse laadida:
            // (vt http://www.melonjs.org/docs/symbols/me.levelDirector.html)
            me.levelDirector.loadLevel("level1");
        },

        onDestroyEvent: function () {
            // FIXME: mida teha, kui mäng on lõppenud
        }
    });

    window.bomberman.scoreScreen = me.ScreenObject.extend({});

    // Kui leht on brauserisse laetud, hakkab mäng laadima
    window.onReady(function () {
        window.bomberman.game.onload();
    });

}).call(this);