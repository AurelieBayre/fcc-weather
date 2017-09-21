var lat = "";
var long = "";
var modUrl = "";
var meteoOp;
var fahrenheit = false;


///**********************************************
navigator.geolocation.getCurrentPosition(function(position) {
	lat = position.coords.latitude;
	long = position.coords.longitude;
	//just for the display:
	roundedLat = Math.round(lat);
	roundedLong = Math.round(long);
	modUrl =
		"https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long; //address is valid, I tested.

	//	$(".geoloc").html("Your latitude: " + roundedLat + "<br> Your longitude: " + roundedLong);
	//$(".test").html("testing: " + modUrl);

	function afficherTemp(num, f) {
		if (f) return Math.round(num * 9/5 + 32) + "&#8457;";
		return Math.round(num) + "&#8451;";
	}
	$("#convert").click(function() {
		fahrenheit = !fahrenheit;
		render(meteoOp, fahrenheit);
	});

	function render(meteoOp, fahrenheit) {
		var temp = afficherTemp(meteoOp.main.temp, fahrenheit);
		var summary = meteoOp.weather[0].description;
		var weatherIcon = meteoOp.weather[0].icon;
		var locate = meteoOp.name;
		$("#temperature").html("<strong>" + temp + "</strong>");

		$(".lieu").html("<br>Currently in " + locate + ":");
		$("#meteoBref").html("<strong>"
			 + summary + "</strong>" +
				"<br> <img src=" +
				'"' +
				weatherIcon +
				'"' +
				'alt="weather icon" height="150" width= "150">'
		);
		
		$("body").css("background-image","url(https://images.unsplash.com/photo-1479127820278-07bc8118cf6a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=1c9fc89e9c0197d91a5d5484c154cc75)");
		

	}


	$.getJSON(modUrl, function(meteo) {
		meteoOp = meteo;

		render(meteo, fahrenheit);
	}); //end of get json
}); //end of geolocation
