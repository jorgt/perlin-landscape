define([], function() {

    window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(/* function */ callback, /* DOMElement */ element) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

    window.cancelAnimFrame = (function() {
        window.cancelAnimFrame ||
                function(id) {
                    clearTimeout(id);
                };
    })();

    var lastRun = new Date().getTime();

    var engine = {
        animate: false,
        resources: null,
        screen: null,
        grid: [],
        init: function(grid) {
            var timer = setInterval(function() {
                if (engine.resources.loaded) {
                    engine.grid = grid;
                    engine.loop()
                    clearInterval(timer);
                } else {
                    console.log('waiting for resource');
                }
            }, 50);
        },
        loop: function(frame) {
            if (engine.animate) {
                var delta = (new Date().getTime() - lastRun) / 1000;
                lastRun = new Date().getTime();
                fps = Math.floor(1 / delta);

                requestAnimFrame(engine.loop);
                engine.draw();
                engine.update();

                engine.screen.write(fps, 50, 50)
            } else {
                requestAnimFrame(engine.loop);
                engine.draw();
                //engine.update(0);
            }

        },
        draw: function() {
            engine.screen.clear();
            engine.screen.grid(engine.resources, engine.grid.grid);
        },
        update: function() {
            engine.grid.recalc();
        },
        scale: function(x, y) {
            engine.screen.scale(x, y);
        },
        start: function() {
            engine.animate = true;
        },
        stop: function() {
            engine.animate = false;
        },
        toggle: function() {
            engine.animate = !engine.animate;
        }
    }

    return engine;
});