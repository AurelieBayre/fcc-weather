$("#convert").hide();


var lat = "";
var long = "";
var modUrl = "";
var meteoOp;
var fahrenheit = false;
//var celsius = false;

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
		$("#temperature").html(temp);
		

		$(".lieu").html("Currently in " + locate + ":");
		$("#meteoBref").html(
			summary +
				"<br> <img src=" +
				'"' +
				weatherIcon +
				'"' +
				'alt="weather icon" height="150" width= "150">'
		);
		
		// background will change based on the temperature:
		
		switch (temp) {
			case -30:
    	case 5:
        		$("body").css("background-image","url(https://images.unsplash.com/photo-1499713665689-ca7d3943c43a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=fc8067b11cb7c8885d6c750b23a1b6e8)");
        break;
		case 6:
    case 11:
        $("body").css("background-image","url(https://images.unsplash.com/photo-1479127820278-07bc8118cf6a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=1c9fc89e9c0197d91a5d5484c154cc75)");
        break;
		case 12:
    case 24:
				$("body").css("background-image","url(https://images.unsplash.com/photo-1491036775913-3fbc5c455842?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=2429e2e49b2f0187600d9022cb386f53)");
break;
    case 25:
    case 60:
        	$("body").css("background-image", "url(https://images.unsplash.com/photo-1417106338293-88a3c25ea0be?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=1860472022cb489af729fba73adab921)");
        break;
    default:
        	$("body").css("background-image","url(https://images.unsplash.com/photo-1479127820278-07bc8118cf6a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=1c9fc89e9c0197d91a5d5484c154cc75)");
}
	}


	$.getJSON(modUrl, function(meteo) {
		meteoOp = meteo;
		$("#waiting").hide();
		render(meteo, fahrenheit);
		
		$("#convert").fadeIn("slow", function() {
    
  });
	}); //end of get json
}); //end of geolocation
