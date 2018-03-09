<!DOCTYPE html>
<html >
  <head>
	<meta charset="utf-8">
	<title>King Library</title>
	<script type="text/javascript" src="../js/functions.js"></script>
	<link rel="stylesheet" href="../css/style.css">
	
  </head>

  <body>
  
	<header>
	
		<img src="../img/KingLibLogo.jpg" />
		
	</header>
	
	<section class="response">
	
	<?php 

	$first = $_POST["first"];
	$last = $_POST["last"];
	$email = $_POST["email"];
	$city = $_POST["city"];
	
	printf('<p>Your name: %s %s </p>', $first, $last);
	printf('<p>Your email: %s </p>', $email);
	printf('<p>Your city: %s </p>', $city);
	

	?>
	
	</section>

</body>



