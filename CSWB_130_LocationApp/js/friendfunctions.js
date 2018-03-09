


    
	$(function() {
    $('#friends').dialog({
      autoOpen: false,
	  modal:true,
    });
	
    $('.new').click(function() {
      $('#friends').dialog('open').promise().done(function() { 
		$('.ui-dialog').css({ 'width': '90%', 'position': 'fixed', 'top': '0', 'left': '0'}); 
		$('.add').focus();
		friendsHeight();
		});
    });
  });
 
var locale = [];



$(document).ready(function(){

//set function to build friend list in dropdown
function buildFriendList() {
friendArray = localStorage.getItem('friendArray').split(',');  
for(i=0; i < friendArray.length; i++){
var thisEntry = friendArray[i];
$('.friend').append('<option value="' + friendArray[i] + '">' + friendArray[i] + '</option>');
$('#friendList').append('<li><h4>' + friendArray[i] + '</h4><p class="killer"></p></li>');
}

$('.killer').on('click', function() { 
	var answer = confirm('Are you sure you want to delete ' + $(this).siblings('h4').html() + '?'); 
	if (answer){ 
		var removeIndex = $(this).parent().index(); 
		friendArray.splice(removeIndex, 1); 
		localStorage.setItem('friendArray', friendArray); 
		$(this).parent().remove(); 
		$('.friend').empty(); 
		$('#friendList').empty(); 
		buildFriendList(); 
	} 
});
}



//initialize options in select from localStorage at pageload
if (localStorage.getItem('friendArray') == null) { var friendArray = []; }
if (localStorage.getItem('friendArray') != null)  { buildFriendList(); }




//friend add and response function - add friend to localStorage

function friendAdd() {
if ($('#friendName').val() == '') { window.alert('You must enter a username!'); }

if($('#friendName').val() != '') {
var thisFriend = $('#friendName').val();
$('#friendName').val('');

$('.ui-dialog .messageBox').html('Friend request sent');
$('.ui-dialog .messageBox').css('display', 'inline-block');
window.setTimeout(function(){
$('.ui-dialog .messageBox').css('display', 'none').once();
}, 1000);

window.setTimeout(function(){
window.alert(thisFriend + ' accepted your request!');
friendArray.push(thisFriend);
localStorage.setItem('friendArray', friendArray);
$('.friend').empty();
$('#friendList').empty();
buildFriendList();
}, 3000);
}


}

$('.add').on('click', function() { friendAdd(); }).once(); 


});