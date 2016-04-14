define([], function() {

    var resource = function(options) {
        this.options = options || {};
        this.displayH = this.options.displayH;
        this.displayW = this.options.displayW;
        this.tiles = new Image;
        this.count = 0;
        this.loaded = false;
        this.tiles.src = this.options.image;
        this.tiles.onload = function() {
            this.loaded = true;
        }.bind(this);
    };
    resource.prototype = {
        draw: function(context, img, x, y) {
            if (img >= 0) {
                var col = (img % this.options.cols);
                var row = (img - col) / this.options.cols;
                var sx = (col) * this.options.width;
                var sy = (row) * this.options.height;

                context.drawImage(
                        this.tiles,
                        sx,
                        sy,
                        this.options.width,
                        this.options.height,
                        x,
                        y,
                        this.options.width,
                        this.options.height);
            }
        }
    };

    var resources = {
        tile2: new resource({
            image: 'img/tiles2.png',
            rows: 6,
            cols: 3,
            width: 52,
            height: 37,
            displayW: 22,
            displayH: 11
        })
    }

    return resources;
});