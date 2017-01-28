$(document).ready(function(){
    var weatherData;
    var request = new XMLHttpRequest();
    var date = new Date();
    var i = -1;
    var monthDayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    loadData();

    function loadData() {
        request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Salt+Lake+City,us&units=imperial&cnt=5&appid=806426ae2dc98d7df4c2607196c57960');
        request.onload = loadComplete;
        request.send();
    }

    function loadComplete(evt) {
        weatherData = JSON.parse(request.responseText);
        console.log(weatherData);
        
        document.getElementById("place").innerHTML = "Weekly Weather in " + weatherData.city.name;
        
        for (var i = 0; i < weatherData.list.length; i++) {
            var month = date.getMonth();
            var day = date.getDate() + i;
            if (day <= monthDayCount[month]) {
                
            }
            else {
                day -= monthDayCount[month];
                month++;
            }
            
            $("#day" + (i + 1)).children().get(0).innerHTML = (month + 1) + "/" + (day);
            $("#day" + (i + 1)).children().get(1).innerHTML = weatherData.list[i].temp.day + " &#8457";
            $("#day" + (i + 1)).children().get(2).innerHTML = weatherData.list[i].weather[0].main + "-" + weatherData.list[i].weather[0].description;
        }
        
        $("#day1").children().get(0).innerHTML = "Today";
        
        var day = weatherData.list[0].weather[0].main;
        if (day == "Clear") {
            $('html').css({
                "background-image" : 'url(images/sunny.gif)'
            });
        }
        else if (day == "Snow") {
            $('html').css({
                backgroundImage : 'url(images/snowFall.gif)'
            });
        }
        else if (day == "Rain") {
            $('html').css({
                backgroundImage : 'url(images/rainFaill.gif)'
            });
        }
        else if (day == "Cloud") {
            $('html').css({
                backgroundImage : 'url(images/cloudy.gif)'
            });
        }
        else {
            $('html').css({
                backgroundImage : 'url(images/cloudy.gif)'
            });
        }
    }
    
    $(".day").on("mouseover", function() {
        if ($(this).is("#day1")) {
            i = 0;
        }
        else if ($(this).is("#day2")) {
            i = 1;
        }
        else if ($(this).is("#day3")) {
            i = 2;
        }
        else if ($(this).is("#day4")) {
            i = 3;
        }
        else if ($(this).is("#day5")) {
            i = 4;
        }
        
        $(this).children().get(1).innerHTML = "";
        $(this).children().get(2).innerHTML = "";
        $(this).children().get(3).innerHTML = "";
        $(this).children().get(4).innerHTML = "Min: " + weatherData.list[i].temp.min + " &#8457";
        $(this).children().get(5).innerHTML = "Max: " + weatherData.list[i].temp.max + " &#8457";
        $(this).children().get(6).innerHTML = "Wind: " + weatherData.list[i].speed + " mph";
        $(this).children().get(7).innerHTML = "Humidity: " + weatherData.list[i].humidity + "%";
        $(this).children().get(8).innerHTML = "Cloudiness: " + weatherData.list[i].clouds + "%";
    });
    $(".day").on("mouseout", function() {
        $(this).children().get(1).innerHTML = weatherData.list[i].temp.day + " &#8457";
        $(this).children().get(2).innerHTML = weatherData.list[i].weather[0].main + "-" + weatherData.list[i].weather[0].description;
        $(this).children().get(3).innerHTML = "";
        $(this).children().get(4).innerHTML = "";
        $(this).children().get(5).innerHTML = "";
        $(this).children().get(6).innerHTML = "";
        $(this).children().get(7).innerHTML = "";
        $(this).children().get(8).innerHTML = "";
    });
});