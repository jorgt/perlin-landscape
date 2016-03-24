define([], function() {
    var ret = {position: {}, client: {}, document: {}};

    var d = document;
    var e = d.documentElement;
    var g = d.getElementsByTagName('body')[0];
    ret.client.width = window.innerWidth || e.clientWidth || g.clientWidth;
    ret.client.height = window.innerHeight || e.clientHeight || g.clientHeight;

    ret.position.x = (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0);
    ret.position.y = (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);

    ret.document.height = Math.max(
            d.body.scrollHeight, d.documentElement.scrollHeight,
            d.body.offsetHeight, d.documentElement.offsetHeight,
            d.body.clientHeight, d.documentElement.clientHeight
            );

    ret.document.width = Math.max(
            d.body.scrollWidth, d.documentElement.scrollWidth,
            d.body.offsetWidth, d.documentElement.offsetWidth,
            d.body.clientWidth, d.documentElement.clientWidth
            );

    return ret;
});