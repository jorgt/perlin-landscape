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
            var l = grid.length;

            console.log(grid);
            //console.log(grid[0][79]);

            for (var v = 0; v < grid.length; v++) {
                console.log(grid[v][30][30]);
            }

            for (var z = 0; z < grid.length; z++) {

                for (var i = 0; i < grid[0].length; i++) {
                    for (var j = 0; j < grid[0][0].length; j++) {
                        //var gradient = settings.option.grid.gradient(grid[i][j])
                        var h = z;


                        var tile = -1;
                        var exp = Math.pow(1.1, z);

                        var t = grid[z][i][j];


                        //console.log(grid[z][i][j])
                        /*
                         if (z < 1 && t < 0.7) {
                         //console.log(z);
                         tile = 13;
                         } else if (z < 2 && t < 0.6) {
                         tile = 18
                         }else if (z < 6 && t < 0.5) {
                         tile = 19
                         }else if (z < 8 && t < 0.4) {
                         tile = 20
                         
                         
                         if (t > 0) {
                         tile = -1;
                         } else if (t > -0.03) {
                         tile = 26
                         } else if (t > -0.06) {
                         tile = 25
                         } else if (t > -0.08) {
                         tile = 24
                         } else if (t > -0.2) {
                         tile = 23
                         } else if (t > -0.25) {
                         tile = 22
                         } else if (t > -0.3) {
                         tile = 21
                         }else if (t > -0.4) {
                         tile = 20
                         }else if (t > -0.5) {
                         tile = 19
                         }else if (t > -0.6) {
                         tile = 18
                         } else {
                         tile = 13;
                         }
                         }*/


                        if (t < -0.8) {
                            tile = 18
                        } else if (t < -0.5) {
                            tile = 19;
                        } else if (t < -0.3) {
                            tile = 20
                        } else if (t < 0) {
                            tile = 21;
                        }

                        var x = (j - i) * resources.displayW;
                        var y = ((i + j) * resources.displayH) + (h * -resources.displayH);

                        resources.draw(this.context, tile, cx + x, cy + y);
                    }
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