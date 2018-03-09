$('header > hgroup').fitText(1.0);
$('header > hgroup > h1, header > hgroup > h5').click(function(){ location.reload(); });


// set the negative margin for wrapper to difference between header image and hgroup (the space causing the gap)

	  $(window).ready(setTop);
	  //backup for .ready()
	  $(window).on('load', function (){ setTop(); });
	  $(window).resize(setTop);
	  $(window).resize(sizeFrame);


function setTop(){
var marginValue = ($('header > img').outerHeight() - $('header > hgroup').outerHeight());
var offsetMargin = ( marginValue - marginValue - marginValue );
$('.wrapper').css('top', + offsetMargin);
};



$('.home .slide:nth-of-type(1) a').click(function (event){ 
     event.preventDefault(); 
	 $('.home').css('border', 'none');
	 $('.home .slide svg').css('display', 'none');
	 $('.home').toggle(500);
	 $('.order').toggle(500).promise().done(function(){ setTop(); });
});


$('.order .back').click(function (event){ 
     event.preventDefault(); 
	 $('.order').toggle(500);  
	 $('.home').toggle(500).promise().done(function(){ 	 
		$('.home .slide svg').css('display', 'initial');
		$('.home').css({ 'border-left' : 'solid 2px #000', 'border-bottom' : 'solid 2px #000' });
		setTop();	
	 });	 
});





// UI functions for locate wrapper
$('.home .slide:nth-of-type(3) a').click(function (event){ 
     event.preventDefault(); 
	 $('.home').css('border', 'none');
	 $('.home .slide svg').css('display', 'none');
	 $('.home').toggle(500);
	 $('.locate').toggle(500).promise().done(function(){ sizeFrame(); setTop();	});
	 
});

$('.locate .back').click(function (event){ 
     event.preventDefault(); 
	 $('.locate').toggle(500);  
	 $('.home').toggle(500).promise().done(function(){ 	 
		$('.home .slide svg').css('display', 'initial');
		$('.home').css({ 'border-left' : 'solid 2px #000', 'border-bottom' : 'solid 2px #000' });
		setTop();	
	 });	 
});

// dynamic sizing for locate iframe (maintain aspect)
function sizeFrame(){
var frameWidth = $('.slide iframe').width();
var aspect = (frameWidth * 0.75)
$('.slide iframe').css('height', aspect);
};



// toggle in for order section options
$('.order .slide a').next().hide();
$('.order .slide a').click(function(event) {
	event.preventDefault(); 
	});
	

$('.order .slide a').click(function() {	

    if ($(this).attr('class') == '') {
	$(this).animate({ marginLeft : '50%' }, 500).promise().done(
		function(){ $(this).next().show(500).promise().done(
			function(){ $(this).animate({ width : '120%' }, 200);
			$(this).prev().attr('class', 'clicked'); }); 
		});
	
	}
	
	if ($(this).attr('class') == 'clicked') {
	$(this).next().animate({ width : '100%' }, 500).promise().done(
		function(){ $(this).hide(500).promise().done(
			function(){ $(this).prev().animate({ marginLeft : '0%' }, 500); 
			$(this).prev().removeClass(); }); 
		});
	
	}
	
});





// order total request logic
var name;
var number;
var delivery;
var address; 
var deliveryAddress; 

var size;
var pizzaSize;
var toppings;
var toppingQuantity;

var quantity;

var sizeCost;
var checkCheck;
$('.checkbox').click(function() { 
checkCheck = $(this).children('input').prop('checked');

$('#divID').css("background-image", "url(/myimage.jpg)"); 
if (checkCheck == false) { $(this).children('input').prop('checked', true); $(this).css({'background' : 'url(img/checkbox_red.svg) no-repeat', 'background-size' : '50px', 'border' : 'solid 2px #f00' }); }
if (checkCheck == true) { $(this).children('input').prop('checked', false); $(this).css({'background' : 'url(img/checkbox.svg) no-repeat', 'background-size' : '50px', 'border' : 'solid 2px #000' }); }
if ($('#delivery:checked').length == 1) { $('.address').show(500); } 
if ($('#delivery:checked').length != 1) { $('.address').hide(500); }
});



$('.order h2:nth-of-type(2) a').click(function (event){ 
     event.preventDefault(); 
	 
  if($('#name').val() == '' || $('#number').val() == '') { alert('You must enter your name and phone number'); };

  if($('#name').val() != '' && $('#number').val() != '') {

	 name = $('#name').val();
	 number = $('#number').val();
	 
	 if ($('#delivery:checked').length == 1){ delivery = 'yes'; }
	 if ($('#delivery:checked').length != 1){ delivery = 'no'; };
	 
	 address = $('#address').val(); 
	 
	 if(delivery == 'yes') { deliveryAddress = '<p>Delivery</p><p>' + address + '</p>' } if(delivery == 'no') { deliveryAddress = '<p>For pickup</p>' };
 
	 size = $('#size').val();
	 
	 if(size == 's') { pizzaSize = 'Small' } if(size == 'm') { pizzaSize = 'Medium' } if(size == 'l') { pizzaSize = 'Large' };
	 
	 toppings = [$('#sausage:checked').val(), $('#pepperoni:checked').val(), $('#mushrooms:checked').val(), $('#peppers:checked').val()];

	 quantity = $('#quantity').val(); 
	 
	if(delivery == 'yes' && address == '' ) { alert('Your address is required for delivery') }
	if(delivery == 'yes' && address != '' || delivery == 'no' ){
	
// order total request transition	 
	 $('.order').css('border', 'none');
	 $('.order .slide svg').css('display', 'none');
	 $('.order').toggle(500);
	 $('.total').toggle(500).promise().done(function(){ 
	 setTop(); 
	 
// final submit wrapper generation
	$('#info').html('<h3>Customer info</h3><p>' + name + '</p><p>' + number + '</p><p>' + deliveryAddress + '</p>');
	
	if ($('.toppings input:checked').length == 0) { toppingQuantity = 'Cheese only' } if ($('.toppings input:checked').length != 0) { toppingQuantity = toppings.join(' ') };
	$('#pizza').html('<h3>Order</h3><p>' + quantity + ' ' + pizzaSize + ' pizza(s)<p>with</p><p>' + toppingQuantity + '</p>');
	
	if(size == 's') { sizeCost = 8; } if(size == 'm') { sizeCost = 10; } if(size == 'l') { sizeCost = 12; };	
	$('#total').html('<h1>$ ' + ((sizeCost + ($('.toppings input:checked').length * 0.5)) * parseInt(quantity)).toFixed(2) + '</h1>');
	});
  }
}
});


// total page back function
$('.total .back').click(function (event){ 
     event.preventDefault(); 
	 $('.total').toggle(500);  
	 $('.order').toggle(500).promise().done(function(){ 	 
		$('.order .slide svg').css('display', 'initial');
		$('.order').css({ 'border-left' : 'solid 2px #000', 'border-bottom' : 'solid 2px #000' });
		setTop();	
	 });	 
});


// order submit button logic
$('#submit').click(function (event){ 
     event.preventDefault(); 
	 $('.total').toggle(500);
	 $('.total').html('');
	 $('.total').html('<h1>Thank you for your order!</h1><h3 style="text-align: center;">your confirmation number is: <span style="font-size: 30px;">A104</span></h3>');
	 $('.total').toggle(500).promise().done(function(){ setTop(); });
});