$(document).ready(function () {
    var key = 0;
    var c = key;
    var ci = 255-key;
    var colr = parseInt(c);
    var colg = parseInt(c/1.5);
    var colb = parseInt(ci/3);
    var color1 = "rgb("+colr+","+colg+","+colb+")";
    var color2 = "rgb("+(255-colr)+","+(255-colg)+","+(255-colb)+")";
    $(".scale").css("background","linear-gradient(to right,"+color1+","+color2+")");

    $("g").hover(function (e) {
        var t = e.currentTarget;
        console.log($(t).attr("title"))
        $(".current-info h5").html($(t).attr("title") || "PoK");
    })
});
$.getJSON('https://data.gov.in/node/147928/datastore/export/json', function (stats) {
    console.log(stats);
    var max = 0;
    $.each(stats.data, function (i, val) {
        var key = parseInt(val[3]);
        //console.log(key)
        if (isNaN(key)) {
            key = 0;
        }
        else {
            max = (max > key ? max : key);
        }
    });
    console.log("MAX = " + max);

    var divisor = max/255;
    $.each(stats.data, function (i, val) {
        var key = parseInt(val[1]);
        var value = key;
        var state = val[0];
        if (isNaN(key)) {
            key = 0;
            $("g[title='"+state+"']").attr("title",state+" - Stats Unavailable.");
        }
        else {
            key = parseInt(key/divisor);
            var c = key;
            var ci = 255-key;
            var colr = parseInt(c);
            var colg = parseInt(c/1.5);
            var colb = parseInt(ci/3);
            var stateEl = $("g[title='"+state+"']");
            stateEl.css({"fill":"rgb("+colr+","+colg+","+colb+")","stroke":"rgb("+colr+","+colg+","+colb+")"});
            stateEl.children("path").css({"fill":"rgb("+colr+","+colg+","+colb+")","stroke":"rgb("+colr+","+colg+","+colb+")"});
            stateEl.attr("title",state+" - "+value);
        }
    });
});