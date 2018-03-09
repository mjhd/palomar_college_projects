$(document).ready(function(){ getLocation(); showlocation(); memoryHistory(); setMap(); });
$(window).resize(setMap);
$(window).resize(dynamicCheck);
$('#addMemory').on('click', function(){ markMemory(); }); 
  //Geolocation grab info
  
var map;  

var myCurrentLat;
var myCurrentLon;


function setMap() {
var mapHigh = $(window).height();
$('#containMax').css('height', mapHigh);
$('#righty').css('height', (mapHigh - 60));
$('.ui-dialog').css('height', (mapHigh - 15));
}

function getLocation() {
navigator.geolocation.watchPosition(
    function (position) {
        var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		myCurrentLat = parseFloat(latitude);
		myCurrentLon = parseFloat(longitude);
    },


	
	
    function (error) {
        alert('Location data error - You may need to turn location tracking on in your privacy settings!');
    },
	
	{ frequency: 5000, enableHighAccuracy: true }
);
}
  
  
  //Replace map image with google maps container and initialize maps object data
function showlocation() {
		navigator.geolocation.getCurrentPosition(showMap,errorCallback);
	}
         

	function showMap(position) {

		var lattitude = position.coords.latitude;
		var longitude = position.coords.longitude;


		var myPosition = new google.maps.LatLng(lattitude, longitude);

		var mapArgs = {
			center: myPosition ,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			panControl: false,
        	};


			map = new google.maps.Map($('#map-canvas').get(0), mapArgs);
		
		
		var marker = new google.maps.Marker({
			position: myPosition,
			map: map,
			title: 'Current location',
			animation: google.maps.Animation.BOUNCE,
			icon: 'img/blue.png'
			});




		google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});
		
		
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

var sessionArray;
var splitArray;

function memoryHistory(){

if (localStorage.getItem('sessionArray') == null) { sessionArray = []; }
if (localStorage.getItem('sessionArray') != null) { 

sessionArray = localStorage.getItem('sessionArray');
splitArray = sessionArray.split('##,');
sessionArray = sessionArray.replace(new RegExp("##", "g"), '##0-*-0');
sessionArray = sessionArray.split('0-*-0');
var arraySlicer = (sessionArray.length - 1);
sessionArray = sessionArray.slice(0, arraySlicer);
var lastItr = (splitArray.length - 1);
var lastVal = splitArray[lastItr].replace('##', '');
splitArray[lastItr] = lastVal;

for (i=0; i < splitArray.length; i++) {
var dataList = splitArray[i].split('*@*');
dataList[0] = dataList[0].replace(new RegExp(",", "g"), '');
var positional = dataList[3].replace('(', '');
positional = positional.replace(')', '');
positional = positional.split(',');
var thisLoc = new google.maps.LatLng(positional[0], positional[1]);
      var marker = new google.maps.Marker({
      position: thisLoc,
      map: map,
      title: dataList[0]
  });

  nameMarker(marker);

  $('#righty').append('<section><p><span>' + dataList[0] + '</span><span>' + dataList[1] + '</span></p><p>' + dataList[2] + '</p></section>'); 

}



}

}




function nameMarker(marker) {  
google.maps.event.addListener(marker, 'click', function() {
		var titlePop;
		var datePop;
		var descriptionPop;
		
		for (i=0; i < splitArray.length; i++){
		var checky = splitArray[i].split('*@*');
		checky[0] = checky[0].replace(new RegExp(",", "g"), '');
		if(checky[0] == marker.title){ titlePop = checky[0]; datePop = checky[1]; descriptionPop = checky[2]; }
		}
		
		
		
		$('#memoryViewer').html('<p>' + titlePop + '<span>' + datePop + '</span></p>' + '<p>' + descriptionPop + '</p>');
		$('#hiddenClick').click();
		});
}



	$(function() {
    $('#recall').dialog({
      autoOpen: false,
	  modal:true,
    });
	
    $('#hiddenClick').click(function() {
      $('#recall').dialog('open').promise().done(function() { 
		$('.ui-dialog').css({ 'width': '90%', 'position': 'fixed', 'top': '0', 'left': '0'}); 
		});
		setMap();
    });
  });



var fullDate;
	$(function() {
    $('#memories').dialog({
      autoOpen: false,
	  modal:true,
    });
	
    $('#add').click(function() {
      $('#memories').dialog('open').promise().done(function() { 
		$('.ui-dialog').css({ 'width': '90%', 'position': 'fixed', 'top': '0', 'left': '0'}); 
		});
			var timestamp = new Date();
			var date = timestamp.toLocaleDateString();
			var time = timestamp.toLocaleTimeString();
			var day;
			if(timestamp.getDay() == 0){ day = 'Sunday'; }
			if(timestamp.getDay() == 1){ day = 'Monday'; }
			if(timestamp.getDay() == 2){ day = 'Tuesday'; }
			if(timestamp.getDay() == 3){ day = 'Wednesday'; }
			if(timestamp.getDay() == 4){ day = 'Thursday'; }
			if(timestamp.getDay() == 5){ day = 'Friday'; }
			if(timestamp.getDay() == 6){ day = 'Saturday'; }

			fullDate = (day + ' - ' + date + ' @' + time);
			$('#date').html(fullDate);
			setMap();
    });
  });




function markMemory() {
getLocation();
var thisName = $('#name').val();
thisName = thisName.replace(new RegExp(",", "g"), '&#44;');
var thisLoc = new google.maps.LatLng(myCurrentLat, myCurrentLon);
      var marker = new google.maps.Marker({
      position: thisLoc,
      map: map,
      title: thisName
  });
  nameMarker(marker);    
var memoryValue = $('#memory').val();
memoryValue = memoryValue.replace(new RegExp(",", "g"), '&#44;'); 
var thisData = ( thisName + '*@*' + fullDate + '*@*' + memoryValue +  '*@*' + thisLoc + '##');
	sessionArray.push(thisData);
  localStorage.setItem('sessionArray', sessionArray);
  }
	
var checkWidth = $(document).width();

function dynamicCheck(){
var dynamicWidth = $(document).width();
if (checkWidth - dynamicWidth >= 100 || dynamicWidth - checkWidth >= 100) {
checkWidth = $(document).width();
var centerMe = new google.maps.LatLng(myCurrentLat,myCurrentLon); map.setCenter(centerMe);
}
}