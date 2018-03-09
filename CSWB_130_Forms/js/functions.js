  $(function() {
    $('#items').accordion({
      collapsible: true,
	  active: false
    });
  });

	function mainHeight() {
	var heightVal = $(document).height();
	$('#main').css('min-height', heightVal);
	
	};
	
	$(window).ready(mainHeight);
	$(window).resize(mainHeight);

	
  $('#more').click(function(){
  $('.list').append('<div class="itemWrap"><aside class="delete">X</aside><li><label>Item $ <input type="text" class="item" /></label></li></div>');
  var ulHeight = $('.list').height();
  var liHeight = $('.itemWrap').height();
  var fullHeight = ulHeight + liHeight;
  $('.list').css('height', fullHeight);
  mainHeight();
  
  });
  var valVal = 0.0;
  $('#tip').change(function(){  
        valVal = parseFloat($('#tip').val());
        $('#showMe').html(valVal);  
    });  
	
	
	
	
	$('#calc').click(function(){
		var total = 0.0;
		var finalTip = 0.0;
		$('.item').each(function(){ 
			total += parseFloat(this.value);	
			if(isNaN(total) == true){ alert('You must enter a numerical value in each item field').one() }
			if(isNaN(total) == false){
			finalTip = parseFloat(total * ((parseFloat($('#showMe').html())) / 100));
			$('#finalTip').html('$ ' + (finalTip.toFixed(2)));
			}
		});
		
		
		
	});
	
	
	
	$(document).on('click', '.delete', function() {
    $(this).parent().remove();
	var ulHeight = $('.list').height();
	var liHeight = $('.itemWrap').height();
	var fullHeight = ulHeight - liHeight;
	$('.list').css('height', fullHeight);
});