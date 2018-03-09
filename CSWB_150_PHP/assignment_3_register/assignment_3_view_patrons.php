<!DOCTYPE html>
<html >
  <head>
	<meta charset="utf-8">
	<title>King Library</title>
	<link rel="stylesheet" href="css/KingLib_3.css">
	
  </head>

  <body>
  
	<header>
	
		<div><img src="images/KingLibLogo.jpg" /></div>
		
	</header>
	
	<section class="response">

		<table border="1">

			<tr>
				<th>Last Name</th>
				<th>First Name</th>
				<th>Email</th>
				<th>Birth Year</th>
				<th>City</th>
			</tr>

		<?php
			$filename = 'data/'.'patrons.txt';
			
			if (file_exists($filename)) {
			
			$fp = fopen($filename, 'r');
			
			$lines_in_file = count(file($filename));
			
			for($ii = 1; $ii <= $lines_in_file; $ii++){
			
				$item = fgets($fp);
				
				list($first, $last, $email, $year, $city) = explode(' | ', $item);
				
				$table = '<tr>';
				$table .= '<th>'.$last.'</th>';
				$table .= '<th>'.$first.'</th>';
				$table .= '<th>'.$email.'</th>';
				$table .= '<th>'.$year.'</th>';
				$table .= '<th>'.$city.'</th>';
				$table .= '</tr>';
				
				echo $table;
				
			};
			
			fclose($fp);
			
			}
			
			else {
			
			echo '<h2>No patrons have been added yet!</h2>';
			
			}
		?>

		</table>
	</section>
</body>
</html>