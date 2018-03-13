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

    this.canvas.addEventListener("mousemove", e => {
      this.mousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    });
  };
  screen.prototype = {
    grid: function(resources, grid) {
      var cx = (this.canvas.width) + settings.option.screen.left;
      var cy = -((grid[0].length * resources.displayH) / 2) + settings.option.screen.top;
      var tile;

      if(this.mousePosition) {
        var tile = window.game.engine.screen.getTileAt(this.mousePosition.x, this.mousePosition.y, resources, grid);
      }

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
          if(tile && 99 - tile.x === i && tile.y === j) {
            var y2 = ((i + j) * resources.displayH) + (gradient.height * -resources.displayH);
            resources.draw(this.context, 15, cx + x, cy + y);
            //resources.diamond(this.context, cx + x, cy + y, [255,0,0], 0.2);
          }
        }
      }

      resources.draw(this.context, 16, cx + x, cy + y);
    },
    image: function() {},
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
    },
    getTileAt: function(mouseX, mouseY, resources, grid) {
      var l = grid.length;
      // translate mouse coordinates
      mouseX /= settings.option.screen.scale.x;
      mouseY /= settings.option.screen.scale.y;


      var tileWidth = resources.displayW / 2;
      var tileHeight = resources.displayH / 2;

      var topCornerPositionX = 4 /*wtf*/ + (this.canvas.width) + settings.option.screen.left + 2 * tileWidth;
      var topCornerPositionY = -((grid[0].length * resources.displayH) / 2) + settings.option.screen.top - tileWidth;

      var firstTileXShiftAtScreen = topCornerPositionX - l * tileWidth * 2;
      var firstTileYShiftAtScreenAt0Height = topCornerPositionY + l * tileHeight * 2;

      var ctx = this.canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(firstTileXShiftAtScreen, firstTileYShiftAtScreenAt0Height, 10, 10);

      var columnNo = this.getColumn(mouseX, firstTileXShiftAtScreen, tileWidth);

      var tilesInColumn = this.getTilesInColumn(columnNo, l, l);

      var exactTile = this.findExactTile(mouseX, mouseY, tilesInColumn, function(x, y) {
        return settings.option.grid.gradient(grid[99 - x][y]).height;
      }, firstTileXShiftAtScreen, firstTileYShiftAtScreenAt0Height, tileWidth, tileHeight, columnNo);

      return exactTile ? exactTile : {
        x: '-',
        y: '-'
      };
    },
    getColumn: function(mouseX, firstTileXShiftAtScreen, tileWidth) {
      return Math.floor((mouseX - firstTileXShiftAtScreen) / tileWidth / 2);
    },

    tileExists: function(x, y, width, height) {
      return x >= 0 & y >= 0 & x < width & y < height;
    },

    getTilesInColumn: function(columnNo, width, height) {
      var startTileX = 0,
        startTileY = 0;
      var xShift = true;
      for (var i = 0; i < columnNo; i++) {
        if (this.tileExists(startTileX + 1, startTileY, width, height)) {
          startTileX++;
        } else {
          if (xShift) {
            xShift = false;
          } else {
            startTileY++;
          }
        }
      }
      var tilesInColumn = [];
      while (this.tileExists(startTileX, startTileY, width, height)) {
        tilesInColumn.push({
          x: startTileX,
          y: startTileY,
          isLeft: xShift
        });
        if (xShift) {
          startTileX--;
        } else {
          startTileY++;
        }
        xShift = !xShift;
      }
      return tilesInColumn;
    },
    getTileYIncrementByTileZ: function(tileZ, tileHeight) {
      return tileZ * tileHeight * 2;
    },

    findExactTile: function(mouseX, mouseY, tilesInColumn, getTileZ,
      firstTileXShiftAtScreen, firstTileYShiftAtScreenAt0Height,
      tileWidth, tileHeight, columnNo) {
      // we built a set of tiles where bottom ones come first
      // iterate tiles from bottom to top
      for (var i = tilesInColumn.length - 1; i >= 0; i--) {
        var tileInfo = tilesInColumn[i];
        var lineAB = this.findABForTopLineOfTile(tileInfo.x, tileInfo.y, getTileZ(tileInfo.x, tileInfo.y),
          tileInfo.isLeft, tileWidth, tileHeight);

        this.context.strokeStyle = "#FF0000";
        this.context.beginPath();
        this.context.lineTo(firstTileXShiftAtScreen + columnNo * tileWidth * 2, firstTileYShiftAtScreenAt0Height + columnNo * tileWidth * 2 * lineAB.a + lineAB.b);
        this.context.lineTo(firstTileXShiftAtScreen + (columnNo + 1) * tileWidth * 2, firstTileYShiftAtScreenAt0Height + (columnNo + 1) * tileWidth * 2 * lineAB.a + lineAB.b);
        this.context.stroke();

        if ((mouseY - firstTileYShiftAtScreenAt0Height) >
          (mouseX - firstTileXShiftAtScreen) * lineAB.a + lineAB.b) {
          // WOHOO !!!
          return tileInfo;
        }
      }
    },

    findABForTopLineOfTile: function(tileX, tileY, tileZ, isLeftTopLine, tileWidth, tileHeight) {
      // find a top line ~~~ a,b
      // y = a * x + b;
      var a = tileHeight / tileWidth;
      if (isLeftTopLine) {
        a = -a;
      }
      var b = isLeftTopLine ?
        tileY * 4 * tileHeight :
        -(tileX + 1) * 4 * tileHeight;
      b -= this.getTileYIncrementByTileZ(tileZ, tileHeight) - 11;

      return {
        a: a,
        b: b
      };
    }
  };

  return screen;
});