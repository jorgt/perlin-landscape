define([], function() {

    var settings = {
        option: {},
        set: function(name, obj) {
            settings.options[name] = obj
        },
        get: function(name) {
            settings.option = settings.options[name];
        },
        options: {
            lines: {
                grid: {
                    x: 100,
                    y: 100,
                    gradient: function(noise) {
                        var water = 3;
                        var ret = {};
                        ret.tile = 4;
                        ret.height = noise * 5;
                        if (ret.height < water) {
                            ret.tile = 13;
                            ret.height = water;
                        }
                        return ret;
                    }
                },
                screen: {
                    top: 750,
                    left: 0,
                    scale: {
                        x: 0.5,
                        y: 0.5
                    }
                },
                perlin: {
                    function: 'bwbw',
                    octaves: 6,
                    persistence: 0.5
                }
            },
            normal: {
                grid: {
                    x: 100,
                    y: 100,
                    gradient: function(noise) {
                        var water = 0.15;
                        var ret = {};
                        ret.tile = 4;
                        ret.height = Math.pow((noise * 4), 2.3);
                        ret.noise = noise;
                        
                        if (noise < water) {
                            ret.tile = 13;
                            ret.height = -1;
                        } else if (noise < 0.2) {
                            ret.height = 0;
                            ret.tile = 18;
                        } else if (noise < 0.25) {
                            ret.tile = 18;
                        } else if (noise < 0.35) {
                            ret.tile = 19;
                        } else if (noise < 0.55) {
                            ret.tile = 20;
                        } else if (noise < 0.60) {
                            ret.tile = 21;
                        } else if (noise < 0.65) {
                            ret.tile = 22;
                        } else if (noise < 0.75) {
                            ret.tile = 23;
                        } else if (noise < 0.78) {
                            ret.tile = 24;
                        } else if (noise < 0.85) {
                            ret.tile = 25;
                        } else if (noise < 0.95) {
                            ret.tile = 26;
                        } else {
                            ret.tile = 29;
                        }

                        return ret;
                    }
                },
                screen: {
                    top: 750,
                    left: -50,
                    scale: {
                        x: 0.5,
                        y: 0.5
                    }
                },
                perlin: {
                    function: 'normal',
                    octaves: 6,
                    persistence: 0.5
                }
            },
            normalgrid: {
                grid: {
                    x: 5,
                    y: 5,
                    gradient: function(noise) {
                        var water = 0.15;
                        var ret = {};
                        ret.tile = 4;
                        ret.height = Math.floor(Math.pow((noise * 4), 2.3));
                        if (noise < water) {
                            ret.tile = 13;
                            ret.height = -1;
                        } else if (noise < 0.2) {
                            ret.height = 0;
                            ret.tile = 18;
                        } else if (noise < 0.25) {
                            ret.tile = 18;
                        } else if (noise < 0.35) {
                            ret.tile = 19;
                        } else if (noise < 0.55) {
                            ret.tile = 20;
                        } else if (noise < 0.60) {
                            ret.tile = 21;
                        } else if (noise < 0.65) {
                            ret.tile = 22;
                        } else if (noise < 0.75) {
                            ret.tile = 23;
                        } else if (noise < 0.78) {
                            ret.tile = 24;
                        } else if (noise < 0.85) {
                            ret.tile = 25;
                        } else if (noise < 0.95) {
                            ret.tile = 26;
                        } else {
                            ret.tile = 29;
                        }

                        return ret;
                    }
                },
                screen: {
                    top: 300,
                    left: -1200,
                    scale: {
                        x: 1,
                        y: 1
                    }
                },
                perlin: {
                    function: 'normal',
                    octaves: 6,
                    persistence: 0.5
                }
            },
            grid: {
                grid: {
                    x: 300,
                    y: 230,
                    gradient: function(noise) {
                        var water = 0.15;
                        var ret = {};
                        ret.tile = 4;
                        ret.height = Math.floor(noise * 5); //Math.pow((noise * 4), 2.3);
                        if (noise < water) {
                            ret.tile = 13;
                            ret.height = -0.3;
                        } else if (noise < 0.25) {
                            ret.tile = 18;
                        } else if (noise < 0.35) {
                            ret.tile = 19;
                        } else if (noise < 0.55) {
                            ret.tile = 20;
                        } else if (noise < 0.60) {
                            ret.tile = 21;
                        } else if (noise < 0.65) {
                            ret.tile = 22;
                        } else if (noise < 0.75) {
                            ret.tile = 23;
                        } else if (noise < 0.78) {
                            ret.tile = 24;
                        } else if (noise < 0.85) {
                            ret.tile = 25;
                        } else if (noise < 1.1) {
                            ret.tile = 26;
                        } else {
                            ret.tile = 29;
                        }

                        return ret;
                    }
                },
                screen: {
                    top: 450,
                    left: -200,
                    scale: {
                        x: 0.5,
                        y: 0.5
                    }
                },
                perlin: {
                    function: 'lines',
                    octaves: 6,
                    persistence: 0.5
                }
            },
            flatgrid: {
                grid: {
                    x: 300,
                    y: 230,
                    gradient: function(noise) {
                        var water = 0.15;
                        var ret = {};
                        ret.tile = 4;
                        ret.height = 1; //Math.floor(noise*5);//Math.pow((noise * 4), 2.3);
                        if (noise < water) {
                            ret.tile = 13;
                            ret.height = -0.3;
                        } else if (noise < 0.25) {
                            ret.tile = 18;
                        } else if (noise < 0.35) {
                            ret.tile = 19;
                        } else if (noise < 0.55) {
                            ret.tile = 20;
                        } else if (noise < 0.60) {
                            ret.tile = 21;
                        } else if (noise < 0.65) {
                            ret.tile = 22;
                        } else if (noise < 0.75) {
                            ret.tile = 23;
                        } else if (noise < 0.78) {
                            ret.tile = 24;
                        } else if (noise < 0.85) {
                            ret.tile = 25;
                        } else if (noise < 1.1) {
                            ret.tile = 26;
                        } else {

                            ret.tile = 29;
                        }

                        return ret;
                    }
                },
                screen: {
                    top: 450,
                    left: -200,
                    scale: {
                        x: 0.5,
                        y: 0.5
                    }
                },
                perlin: {
                    function: 'lines',
                    octaves: 6,
                    persistence: 0.5
                }
            },
            experiment: {
                grid: {
                    x: 100,
                    y: 100,
                    gradient: function(noise) {
                        var water = 0.1;
                        var ret = {};
                        ret.tile = 4;
                        ret.height = Math.pow((noise * 4), 1.6); //Math.floor(noise*5);

                        if (noise < water) {
                            ret.tile = 13;
                            ret.height = -1;
                        } else if (noise < 0.2) {
                            ret.height = 0;
                            ret.tile = 18;
                        } else if (noise < 0.25) {
                            ret.tile = 18;
                        } else if (noise < 0.35) {
                            ret.tile = 19;
                        } else if (noise < 0.55) {
                            ret.tile = 20;
                        } else if (noise < 0.60) {
                            ret.tile = 21;
                        } else if (noise < 0.65) {
                            ret.tile = 22;
                        } else if (noise < 0.75) {
                            ret.tile = 23;
                        } else if (noise < 0.78) {
                            ret.tile = 24;
                        } else if (noise < 0.85) {
                            ret.tile = 25;
                        } else if (noise < 0.90) {
                            ret.tile = 26;
                        } else {
                            ret.tile = 29;
                        }

                        return ret;
                    }
                },
                screen: {
                    top: 500,
                    left: 0,
                    scale: {
                        x: 0.5,
                        y: 0.5
                    }
                },
                perlin: {
                    function: 'lines',
                    octaves: 6,
                    persistence: 0.2
                }
            },
            grid3d: {
                grid: {
                    x: 100,
                    y: 100,
                    gradient: function(noise) {
                        var water = 0.1;
                        var ret = {};
                        ret.tile = 4;
                        ret.height = Math.pow((noise * 4), 1.6); //Math.floor(noise*5);

                        if (noise < water) {
                            ret.tile = 13;
                            ret.height = -1;
                        } else if (noise < 0.2) {
                            ret.height = 0;
                            ret.tile = 18;
                        } else if (noise < 0.25) {
                            ret.tile = 18;
                        } else if (noise < 0.35) {
                            ret.tile = 19;
                        } else if (noise < 0.55) {
                            ret.tile = 20;
                        } else if (noise < 0.60) {
                            ret.tile = 21;
                        } else if (noise < 0.65) {
                            ret.tile = 22;
                        } else if (noise < 0.75) {
                            ret.tile = 23;
                        } else if (noise < 0.78) {
                            ret.tile = 24;
                        } else if (noise < 0.85) {
                            ret.tile = 25;
                        } else if (noise < 0.90) {
                            ret.tile = 26;
                        } else {
                            ret.tile = 29;
                        }

                        return ret;
                    }
                },
                screen: {
                    top: 700,
                    left: 0,
                    scale: {
                        x: 0.5,
                        y: 0.5
                    }
                },
                perlin: {
                    function: 'lines',
                    octaves: 6,
                    persistence: 0.2
                }
            }
        }
    }

    settings.get('experiment');
    return settings;

});