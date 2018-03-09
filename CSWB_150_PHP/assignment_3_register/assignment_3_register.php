<!DOCTYPE html>
<html>
  <head>
	<meta charset="utf-8">
	<title>King Library</title>
	<link rel="stylesheet" href="css/KingLib_3.css">
	
  </head>

  <body>
  
	<header>
	
		<div><img src="images/KingLibLogo.jpg" /></div>
		
	</header>

	<form action="assignment_3_add_patron.php" method="post" >
		<h3>Please sign up</h3>
	  <fieldset>
		<legend>Your Info</legend>
		<p>
			<label for="first">First Name:</label>
			<input type="text" name="first" id="first" />
		</p>
		<p>
			<label for="last">Last Name:</label>
			<input type="text" name="last" id="last" />
		</p>		
		<p>
			<label for="email">Your Email:</label>
			<input type="text" name="email" id="email" />
		</p>
		<p>
			<label for="year">Your Birth Year:</label>
			<input type="number" name="year" id="year" />
		</p>
	  </fieldset>
	  
	  <p>
		<label for="city">Your City:</label>
		<select name="city" id="city">
			<option>-</option>
			<optgroup label="Cities:">
				<?php
				
				$filename = 'data/'.'cities.txt';
				
				$fp = fopen($filename, 'r');
				
				$lines_in_file = count(file($filename));
				
				for($ii = 1; $ii <= $lines_in_file; $ii++){
					
					$line = fgets($fp); 
					$item = trim($line);
					
					echo '<option>'.$item.'</option>';
					
				};
				
				fclose($fp);
				?>
			</optgroup>
	  </select>
	  
	  </p>
	  
	  <p>
		<input type="submit" value="Submit Information" />
	  </p>
	  
	  <p>
		For Admin use only: <a href="assignment_3_view_patrons.php">View Patrons</a>
	  </p>
	  
	</form>
	
	<?php

	$server = $_SERVER['SERVER_NAME'];

	$positionFound = strpos($server, 'profperry');

	if ($positionFound === false)
	{
		$server = 'localhost';
	} else {
		$server = 'Practice Area';
	}
	
	echo '<aside>'.$server.'</aside>';
	
	?>

</body>
</html>