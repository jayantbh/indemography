$(document).ready(function () {
    $(".button-collapse").sideNav();

    var key = 0;
    var c = key;
    var ci = 255-key;
    var colr = parseInt(c);
    var colg = parseInt(c/1.5);
    var colb = parseInt(ci/3);
    var color1 = "rgb("+colr+","+colg+","+colb+")";
    var color2 = /*"rgb("+(255-colr)+","+(255-colg)+","+(255-colb)+")";*/ "rgb(255, 170, 0)";
    $(".scale").css("background","linear-gradient(to right,"+color1+","+color2+")");

    $("g").hover(function (e) {
        var t = e.currentTarget;
        //console.log($(t).attr("title"))
        $(".current-info h5").html($(t).data("title") || "Stats Unavailable.");
    });
    maleFemaleTeacherRatio(3);
    $(".female-teachers-ratio a").click(function (e) {
        var index = $(this).data("filter");
        //console.log(index);
        $(".filter").text($(this).text());
        maleFemaleTeacherRatio(index);
    })
});

var maleFemaleTeacherRatio = function (index) {
    $.getJSON('https://data.gov.in/node/147928/datastore/export/json', function (stats) {
        //console.log(stats);
        $(".loading").hide();
        var max = 0;
        $.each(stats.data, function (i, val) {
            var key = parseInt(val[index]);
            //console.log(key)
            if (isNaN(key)) {
                key = 0;
            }
            else {
                max = (max > key ? max : key);
            }
        });
        statData = [stats,max];
        //return arr;

        maleFemaleTeacherRatioFiltered(statData, index);
        //console.log("MAX = " + max);
    });
};
var maleFemaleTeacherRatioFiltered = function (statData, index) {
    stats = statData[0];
    max = statData[1];
    var divisor = max/255;
    $.each(stats.data, function (i, val) {
        var key = parseInt(val[index]);
        //console.log(key)
        var value = key;
        var state = val[0];
        if (isNaN(key)) {
            key = 0;
            $("g[title='"+state+"']").data("title",state+" - Stats Unavailable.");
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
            stateEl.data("title",state+" - "+value);
        }
    });
};