define(['libs/simplex.perlin', 'settings'], function(simplex, settings) {

    var loop = 0;

    var grid = function() {
        this.noise = {};
        this.grid = [];
        this.lvl = this.setLevel(40);
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



        this.function = this.noise[settings.option.perlin.function];
    };

    grid.prototype.addNoiseFunction = function(opt) {
        this.noise[opt.name] = opt.function;
    }

    grid.prototype.useNoiseFunction = function(name) {
        this.function = this.noise[name];
    }


    grid.prototype.createGrid = function() {
        this.function = this.noise[settings.option.perlin.function];
        var p = simplex;

        var maxX = settings.option.grid.x
        var maxY = settings.option.grid.y;

        var zz = Math.random() * 100;
        var x, y, xx, yy;
        
        p.setRng(Math); //math has a random number generator called 'random()'
        p.noiseDetail(settings.option.grid.octavtes, settings.option.grid.persistence);

        for (var y = 0; y < maxY; y++) {
            this.grid[y] = new Array(maxX);
            for (var x = 0; x < maxX; x++) {
                xx = 0 + x * this.level;
                yy = 0 + y * this.level;

                this.grid[y][x] = this.function(p.noise(xx, yy, zz));
            }

        }
        return this.grid;
    }

    grid.prototype.setLevel = function(lvl) {
        this.level = 0.01 + (0.09 * (lvl/100));
    }

    grid.prototype.getLevel = function() {
        return Math.floor((this.level - 0.01) / 0.09) * 100
    }

    grid.prototype.recalc = function(frame) {
        var p = simplex;
        loop++

        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[0].length; x++) {
                var fDff = loop == 0 ? 1.5 : 1;
                xx = 0 + x * this.level * fDff;
                yy = 0 + y * this.level * fDff;

                //console.log(xx + ' ' + yy);
                this.grid[y][x] = this.function(p.noise(xx, yy, loop * 0.005));
            }
        }
    }

    return new grid();

});