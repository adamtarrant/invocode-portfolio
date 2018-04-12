import styles from '../scss/weatherapp.scss';

function callDarksky(location){
    $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/4a5da3a43639858617e4486ba102d96d/" + location.coords.latitude + "," + location.coords.longitude, function(jsonObj){
      var city = jsonObj.timezone.split("/");
      $("#location").html("Your location: " + city[1]);
      $("#currentWeather").html("Current weather: " + jsonObj.currently.summary);
    changeIconBG(jsonObj.currently.icon);
});
}

function changeIconBG(wiIcon){
var icon;
var background;
switch (wiIcon){
       case "clear-day":
       icon = "wi-day-sunny";
       background = "http://cdn.digital-photo-secrets.com/images/spring-field-dandelions-sunny-day.jpg";
         break;
       case "clear-night":
       icon = "wi-night-clear";
       background = "http://wallpapercave.com/wp/KKSGGBW.jpg";
         break;
       case "rain":
       icon = "wi-day-rain";
       background = "https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg";
         break;
       case "snow":
       icon = "wi-day-snow";
       background = "https://s-media-cache-ak0.pinimg.com/originals/d0/03/b9/d003b9983bc798b6dc02ce98104da97c.jpg";
         break;
       case "sleet":
       icon = "wi-day-sleet";
       background = "https://upload.wikimedia.org/wikipedia/commons/c/c3/2016-02-15_17_16_34_Freezing_rain_and_sleet_on_a_car_window_in_Sterling%2C_Virginia.jpg";
         break;
       case "cloudy":
       case "partly-cloudy-day":
       icon = "wi-day-cloudy";
       background = "http://getwallpapers.com/wallpaper/full/b/6/8/504763.jpg";
         break;
       case "partly-cloudy-night":
       icon = "wi-night-alt-cloudy";
       background = "https://i.imgur.com/Wbe5odz.jpg";
         break;
       case "wind":
       icon = "wi-cloudy-gusts";
       background = "https://www.iea.org/media/topics/renewables/rewebsites/wind.jpg";
         break;
       case "fog":
       icon = "wi-fog";
       background = "http://www.metoffice.gov.uk/binaries/content/gallery/mohippo/images/migrated-image/9/walkers-486583_1920_1.jpg";
         break;
       default:
       icon = "wi-cloudy";
       background = "https://cimss.ssec.wisc.edu/sage/meteorology/lesson2/images/global_ir.jpg";
       }
$("#weather-view > i").switchClass("wi-day-sunny", icon);
$("#main-container").css("background-image", "url(" + background + ")");
}

function getWeather() {
 if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(callDarksky);
} else {
  $("#weather-view > p").html("Sorry, we can't detect your location as geolocation is not supported by this browser");
}
}

$(document).ready(function() {
getWeather();
});