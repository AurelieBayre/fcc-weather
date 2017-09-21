// I have to request data from an external source (provided by Freecodecamp) That data is stored in a JSON and I have to get it from FCC weather API.
//and I have to geolocalise the user in order to combine that data to the weather API.
//update : the data provided by FCC is no longer in use, so I'm using DarkSky API.

var lat = "";
var long = "";
var modUrl = "";	
var weatherData;
var celsius = false;

// fonction pour  calculer les celsius et faire le toggle.
 function afficherTemp(num, c){
	 if(c) return Math.round((num - 32)*(5/9))+ "&#8451;";
	return Math.round(num) + "&#8457;";
}
$("#convert").click(function(){
			celsius = !celsius;
			render(weatherData, celsius);
		});
// fonction pour récupérer les données et les utiliser
function render (weatherData, celsius) {
	var temp = afficherTemp(weatherData.currently.temperature, celsius); 
		var enBref = weatherData.currently.summary;
		var time = weatherData.timezone;
	var weatherIcon = weatherData.currently.icon;
	
var skycons = new Skycons({
        "color": "#001a33",
	"resizeClear": true 
    }),
    list = [
        "clear-day", "clear-night", "partly-cloudy-day",
        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
        "fog"
    ];
switch (weatherIcon) {
	case  'clear-day':
skycons.add(document.getElementById("iconeMeteo"), Skycons.CLEAR_DAY);
break;
case 'clear-night':
skycons.add(document.getElementById("iconeMeteo"), Skycons.CLEAR_NIGHT);
break;
case 'partly-cloudy-day':
skycons.add(document.getElementById("iconeMeteo"), Skycons.PARTLY_CLOUDY_DAY);
break;
case 'partly-cloudy-night':
skycons.add(document.getElementById("iconeMeteo"), Skycons.PARTLY_CLOUDY_NIGHT);
break;
case 'cloudy':
skycons.add(document.getElementById("iconeMeteo"), Skycons.CLOUDY);
break;
case 'rain':
skycons.add(document.getElementById("iconeMeteo"), Skycons.RAIN);
break;
case 'sleet':
skycons.add(document.getElementById("iconeMeteo"), Skycons.SLEET);
break;
case 'snow':
skycons.add(document.getElementById("iconeMeteo"), Skycons.SNOW);
break;
case 'wind':
skycons.add(document.getElementById("iconeMeteo"), Skycons.WIND);
break;
case 'fog':
skycons.add(document.getElementById("iconeMeteo"), Skycons.FOG);
break;
default:
skycons.add(document.getElementById("iconeMeteo"), Skycons.RAIN);
}
skycons.play();
	
	// insérere les données dans la page html
		$(".timezone").html("Your timezone : " + time);
		$("#meteoBref").html("<br> The weather today : " + enBref);
		$("#temperature").html("The temperature: " + temp);	
//$("#test").html("test: " + weatherIcon); <--- I can get value for weatherIcon. PS: I don't need it anymore because everything's working fine now!!!! :)
	
	
// background will change based on the temperature:
if (temp > 70) {
	$("body").css("background-image", "url(https://images.unsplash.com/photo-1417106338293-88a3c25ea0be?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=1860472022cb489af729fba73adab921)");		
}
	else if (temp < 50) {
		$("body").css("background-image","url(https://images.unsplash.com/photo-1499713665689-ca7d3943c43a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=fc8067b11cb7c8885d6c750b23a1b6e8)");
	}
	else {
			$("body").css("background-image","url(https://images.unsplash.com/photo-1491036775913-3fbc5c455842?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=2429e2e49b2f0187600d9022cb386f53)");	
	}

}
//**********************

///**********************************************
		navigator.geolocation.getCurrentPosition(function(position) {
		lat = position.coords.latitude;
		long = position.coords.longitude;
	//just for the display:
		roundedLat = Math.round(lat); 
		roundedLong = Math.round(long);
		modUrl = "https://api.darksky.net/forecast/654abac172eb9fe9d639b26feaf3e89a/"+lat+","+long + "?callback=?"; 
			//I had to had this thing ?callback=? to make it work because it's a jsonP request (not just json), and I needed jsonp because of the cross domain problem.
		
			$(".geoloc").html("Your latitude: " + roundedLat + "<br> Your longitude: " + roundedLong);
		
	$.getJSON(modUrl, function(meteo) {

		weatherData = meteo;		
		
		
		render(meteo, celsius);	
		});	
	});

// So I need to modify the api's url with the data I get from geoloc.
// var apiUrl = "https://fcc-weather-api.glitch.me/api/current?lat="+ "lat"+"&lon=" + "long";
//note to future self : now fcc api seems to be up again, so I should try to rebuild this page just to try their api.
//PS the loading time is a bit too long, I should find a way to improve that....
