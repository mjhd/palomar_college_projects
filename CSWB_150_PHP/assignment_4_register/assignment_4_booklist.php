<!DOCTYPE html>
<html>
  <head>
	<meta charset="utf-8">
	<title>King Library</title>
	<link rel="stylesheet" href="css/KingLib_4.css">
	
  </head>

  <body>
  
	<header>
	
		<div><img src="images/KingLibLogo.jpg" /></div>
		
	</header>
	
	<div>
		<div>
		<?php 
		
		// -- GET AND CHECK $keyword --
		
		$keyword = $_POST["keyword"];
		
		
		
		if ($keyword == '') {
		
			$keyword = 'ALL';
		
		}
		
		
		// -- INITIALIZE FUNCTION CHAIN --
		
		checkVar($keyword);
		
		// -------------------------------
		
		
		
		// -- DEFINITIONS --
		
		function checkVar($heading) {
			
			// check value of user input and output a heading 
			
			if ($heading == 'ALL') {
			
				echo '<h1>Current Titles</h1>';
				
			}
			
			else {
			
				printf("<h1>Current Titles that match: %s</h1>", $heading);
			
			}
			
			$filename = 'data/'.'booklist.txt';
			$searchResponse = searchList($heading, $filename);
			
		}
		
		
		function searchList($search_term, $open) {
		
			
			$lines_in_file = count(file($open));
			$fp = fopen($open, 'r');
				
				if ($search_term == 'ALL') {
					
					for($ii = 1; $ii<= $lines_in_file; $ii++) {
					
						$line = fgets($fp);
						$output = trim($line);
						list($title, $category, $pub_date, $isbn) = explode('*', $line);
						printf("<br /><h4>%s - %s - %s - %s</h4>", $title, $category, $pub_date, $isbn);
					}
				}
				
				else if ($search_term != 'ALL') {
				
					$titles = array();
					
					for($ii = 1; $ii<= $lines_in_file; $ii++) {
					
						$line = fgets($fp);
						$output = trim($line);
						list($title, $category, $pub_date, $isbn) = explode('*', $line);
						
						$title_check = stripos($title, $search_term);
						
							if ($title_check !== false) {
							
								printf("<br /><h4>%s - %s - %s - %s</h4>", $title, $category, $pub_date, $isbn);
								
							}
							
					}
					
					
				
				}
				
				
				
				
			
			fclose($fp);
		
		}	
		
		?>
		</div>
	</div>
	
	
	

	<?php
	
	//  --SERVER NAME OUTPUT
	
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