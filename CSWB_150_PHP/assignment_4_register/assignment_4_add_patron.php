<!DOCTYPE html>
<html >
  <head>
	<meta charset="utf-8">
	<title>King Library</title>
	<link rel="stylesheet" href="css/KingLib_4.css">
	
  </head>

  <body>
  
	<header>
	
		<div><img src="images/KingLibLogo.jpg" /></div>
		
	</header>
	
	<section class="response">
	
	<?php 
	
		$first = $_POST["first"];
		$last = $_POST["last"];
		$email = $_POST["email"];
		$city = $_POST["city"];
		$year = $_POST["year"];
		
		// Validation
		
		if ( $first == null || $last == null ) { 
			echo '<p>ERROR! Please enter a first and last name</p>'; 
			}
			
		else if ( $first != null && $last != null ) { 
			printf('<p>Your name: %s %s </p>', $first, $last); 
			}
		
		if ($email == null){ 
			echo '<p>ERROR! Please enter an email</p>'; 
			}
		else if ($email != null){ 
			printf('<p>Your email: %s </p>', $email); 
			}
			
		if ($year == null){ 
			echo '<p>ERROR! Please enter a birth year</p>'; 
			}
		else if ($year != null){ 
			printf('<p>Your birth year: %d </p>', $year); 
			}
			
		if ($city == '-'){ 
			echo '<p>ERROR! Please select a city</p>'; 
			}
		else if ($city != '-'){ 
			printf('<p>Your city: %s </p>', $city); 
			}
			
		
		// Age grouping
		
		$thisYear = date('Y');
		$ageGap = $thisYear - $year;
		
		if ( $ageGap <= 15 ) { echo '<p>You are in the age group: Children</p>'; }
		else if ( $ageGap > 15 && $ageGap <= 55) { echo '<p>You are in the age group: Adults</p>'; }
		else if ( $ageGap > 55) { echo '<p>You are in the age group: Seniors</p>'; }
		
		
				$filename = 'data/'.'patrons.txt';
				
				$fp = fopen($filename, 'a');
				
				$cntr = 0;
				while(true){
					
					$item = array_values($_POST)[$cntr];
					
					if(empty($item)){
					
						fwrite($fp, "\n");
						break;
					}
					$cntr++;
					
					$output_line = $item." | ";
					
					fwrite($fp, $output_line);

				};
				
				
				fclose($fp);
			
		
	?>
	
	</section>

</body>
</html>


