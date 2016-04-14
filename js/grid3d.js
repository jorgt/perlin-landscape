define(['libs/perlin.simplex', 'libs/simplex.perlin', 'settings'], function(simplex, perlin, settings) {

    var loop = 0;

    var grid = function() {
        this.noise = {};
        this.grid = [];
        this.noise.normal = function(noise) {
            return noise;
        }

        this.noise.bw = function(noise) {
            return noise > 0.5 ? 0 : 1;
        }

        this.noise.bwbw = function(noise) {
            return ((noise * 8) % 2) < 1 ? 0 : 1
        }
        this.noise.repeat = function(noise) {
            return (noise * 1024 % 256) / 256
        }
        this.noise.lines = function(noise) {
            return Math.abs(noise - .5) * 2.5
        }
        this.noise.mud = function(noise) {
            //requires Y in there
            return Math.floor(Math.pow(noise * 4, 1.1))
        }



        this.
                function = this.noise[settings.option.perlin.function];
    };

    grid.prototype.addNoiseFunction = function(opt) {
        this.noise[opt.name] = opt.
                function;
    }

    grid.prototype.useNoiseFunction = function(name) {
        this.
                function = this.noise[name];
    }


    grid.prototype.createGrid = function() {
        //this.function = this.noise[settings.option.perlin.function];

        var maxZ = 80;

        var maxX = 80;//settings.option.grid.x
        var maxY = 80;//settings.option.grid.y;
        var fScl = .0422;
        var zz = Math.random() * 100;
        var x, y, xx, yy;
        perlin.setRng(Math); //math has a random number generator called 'random()'
        perlin.noiseDetail(settings.option.grid.octavtes, settings.option.grid.persistence);
        for (var z = 0; z < maxZ; z++) {
            this.grid[z] = new Array(maxZ)
            for (var y = 0; y < maxY; y++) {
                this.grid[z][y] = new Array(maxY);
                for (var x = 0; x < maxX; x++) {
                    xx = 0 + x * fScl;
                    yy = 0 + y * fScl;
                    zz = 0 + z * fScl;

                    if (perlin.noise(xx, yy, zz) * maxZ < z) {
                        this.grid[z][y][x] = 2;
                    } else {
                        //simplex.noise(xx, yy, Math)
                        this.grid[z][y][x] = simplex.noise3d(xx, yy, zz*0.3);//simplex.noise3d(xx, yy, zz);      
                    }


                }
            }
        }
        return this.grid;
    }

    grid.prototype.recalc = function(frame) {
        var p = simplex;
        var fScl = .0422;
        loop++

        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[0].length; x++) {
                var fDff = loop == 0 ? 1.5 : 1;
                xx = 0 + x * fScl * fDff;
                yy = 0 + y * fScl * fDff;

                //console.log(xx + ' ' + yy);
                this.grid[y][x] = this.
                        function(p.noise(xx, yy, loop * 0.005));
            }
        }
    }

    return new grid();

});