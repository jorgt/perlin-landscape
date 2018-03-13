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
    },
    diamond: function(context, x, y, color, opacity) {
      //Begin our drawing

      var h = 24;
      var w = 50;
      context.save();
      context.beginPath();
      context.moveTo(x + w / 2, y); //half width, 0 height
      context.lineTo(x + w, y + h / 2); // full width, half height
      context.lineTo(x + w / 2, y + h); //half width, full height
      context.lineTo(x, y + h / 2); // 0 width, half height

      //Define the style of the shape
      context.lineWidth = 1;
      context.fillStyle = `rgba(${color.join(',')})`;
      context.strokeStyle = `rgba(${color.join(',')},${opacity || 0})`;

      //Close the path
      context.closePath();

      //Fill the path with ourline and color
      context.fill();
      context.stroke();
      context.restore();

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