define(['functions', 'settings'], function(func, settings) {

    CanvasRenderingContext2D.prototype.clear =
            CanvasRenderingContext2D.prototype.clear || function(preserveTransform) {
        if (preserveTransform) {
            this.save();
            this.setTransform(1, 0, 0, 1, 0, 0);
        }

        this.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (preserveTransform) {
            this.restore();
        }
    };

    var screen = function(options) {
        var opt = options || {};
        this.canvas = document.getElementById(opt.canvasElement);
        this.context = this.canvas.getContext("2d");
        //this.resources = opt.resources || {};

        var size = 48 / settings.option.screen.scale.x;

        this.canvas.width = (opt.optimize) ? func.client.width : opt.canvasWidth;
        this.canvas.height = (opt.optimize) ? func.client.height : opt.canvasHeight;

        if (opt.optimize) {
            document.body.style.padding = '0px';
            document.body.style.margin = '0px';
            document.body.style.overflow = 'hidden';
        }
    };
    screen.prototype = {
        grid: function(resources, grid) {
            var cx = (this.canvas.width) + settings.option.screen.left;
            var cy = -((grid[0].length * resources.displayH) / 2) + settings.option.screen.top;

            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[0].length; j++) {
                    var gradient = settings.option.grid.gradient(grid[i][j])

                    var x = (j - i) * resources.displayW;
                    var y = ((i + j) * resources.displayH) + (gradient.height * -resources.displayH);

                    //this checks the tile in front-left and backfills untill there are no gaps
                    if (i + 1 < grid.length) {
                        var g = settings.option.grid.gradient(grid[i + 1][j]);
                        var dif = gradient.height - g.height;
                        while (dif > 0) {
                            //console.log('backfill1');
                            resources.draw(this.context, 27, cx + x, cy + y + (resources.displayH * dif));
                            dif--
                        }
                    }

                    //this checks the tile front-right and backfills untill there are no gaps
                    if (j + 1 < grid.length) {
                        var g = settings.option.grid.gradient(grid[i][j + 1]);
                        var dif = gradient.height - g.height;
                        while (dif > 0) {
                            resources.draw(this.context, 27, cx + x, cy + y + (resources.displayH * dif));
                            dif--
                        }
                    }

                    //this fills up the left side of the box
                    if (i === grid.length - 1) {
                        var dif = gradient.height;
                        while (dif > 0) {
                            resources.draw(this.context, 27, cx + x, cy + y + (resources.displayH * dif));
                            dif--
                        }
                    }

                    //this fills up the right side of the box
                    if (j === grid[0].length - 1) {
                        var dif = gradient.height;
                        while (dif > 0) {
                            //console.log('backfill2');
                            resources.draw(this.context, 27, cx + x, cy + y + (resources.displayH * dif));
                            dif--
                        }
                    }
                    
                    //and this draws the actual tile
                    resources.draw(this.context, gradient.tile, cx + x, cy + y);
                }
            }
        },
        image: function() {
        },
        scale: function(x, y) {
            this.context.scale(x, y);
        },
        clear: function() {
            var w = this.canvas.width;
            this.canvas.width = 0;
            this.canvas.width = w;
            this.context.font = "bold 50px sans-serif";
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.scale(settings.option.screen.scale.x, settings.option.screen.scale.y)
        },
        write: function(text, x, y) {
            //console.log(this.context.font);
            this.context.fillText(text, x, y);
        }
    };

    return screen;
});
