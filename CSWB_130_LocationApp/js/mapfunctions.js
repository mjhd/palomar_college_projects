function showlocation() {
		navigator.geolocation.getCurrentPosition(showMap,errorCallback);
	}
         
var map;
var myCurrentLat;
var myCurrentLon;

	function showMap(position) {

		var lattitude = position.coords.latitude;
		var longitude = position.coords.longitude;


		var myPosition = new google.maps.LatLng(lattitude, longitude);

		var mapArgs = {
			center: myPosition ,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
        	};


			map = new google.maps.Map($('#map-canvas').get(0),mapArgs);
		
		
		var marker = new google.maps.Marker({position: myPosition,map: map,title: 'Current location'});




		google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});
		
		myCurrentLat = lattitude;
		myCurrentLon = longitude;
      }


	//Callback function for error handler - this is called if the geolocation API encounters a proble,.
	// error object is sent as a parameter to the function; and error.code as the error cause.
	function errorCallback(error) {
        	var strMessage;

	        // Check for known errors
        	switch (error.code) {
			case error.PERMISSION_DENIED:
				strMessage = 'Access to your geolocation is restricted. Please turn location on in privacy settings.';
		                break;
			case error.POSITION_UNAVAILABLE:
		                strMessage = 'Your location is currently unavailable.';
				break;
			case error.TIMEOUT:
		                strMessage = 'Your location is currently unavailable or your network connection is weak.';
		                break;
            		default:
		                break;
	        }
	
		alert(strMessage);
}

var marker;
function displayFriend(thisLat, thisLong) {
var thisLoc = new google.maps.LatLng(thisLat, thisLong);
	  if (marker != undefined){ marker.setMap(null); }
      marker = new google.maps.Marker({
      position: thisLoc,
      map: map,
      title: 'Hello World!'
  });
  
  
  }
  

  
var bounds;
  
$(document).ready(function(){



function mapSize() {
$('#map-canvas').css('height', $(document).height() - $('header').height());
}

var checkWidth = $(document).width();
function dynamicCheck(){
dynamicWidth = $(document).width();
if (checkWidth - dynamicWidth >= 100 || dynamicWidth - checkWidth >= 100) {
checkWidth = $(document).width();
refreshMap();
google.maps.event.trigger(map, 'resize');
}
}

mapSize();
$(window).resize(mapSize);
$(window).resize(dynamicCheck);

$('.change').on('click', function() {
var friendName = $('.friend').val();
$('header .messageBox').html('Geolocation request sent');
$('header .messageBox').css('display', 'inline-block');
window.setTimeout(function(){
$('header .messageBox').css('display', 'none').once();
}, 1000);

window.setTimeout(function(){
window.alert(friendName + ' has accepted your geolocation request!')
var friendLat = myCurrentLat + (Math.random()/10);
var latLength = ((myCurrentLat.toString().length) - 1 );
friendLat = parseFloat(parseFloat(friendLat).toPrecision(latLength));

var friendLon = myCurrentLon + (Math.random()/10);
var lonLength = ((myCurrentLon.toString().length) - 1 );
friendLon = parseFloat(parseFloat(friendLon).toPrecision(lonLength));

stringy = locale.toString();
stringy = stringy.split(',');



if (stringy.indexOf(friendName) == -1){
locale.push([friendName, friendLat, friendLon]);
displayFriend(friendLat, friendLon);

mapFit(friendLat, friendLon);
}
if (stringy.indexOf(friendName) != -1){
var arrayNum = (stringy.indexOf(friendName)/3);
var arrayLoc = locale[arrayNum];
displayFriend(arrayLoc[1], arrayLoc[2]);

mapFit(arrayLoc[1], arrayLoc[2]);
}

function mapFit(lats, lons) {
var currentPos = new google.maps.LatLng(myCurrentLat, myCurrentLon);
var myPlace = new google.maps.LatLng(lats, lons);
bounds = new google.maps.LatLngBounds();
bounds.extend(myPlace);
bounds.extend(currentPos);
map.fitBounds(bounds);
}


	

}, 3000);
});

$('.reorient').on('click', function(){ refreshMap(); });

});

function refreshMap(){
if(bounds == undefined) { var refreshLoc = new google.maps.LatLng(myCurrentLat,myCurrentLon); map.setCenter(refreshLoc); }
if(bounds != undefined) { map.fitBounds(bounds); }
}