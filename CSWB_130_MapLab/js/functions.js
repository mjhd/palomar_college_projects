	  $(window).on('load', function (){ mapDisplay(); });
	  $(window).on('load', function (){ getLocation(); });
	  $(window).resize(mapDisplay);
	  $(window).resize(dynamicCheck);
	  
var mapHeight;
var locationHeight;
var labelHeight;
var offset;
var offsetValue;
var map;
var destination;
var request;
var latter;
var longer;
var checkWidth = $(document).width();
var dynamicWidth;


function mapDisplay() {	  
//set height of map container to map img height
mapHeight = $('.map').css('height');
$('#map').css('height', mapHeight);

//dynamically set location container size
locationHeight = $('.location').css('height');
$('.location').css('width', locationHeight);


//setting location name display
labelHeight = parseInt($('.location > span').css('height'));
offsetValue = ((parseInt(locationHeight)/2) + (labelHeight/2)) * -1;
$('.location > span').css('left', offsetValue);
}



//Geolocation grab info
function getLocation() {
navigator.geolocation.watchPosition(
    function (position) {
        latitude = position.coords.latitude;
		longitude = position.coords.longitude;
    },

    function (error) {
        alert('Location data error - You may need to turn location tracking on in your privacy settings!');
    },
	
	{ frequency: 5000, enableHighAccuracy: true }
);
}




//Generate parameters and arguments onclick for each location represented on map image
$('#SM').click(function() { 
frameSwitch();
destination = '1140+W+Mission+Rd+San+Marcos+Ca+92069';
latter = 33.1473532;
longer = -117.185448;
mapMake(destination);

});


$('#CP').click(function() { 
frameSwitch();
destination = '33.424565,-117.295532';
latter = 33.424565;
longer = -117.295532;
mapMake(destination);

});


$('#Pa').click(function() { 
frameSwitch();
destination = '1010+Pauma+Reservation+Rd+Pauma+Valley+CA+92061';
latter = 33.303368;
longer = -116.981417;
mapMake(destination);
});

$('#Fb').click(function() { 
frameSwitch();
destination = '2400+S+Stagecoach+Ln+Fallbrook+Ca+92069';
latter = 33.349025;
longer = -117.241838;
mapMake(destination);

});

$('#Es').click(function() { 
frameSwitch();
destination = '1951+E+Valley+Parkway+Escondido+Ca+92027'; 
latter = 33.136791;
longer = -117.053336;
mapMake(destination);

});


//Prep container for dynamic map
function frameSwitch(){
$('.location').hide();
$('body > h4').hide();
$('section.map').fadeTo(200,0).promise().done(function(){

$('section.map').hide().promise().done(function(){

$('div.map').fadeTo(0,0);
$('div.map').show();
$('div.map').fadeTo(200,100);
mapDisplay();
});
});
}


//Replace map image with google maps container and initialize maps object data
function mapMake(destination) {
var thisOrigin = latitude + ',' + longitude;
makeMap(thisOrigin, destination);
}

function makeMap(thisOrigin, thisDestination){
	 
     var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();

     map = new google.maps.Map($('#mappy').get(0), {
       zoom: 7,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });
	 



	 
     directionsDisplay.setMap(map);
	 var panels = $('#panel').get();
     directionsDisplay.setPanel($('#panel').get(0));

     request = {
       origin: thisOrigin, 
       destination: thisDestination,
       travelMode: google.maps.DirectionsTravelMode.DRIVING
     };

     directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
       }
	
     });
	 }
	 
	 
//Display hidden map and execute fixer() function
$('#mapShow').click(function(){
var showBut = $('#mapShow').offset();
$('#mappy').fadeTo(0,0);
$('#panel').fadeTo(300,0);
$('#panel').css('width', '');
$('#panel').addClass('mapOn');
$('#panel').fadeTo(300,100);
$('#mappy').css({ 'visibility': 'visible', 'position': 'relative' });
$('#mappy').fadeTo(300,100);
$(this).css({ 'visibility': 'hidden', 'width': 0, 'padding': 0, 'margin': 0, 'border': 'none' });
$('#mapHide').css({ 'visibility': 'visible', 'height': '', 'padding': '', 'border': '', 'margin': '' }); 
fixer();
var jumpVal = (showBut.top).toFixed(0);
$('html, body').animate({ scrollTop: jumpVal }, 1500);
});


//Hide map onclick of #hideMap
$('#mapHide').click(function(){
$(this).css({ 'visibility': 'hidden', 'height': '0', 'padding': '0', 'border': '0', 'margin': '0' });
$('#mapShow').css({ 'visibility': 'visible', 'width': '', 'padding': '', 'margin': '', 'border': '' });
$('#mappy').fadeTo(300,0);
$('#mappy').css({'position': 'absolute', 'visibility': 'hidden'});
$('#panel').fadeTo(300,0);
$('.mapOn').removeClass('mapOn');
$('#panel').css('width', '100%');
$('#panel').fadeTo(300,100);
});

//Refresh map settings if viewport changes by 100 px
function dynamicCheck(){
dynamicWidth = $(document).width();
if (checkWidth - dynamicWidth >= 100 || dynamicWidth - checkWidth >= 100) {
checkWidth = $(document).width();
fixer();
}
} 

//Switch frame back to open map
$('#back').click(function(){
$('div.map').fadeTo(200,0).promise().done(function(){
$('div.map').hide().promise().done(function(){
$('section.map').show();
$('section.map').fadeTo(200,100).promise().done(function(){
$('.location').show();
$('#mappy').fadeTo(200,0);
$('#mappy').css({'visibility': 'hidden', 'position': 'absolute'});
$('#panel').css('width', '100%');
$('#mappy').empty();
$('#panel').empty();
$('#mapShow').css({ 'visibility': 'visible', 'width': 'initial', 'padding': '', 'margin': '', 'border': '' });
$('#mapHide').css('visibility', 'hidden');
$('#panel').removeClass('mapOn');
mapDisplay();
$('body > h4').show();
});
});
});
});

//Google maps weird resize and bound area issue fix - I absolutely HATE solving this problem this way...
function fixer() {
   google.maps.event.trigger(map, 'resize');
       var currentPos = new google.maps.LatLng(latitude, longitude);

    var myPlace = new google.maps.LatLng(latter, longer);

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(myPlace);
    bounds.extend(currentPos);
    map.fitBounds(bounds);
}