function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}




var day_ori = getParameterByName("d");
var name = getParameterByName("name");
var align = getParameterByName("align");
var text = getParameterByName("text");

var dayone = new Date(Number(day_ori.slice(0,4)), Number(day_ori.slice(4,6))-1, Number(day_ori.slice(6,8)));
var now = new Date();
var gap = now.getTime() - dayone.getTime();
var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

var output = "";



if (text != "" && (text.indexOf("[day]") != -1)) {
    result = result * -1
    output = text.replace("[day]",String(result));
} else {

    if (result > 0) {
        output = "D-" + String(result);
    } else if (result < 0) {
        result = result * -1
        output = "D+" + String(result);
    } else if (result === 0) {
        output = "D-day";
    }

    if (name != "") {
        output = name + " " + output;
    }
}


if(day_ori == "") {
    output = "<a href=''>날짜를 잘못 선택했어요. </a>"
}

$(function() {
    if (localStorage.getItem('mode') === "night") {
        $("#mode").addClass("night");
        $("#mode").removeClass("day");
    }
    
    $("#dday").html(output);
    
    if (align === "left") {
        $(".d").css("justify-content", "flex-start");
    } else if (align == "right") {
        $(".d").css("justify-content", "flex-end");
    }
    
    $("body").click(function(){
        if ($("#memu").hasClass("show")) {
            $("#memu").removeClass("show");
        } else {
            $("#memu").addClass("show");
        }
        
    });
    
    $("#memu").click(function(){
        if ($("#mode").hasClass("day")) {
            $("#mode").addClass("night");
            $("#mode").removeClass("day");
            $("#memu").text("☀");
            localStorage.setItem('mode', 'night');
            
        } else {
            $("#mode").addClass("day");
            $("#mode").removeClass("night");
            $("#memu").text("🌙");
            localStorage.setItem('mode', 'day');
        }
        
    });
});
