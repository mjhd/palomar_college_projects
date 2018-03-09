<!DOCTYPE html>
<html>
  <head>
	<meta charset="utf-8">
	<title>King Library</title>
	<link rel="stylesheet" href="css/KingLib_6.css">
	
  </head>

  <body>
  
	<header>
	
		<div><img src="images/KingLibLogo.jpg" /></div>
		
	</header>

	<form action="assignment_6_add_patron.php" method="post" >
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
				
				require('../../DBtest_pptest.php');
				
				$host =  'localhost';
				$userid =  '7admin7';
				$password = '7dosql7';
				$dbname = 'testdb';

				$db = mysqli_perry_pconnect($host, $userid, $password, $dbname);
				
				if (!$db) { print "<h1>Unable to Connect to MySQL</h1>"; }
				
				$sql_statement = "SELECT name FROM city ORDER BY name";
				$city_query = mysqli_query($db, $sql_statement);
				
				if (!$city_query) {
					$output_display = "<p style='color: red;'>MySQL No: ".mysqli_errno($db)."<br>";
					$output_display .= "MySQL Error: ".mysqli_error($db)."<br>";
					$output_display .= "<br>SQL: ".$response_rows."<br>";
					$output_display .= "<br>MySQL Affected Rows: ".mysqli_affected_rows($db)."</p>";
				}
				
				else {
					$response_rows = mysqli_num_rows($city_query);
					
					for($ii = 1; $ii <= $response_rows; $ii++){
					
						$row = mysqli_fetch_array($city_query);
						$name = $row['name'];
						echo '<option>'.$name.'</option>';
						
					};
				
				}
				
				?>
				
			</optgroup>
	  </select>
	  
	  </p>
	  
	  <p>
		<input type="submit" value="Submit Information" />
	  </p>
	  
	  <p>
		For Admin use only: <a href="assignment_6_view_patrons.php">View Patrons</a>
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
	
	echo '<aside>SERVER: '.$server.'</aside>';
	
	?>

</body>
</html>