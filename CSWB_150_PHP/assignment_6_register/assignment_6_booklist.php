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
	
	<div>
		<div>
		<?php 
		
		// -- GET AND CHECK $keyword --
		
		$keyword = trim($_POST["keyword"]);
		
		
		
		if ($keyword == '') {
		
			$heading = 'ALL';
		
		}
		
		
		// -- INITIALIZE FUNCTION CHAIN --
		
		checkVar($heading);
		
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

			
		}
		
		require('../../DBtest_pptest.php');

		
		$host =  'localhost';
		$userid =  '7admin7';
		$password = '7dosql7';
		$dbname = 'testdb';

		$db = mysqli_perry_pconnect($host, $userid, $password, $dbname);
		
		if (!$db) { print "<h1>Unable to Connect to MySQL</h1>"; }
		
		$sql_statement = "SELECT * FROM book WHERE title LIKE '%".$keyword."%';";
		$searchResponse = mysqli_query($db, $sql_statement);
		
		if (!$searchResponse) {
			$output_display = "<p style='color: red;'>MySQL No: ".mysqli_errno($db)."<br>";
			$output_display .= "MySQL Error: ".mysqli_error($db)."<br>";
			$output_display .= "<br>SQL: ".$response_rows."<br>";
			$output_display .= "<br>MySQL Affected Rows: ".mysqli_affected_rows($db)."</p>";
		}
				
			
		else {
		
			$response_rows = mysqli_num_rows($searchResponse);
			
			?>
			<table border="1">

				<tr>
					<th>Title</th>
					<th>Type</th>
					<th>ISBN</th>
					<th>Price</th>
					<th>Publication Date</th>
				</tr>
			
			<?php
			
			for($ii = 1; $ii <= $response_rows; $ii++){
			
				$row = mysqli_fetch_array($searchResponse);
				
				$isbn = trim($row['isbn']);
				$title = trim($row['title']);
				$type = trim($row['type']);
				$price = trim($row['price']);
				$pubdate = trim($row['pubdate']);
				
				$output_row =  '<tr>';
				$output_row .= '<th>'.$title.'</th>';
				$output_row .= '<th>'.$type.'</th>';
				$output_row .= '<th>'.$isbn.'</th>';
				$output_row .= '<th>'.$price.'</th>';
				$output_row .= '<th>'.$pubdate.'</th>';
				$output_row .=  '</tr>';
				
				echo $output_row;
			
			}
			
			?>
			
			</table>
			
			<?php
		
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