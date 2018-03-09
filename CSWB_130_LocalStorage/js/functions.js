$(document).ready(initialize);
var classCount = 0;
var sessionArray = [];
var selectNum = 1;
function initialize() {
if (localStorage.length > 0) {
sessionArray = localStorage.getItem('sessionArray').split(',');
var count = parseInt(sessionArray.length) - 1;

for (i=0;i<=count;i+=2) {

var thisPriority = sessionArray[i];
var thisValue = sessionArray[i+1];
$('.todoList').append('<li class="' + i + '">Move to: <select class="position"></select><span>' + thisPriority + '</span><span>' + thisValue + '</span><span class="kill"></span></li>');
classCount = i;
}//End list-building loop 
for (i=0;i<=count;i+=2) {
$('.position').append('<option value="' + selectNum + '">' + selectNum + '</option>');
selectNum++;
}
$('.position').after('<input type="button" class="newPosition">');
}//End localStorage exists conditional

//Kill function (remove item)
$(document).on('click', '.kill', function(){
var clearEntry = parseInt($(this).parent().attr('class'));
if (sessionArray.length >= 1) { sessionArray.splice(clearEntry, 2); localStorage.setItem('sessionArray', sessionArray);}
if (sessionArray.length < 1) { sessionArray.length = 0; localStorage.clear(); }
$('.position option:last-child').remove();
$(this).parent().remove();
classCount-=2;
selectNum--;

$('.todoList li').removeClass();
var innerCount = 0;
var liCount = $('.todoList li').length;
var selectMe;

for(i=0; i<liCount; i++){
selectMe = '.todoList li:nth-child(' + (i + 1) + ')';
$(selectMe).attr('class', innerCount);
 innerCount+=2;
 }
 
});


}//End initialize function


$('.add').click(function() {
classCount+=2;
var place = $('.priority').val();
var preItem = $('.item').val();
var item = preItem.replace(new RegExp(",", "g"), '&#44;');

sessionArray.push(place, item);

$('.todoList').append('<li class="' + classCount + '">Move to: <select class="position"></select><span>' + place + '</span><span>' + item + '</span><span class="kill"></span></li>');
localStorage.setItem('sessionArray', sessionArray);


$('li.' + classCount + ' .position').after('<input type="button" class="newPosition">');


$('.position option').remove();
for(i=1; i<=selectNum; i++){
$('.position').append('<option value="' + i + '">' + i + '</option>');
}

selectNum++;
$('.priority').val('');
$('.item').val('');
});


var currentPositionBase;
var newPositionBase;
var throughPut;
$(document).on('click', '.newPosition', function(){
currentPositionBase = parseInt($(this).parent().attr('class'));

var goToValue = $(this).prev().val();

if ((currentPositionBase/2) < goToValue) {
newPositionBase = ((parseInt(goToValue) * 2) - 2);
}
if ((currentPositionBase/2) >= (goToValue - 1)) {
newPositionBase = ((parseInt(goToValue) * 2) - 2);
}
if ((currentPositionBase/2) == (goToValue - 1)) {
alert('This is already in space' + goToValue);
}

throughPut = sessionArray.splice(currentPositionBase, 2);
sessionArray.splice(newPositionBase, 0, throughPut);
localStorage.setItem('sessionArray', sessionArray);
$('.todoList').empty();
selectNum = 1;
initialize();
});