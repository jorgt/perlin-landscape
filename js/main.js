requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime()
});

require(["engine", "resource", "screen", "grid", "settings"], function(
        engine,
        resource,
        screen,
        grid,
        settings) {


    /*
     how to i want settings...
     
     - array of possible perlin noise manipulations
     - array of possible grid manipulations / thresholds
     - scale, x, y...
     - animation on/off
     - smooth or fit-to-grid
     */
    settings.get('normal');
    //settings.option.perlin.function = 'repeat'

    //settings.option.grid.x = 10;
    //settings.option.grid.y = 10;



    engine.animate = false;
    grid.createGrid();
    
    //grid.grid = JSON.parse("[[0.5853378252876387,0.5843262643222199,0.5813454849540927,0.5767027181879378,0.5725301704390648],[0.49885248308200086,0.49886612572370165,0.4989063245084074,0.4990134306070285,0.5004063423907876],[0.41644060646266967,0.41744296806467485,0.42039599949252815,0.42514429516489977,0.4320163024414907],[0.34367479935207407,0.345646330082157,0.3512716247386081,0.36027380205671067,0.37237277560074666],[0.2841698951744875,0.2875265308029431,0.2958200157668004,0.3086593352407159,0.3255542628817145]]");

    engine.resources = resource.tile2;

    engine.screen = new screen({
        canvasElement: 'game',
        optimize: true,
        resources: this.resources
    })

    window.game = {
        engine: engine,
        settings: settings, 
        grid: grid
    };

    engine.init(grid);

});