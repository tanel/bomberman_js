/*global window: false, alert: false, me: false */

(function () {
    "use strict";

    // bomberman on nö namespace, mille küljes asuvad
    // kõik mänguga seotud objektid, funktsioonid, ressursid jne.
    window.bomberman = {};

    // Mängu vajaminevate ressursside massiiv.
    window.bomberman.resources = [{
        name: "level1_tiles",
        type: "image",
        src: "data/level1_tileset.png"
    }, {
        name: "level1_map",
        type: "tmx",
        src: "data/level1.tmx"
    }];

    // Mäng ise
    window.bomberman.game = {

        // Alustame mängu laadimist
        onload: function () {
            // Video initsiliaseerimise parameetrid on:
            // wrapper, width, height, double_buffering, scale, maintainAspectRatio
            // (vt http://www.melonjs.org/docs/symbols/me.video.html#init)
            if (!me.video.init('bombermanGame', 640, 480, false, 1.0)) {
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
            // Defineerime mängu state'ile vastavad vaated
            me.state.set(me.state.PLAY, new window.bomberman.playScreen());
            me.state.set(me.state.SCORE, new window.bomberman.playScreen());

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
            // FIXME: mängu state muutus.. lae uus level vms vajalik
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